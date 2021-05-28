import {
  DIRECTION,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
} from '../lib/enums';
import {
  TAge,
  TAgeCalc,
  TAnswers,
} from '../lib/types';
import { Answer } from './Answer';
import { validateSteps } from './DefaultSteps';
import { IAction } from './IAction';
import { IAnswer } from './IAnswer';
import { IQuestion } from './IQuestion';
import { IRequirement } from './IRequirement';
import { IResult } from './IResult';
import { ISection } from './ISection';
import { IPrepStep, IStep } from './IStep';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire {
  readonly actions: IAction[];
  readonly header: string;
  readonly questions: IQuestion[];
  readonly results: IResult[];
  readonly sections: ISection[];
}

/**
 * Utility wrapper for survey state
 */
export class Questionnaire implements IQuestionnaire {
  readonly questions!: IQuestion[];

  readonly header!: string;

  readonly results!: IResult[];

  readonly flow: string[];

  readonly sections!: ISection[];

  readonly actions!: IAction[];

  constructor(data: IQuestionnaire) {
    Object.assign(this, data);

    this.init();

    // Wizard flow is defined as linear sequence of unique ids
    this.flow = this.questions.map((q) => q.id);

    // Naive duplication check
    // TODO: make this more robust and report only the dupes
    const unique: string[] = this.flow.filter((v, i, a) => a.indexOf(v) === i);
    if (unique.length !== this.flow.length) {
      throw new Error(
        `Questionnaire data contains duplicate questions: "${unique.join(
          ',',
        )}"`,
      );
    }
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getQuestionById(id: string): IQuestion {
    const ret = this.questions.find((q) => q.id === id);
    if (!ret) throw new Error(`Step id: ${id} not found in survery`);
    return ret;
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
    if (nextStep === QUESTION_TYPE.RESULTS_STEP && this.getResults(form).length === 0) {
      return QUESTION_TYPE.NO_RESULTS_STEP;
    }
    if (nextStep === QUESTION_TYPE.NO_RESULTS_STEP && this.getResults(form).length > 0) {
      return QUESTION_TYPE.RESULTS_STEP;
    }

    const nextQuestion = this.getQuestionById(nextStep);

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

  getNextStep(props: IStep): string {
    const thisStep = props.step as string;
    return this.getStep(thisStep, props.form, DIRECTION.forward);
  }

  getPreviousStep(props: IStep): string {
    const thisStep = props.step as string;
    return this.getStep(thisStep, props.form, DIRECTION.backward);
  }

  /**
   * Gets all of the current available sections
   * @param props
   * @returns
   */
  getSections(props: IPrepStep): ISection[] {
    if (!props) {
      return [];
    }

    // Get all sections that meet the requirements based on current answers
    const sections = this.sections.filter((s) =>
      s.requirements.some((r) => this.meetsAllRequirements(r, props.form)));

    const thisStep = props.step as string;
    const thisQuestion = this.getQuestionById(thisStep);
    const thisQuestionIdx = this.questions.indexOf(thisQuestion);

    return sections.map((s) => {
      const section = { ...s };
      section.lastStep = this.questions.reduce(
        (acc, q, index) => (q.sectionId === s.id ? index : acc),
        -1,
      );
      if (section.id === thisQuestion.sectionId) {
        section.status = PROGRESS_BAR_STATUS.current;
      }
      if (section.lastStep < thisQuestionIdx) {
        section.status = PROGRESS_BAR_STATUS.complete;
      }
      return section;
    });
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  static isNextEnabled(props: IStep): boolean {
    if (!props) throw new Error('This survery is not defined');

    if (props.step === QUESTION_TYPE.LANDING_STEP) return true;

    if (props.step === QUESTION_TYPE.SUMMARY_STEP) return true;

    if (!props.form) return false;
    // KLUDGE Alert: this is not an elegant way to solve this
    if (props.question.questionType === QUESTION_TYPE.DOB) {
      return undefined !== props.form?.age?.years && props.form.age.years >= 0;
    }
    return Answer.isValid(props.form, props.question.id);
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
    const idx = Math.floor(Math.random() * 3);
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
    validateSteps(this.questions);
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
