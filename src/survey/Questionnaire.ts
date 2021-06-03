import { ArrayUnique } from 'class-validator';
import {
  DIRECTION,
  isEnum,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../lib/enums';
import {
  TAge,
  TAgeCalc,
  TAnswers,
} from '../lib/types';
import { DEFAULT_PAGES }             from './DefaultPages';
import { IAction }                   from './IAction';
import { IAnswer }                   from './IAnswer';
import {
  IPage, IPages, IQuestion, IStep,
} from './IStep';
import { IRequirement } from './IRequirement';
import { IResult }      from './IResult';
import { ISection }     from './ISection';
import { IStepData }    from './IStepData';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire {
  readonly actions: IAction[];
  readonly header: string;
  readonly pages: IPages;
  readonly questions: IQuestion[];
  readonly results: IResult[];
  readonly sections: ISection[];
}

/**
 * Utility wrapper for survey state
 */
export class Questionnaire implements IQuestionnaire {
  @ArrayUnique((question: IQuestion) => question.id)
  readonly questions!: IQuestion[];

  readonly header!: string;

  @ArrayUnique((result: IResult) => result.label)
  readonly results!: IResult[];

  readonly flow: string[];

  @ArrayUnique((section: ISection) => section.id)
  readonly sections!: ISection[];

  readonly actions!: IAction[];

  readonly pages: IPages = DEFAULT_PAGES;

  private readonly steps: IStep[];

  constructor(data: IQuestionnaire) {
    Object.assign(this, data);

    // Create a new collection for our flow logic
    this.steps = [...this.questions];

    this.init();

    // Wizard flow is defined as linear sequence of unique ids
    this.flow = this.steps.map((q) => q.id);
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getStepById(id: string): IStep {
    const ret = this.steps.find((q) => q.id === id);
    if (!ret) {
      throw new Error(`Step id: ${id} not found in survey`);
    }
    return ret;
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getPageById(id: string): IPage {
    const ret = this.getStepById(id);
    if (!isEnum(PAGE_TYPE, ret.type)) {
      throw new Error(`Step id: ${id} is not a page`);
    }
    return ret as IPage;
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getQuestionById(id: string): IQuestion {
    const ret = this.getStepById(id);
    if (!isEnum(QUESTION_TYPE, ret.type)) {
      throw new Error(`Step id: ${id} not a question`);
    }
    return ret as IQuestion;
  }

  /**
   * Returns the next step in the sequence which is permitted by the current state of the form
   */
  getStep(thisStep: string, form: IAnswer, direction: DIRECTION): string {
    const nextStep = this.flow.indexOf(thisStep) !== -1
      ? this.flow[this.flow.indexOf(thisStep) + direction]
      : undefined;
    // If there are no more steps, stay on current
    if (!nextStep) return thisStep;

    // Special handling for results
    if (nextStep === STEP_TYPE.RESULTS && this.getResults(form).length === 0) {
      return STEP_TYPE.NO_RESULTS;
    }
    if (nextStep === STEP_TYPE.NO_RESULTS && this.getResults(form).length > 0) {
      return STEP_TYPE.RESULTS;
    }

    const nextQuestion = this.getStepById(nextStep);

    if (!nextQuestion?.requirements) {
      return nextStep;
    }

    // match is a tri-state (undefined === unset)
    let match: boolean | undefined;
    // Each requirement is joined by `OR`
    nextQuestion.requirements.forEach((r) => {
      // This safely handles cases where requirement parameters are undefined
      const next = this.meetsAllRequirements(r, form);

      if (match === undefined) {
        match = next;
      } else {
        match = match || next;
      }
    });

    // If the requested step meets all requirements, return it
    if (match) {
      return nextStep;
    }
    // Get the next step whose requirements are met
    const n = this.getStep(nextStep, form, direction);
    if (n !== nextStep) {
      return n;
    }
    return thisStep;
  }

  getNextStep(props: IStepData): string {
    const thisStep = props.stepId as string;
    return this.getStep(thisStep, props.form, DIRECTION.FORWARD);
  }

  getPreviousStep(props: IStepData): string {
    const thisStep = props.stepId as string;
    return this.getStep(thisStep, props.form, DIRECTION.BACKWARD);
  }

  /**
   * Gets all of the currently available sections
   * @param props
   * @returns
   */
  getSections(props: IStepData): ISection[] {
    if (!props) {
      return [];
    }

    // Get all sections that meet the requirements based on current answers
    const sections        = this.sections.filter((s) =>
      s.requirements.length === 0
      || s.requirements.some((r) => this.meetsAllRequirements(r, props.form)));
    const thisStep        = props.stepId as string;
    const thisQuestion    = this.getStepById(thisStep);
    const thisQuestionIdx = this.steps.indexOf(thisQuestion);

    return sections.map((s) => {
      const section    = { ...s };
      section.lastStep = this.questions.reduce(
        (acc, q, index) => (q.sectionId === s.id ? index : acc),
        -1,
      );
      if (section.id === thisQuestion.sectionId) {
        section.status = PROGRESS_BAR_STATUS.CURRENT;
      }
      if (section.lastStep < thisQuestionIdx) {
        section.status = PROGRESS_BAR_STATUS.COMPLETE;
      }
      return section;
    });
  }

  /**
   * Get all the results compatible with the current answers of the form
   * @param form
   * @returns
   */
  getResults(form: IAnswer): IResult[] {
    return this.results.filter((r) =>
      r.requirements.some((match) => {
        if (this.meetsAllRequirements(match, form)) {
          Object.assign(r, { match });
          return true;
        }
        return false;
      }));
  }

  /**
   * Get a randomized action
   * @returns
   */
  getAction(): IAction {
    const idx = Math.floor(Math.random() * this.actions.length);
    return this.actions[idx];
  }

  /**
   * Performs constructor validation on the survey inputs.
   * Sets step defaults for landing, summary and result if none are defined.
   */
  private init() {
    if (this.questions?.length <= 0) {
      throw new Error('No questions have been defined.');
    }
    if (this.header?.length <= 0) {
      throw new Error('No header has been defined.');
    }
    if (this.results?.length <= 0) {
      throw new Error('No results have been defined.');
    }

    // NOTE: the following default assignment logic is not yet factored out.
    // This could be abstracted if repetitions of this pattern emerge.

    const error = 'step is not correctly defined or defined more than once';

    // Ensure the wizard has a landing step at the beginning
    if (this.steps[0].type !== PAGE_TYPE.LANDING) {
      this.steps.unshift(this.pages.landingPage);
    }
    if (
      this.steps.filter((q) => q.type === PAGE_TYPE.LANDING).length !== 1
    ) {
      throw new Error(`${PAGE_TYPE.LANDING} ${error}.`);
    }

    // Ensure the wizard has a no results step at the end
    if (this.steps[this.steps.length - 1].type !== PAGE_TYPE.NO_RESULTS) {
      // No results is last
      this.steps.push(this.pages.noResultsPage);
    }
    if (
      this.steps.filter((q) => q.type === PAGE_TYPE.NO_RESULTS).length
    !== 1
    ) {
      throw new Error(`${PAGE_TYPE.NO_RESULTS} ${error}.`);
    }

    // Ensure the wizard has a result step before the no results step
    if (this.steps[this.steps.length - 2].type !== PAGE_TYPE.RESULTS) {
      this.steps.splice(this.steps.length - 1, 0, this.pages.resultsPage);
    }
    if (
      this.steps.filter((q) => q.type === PAGE_TYPE.RESULTS).length !== 1
    ) {
      throw new Error(`${PAGE_TYPE.RESULTS} ${error}.`);
    }

    // Ensure the wizard has a summary step before results
    if (this.steps[this.steps.length - 3].type !== PAGE_TYPE.SUMMARY) {
    // Create wizard's summary step as the default step
      this.steps.splice(this.steps.length - 2, 0, this.pages.summaryPage);
    }
    if (
      this.steps.filter((q) => q.type === PAGE_TYPE.SUMMARY).length !== 1
    ) {
      throw new Error(`${PAGE_TYPE.SUMMARY} ${error}.`);
    }
  }

  private meetsAllRequirements(requirement: IRequirement, form: IAnswer) {
    const {
      minAge, maxAge, answers, ageCalc,
    } = requirement;
    // Internal to each requirement, all evaluations are `AND`
    // This safely handles cases where requirement parameters are undefined
    return (
      Questionnaire.meetsMinAgeRequirements(form, minAge)
      && Questionnaire.meetsMaxAgeRequirements(form, maxAge)
      && Questionnaire.meetsAgeCalcRequirements(form, ageCalc)
      && this.meetsAnswerRequirements(answers)
    );
  }

  /**
   * Validates minimum age requirements
   * @param form The current state of the form
   * @param minAge a TAge object or undefined
   * @returns true if no min age, else true if age is >= min age
   */
  private static meetsMinAgeRequirements(
    form: IAnswer,
    minAge?: TAge,
  ): boolean {
    if (!minAge) return true;

    if (form.age === undefined) {
      return false;
    }
    const {
      age: { years, months },
    } = form;

    return (
      years > minAge?.years
      || (years >= minAge?.years && months >= minAge?.months)
    );
  }

  /**
   * Validates maximum age requirements
   * @param form The current state of the form
   * @param maxAge a TAge object or undefined
   * @returns true if no max age, else true if age is <= max age
   */
  private static meetsMaxAgeRequirements(
    form: IAnswer,
    maxAge?: TAge,
  ): boolean {
    if (!maxAge) return true;
    if (form.age === undefined) {
      return false;
    }
    const {
      age: { years, months },
    } = form;

    return (
      years < maxAge?.years
      || (years <= maxAge?.years && months <= maxAge?.months)
    );
  }

  /**
   * Executes an arbitrary function to determine age eligibility
   * @param form The current state of the form
   * @param ageCalc A callback function that operates on an age
   * @returns
   */
  private static meetsAgeCalcRequirements(
    form: IAnswer,
    ageCalc?: TAgeCalc,
  ): boolean {
    if (!ageCalc) return true;
    if (form.birthdate === undefined) {
      return false;
    }
    const { birthdate } = form;

    return ageCalc(birthdate);
  }

  /**
   * Determines if current answers in the form meet the step's requirements
   * @param answers Collection of required answer matches
   * @returns true if all answers are valid or if no answers are required
   */
  private meetsAnswerRequirements(answers?: TAnswers): boolean {
    if (!answers) return true;

    return Object.keys(answers).every((a) => {
      const question = this.getQuestionById(a);
      if (Object.keys(question.answers)?.length > 0) {
        // Allowed answers are an array. Any matched answer makes the response valid.
        return answers[a].some(
          (i) =>
            question.answer !== undefined
            && question.answer === question.answers[i],
        );
      }
      // If no answers are defined, this passes
      return true;
    });
  }
}
