import { ArrayUnique }   from 'class-validator';
import { DEFAULT_PAGES } from '../lib/defaultPages';
import {
  DIRECTION,
  isEnum,
  MODE,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../lib/enums';
import { Helpers }                   from '../lib/helpers';
import { TAge, TAgeCalc, TAnswers }  from '../lib/types';
import { IQuestionableConfig }       from '../survey';
import { IAction }                   from '../survey/IAction';
import { IAnswer }                   from '../survey/IAnswer';
import { IQuestionnaire }            from '../survey/IQuestionnaire';
import { IRequirement }              from '../survey/IRequirement';
import { IResult }                   from '../survey/IResult';
import { ISection }                  from '../survey/ISection';
import {
  IPage, IPages, IQuestion, IStep,
} from '../survey/IStep';
import { IStepData }          from '../survey/IStepData';
import { QuestionableConfig } from './Config';

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
      throw new Error(`Step id: ${id} not found in survery`);
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
  getStep(
    thisStep: string,
    form: IAnswer,
    direction: DIRECTION,
    config = new QuestionableConfig(),
  ): string {
    const nextStep =      this.flow.indexOf(thisStep) !== -1
      ? this.flow[this.flow.indexOf(thisStep) + direction]
      : undefined;
    // If there are no more steps, stay on current
    if (!nextStep) {
      return thisStep;
    }

    if (config.mode === MODE.EDIT) {
      return nextStep;
    }
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

  getNextStep(props: IStepData, config = new QuestionableConfig()): string {
    const thisStep = props.stepId as string;
    return this.getStep(thisStep, props.form, DIRECTION.FORWARD, config);
  }

  getPreviousStep(props: IStepData, config = new QuestionableConfig()): string {
    const thisStep = props.stepId as string;
    return this.getStep(thisStep, props.form, DIRECTION.BACKWARD, config);
  }

  /**
   * Calculate the percent of survey completed
   * @param props
   * @returns
   */
  getProgressPercent(props: IStepData, config: IQuestionableConfig): number {
    if (Helpers.matches(props.step?.section?.id, PAGE_TYPE.RESULTS)) {
      return 100;
    }
    const sections = this.getSections(props, config);
    const lastStep = sections[sections.length - 1];
    // if there is no step, the questionnaire has just started
    if (!lastStep?.lastStep) {
      // Always show a little progress
      return 0.5;
    }
    const thisStepIdx = this.flow.indexOf(`${props.stepId}`);
    // add 2 to account for the summary and result steps
    let lastStepIdx = lastStep.lastStep + 2;
    if (config.mode === MODE.EDIT) {
      // if in design mode, every step will be iterated
      lastStepIdx = this.flow.length - 1;
    }
    // To calculate the percent, divide the index of this step
    //   by the index of the last step multiplied by 100.
    return Math.round((thisStepIdx / lastStepIdx) * 100);
  }

  /**
   * Gets all of the currently available sections
   * @param props
   * @returns
   */
  getSections(props: IStepData, config: IQuestionableConfig): ISection[] {
    if (!props) {
      return [];
    }

    const thisStep        = props.stepId as string;
    const thisQuestion    = this.getStepById(thisStep);
    const thisQuestionIdx = this.steps.indexOf(thisQuestion);

    // Get all sections that meet the requirements based on current answers
    let sections = this.sections.filter(
      (s) =>
        s.requirements.length === 0
        || s.requirements.some((r) => this.meetsAllRequirements(r, props.form)),
    );
    if (config.mode === MODE.EDIT) {
      // In design mode, all sections are valid
      sections = [...this.sections];
    }
    return sections.map((s) => {
      const section    = { ...s };
      section.lastStep = this.questions.reduce(
        (acc, q, index) => (q.section.id === s.id ? index : acc),
        -1,
      );
      if (Helpers.matches(section.id, PAGE_TYPE.RESULTS)) {
        section.lastStep = this.questions.length - 2;
      } else if (Helpers.matches(section.id, PAGE_TYPE.LANDING)) {
        section.lastStep = 0;
      }
      if (section.lastStep < 0) {
        section.status = PROGRESS_BAR_STATUS.INCOMPLETE;
      } else if (Helpers.matches(section.id, thisQuestion.section.id)) {
        section.status = PROGRESS_BAR_STATUS.CURRENT;
      } else if (section.lastStep < thisQuestionIdx) {
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
   * Performs constructor validation on the survery inputs.
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
    // This could be abstracted if repitions of this pattern emerge.

    const error = 'step is not correctly defined or defined more than once';

    // Ensure the wizard has a landing step at the beginning
    if (this.steps[0].type !== PAGE_TYPE.LANDING) {
      this.steps.unshift(this.pages.landingPage);
    }
    if (this.steps.filter((q) => q.type === PAGE_TYPE.LANDING).length !== 1) {
      throw new Error(`${PAGE_TYPE.LANDING} ${error}.`);
    }

    // Ensure the wizard has a no results step at the end
    if (this.steps[this.steps.length - 1].type !== PAGE_TYPE.NO_RESULTS) {
      // No results is last
      this.steps.push(this.pages.noResultsPage);
    }
    if (
      this.steps.filter((q) => q.type === PAGE_TYPE.NO_RESULTS).length !== 1
    ) {
      throw new Error(`${PAGE_TYPE.NO_RESULTS} ${error}.`);
    }

    // Ensure the wizard has a result step before the no results step
    if (this.steps[this.steps.length - 2].type !== PAGE_TYPE.RESULTS) {
      this.steps.splice(this.steps.length - 1, 0, this.pages.resultsPage);
    }
    if (this.steps.filter((q) => q.type === PAGE_TYPE.RESULTS).length !== 1) {
      throw new Error(`${PAGE_TYPE.RESULTS} ${error}.`);
    }

    // Ensure the wizard has a summary step before results
    if (this.steps[this.steps.length - 3].type !== PAGE_TYPE.SUMMARY) {
      // Create wizard's summary step as the default step
      this.steps.splice(this.steps.length - 2, 0, this.pages.summaryPage);
    }
    if (this.steps.filter((q) => q.type === PAGE_TYPE.SUMMARY).length !== 1) {
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
   * @param answers Collection of required answer Helpers.matches
   * @returns true if all answers are valid or if no answers are required
   */
  private meetsAnswerRequirements(answers?: TAnswers): boolean {
    if (!answers) return true;

    return Object.keys(answers).every((a) => {
      const question = this.getQuestionById(a);
      if (question.answers?.length > 0) {
        // Allowed answers are an array. Any matched answer makes the response valid.
        return answers[a].some(
          (i) =>
            question.answer !== undefined
            && question.answer === question.answers.find((x) => x.id === `${i}`)?.title,
        );
      }
      // If no answers are defined, this passes
      return true;
    });
  }
}
