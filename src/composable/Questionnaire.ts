import { ArrayUnique }    from 'class-validator';
import { groupBy, merge } from 'lodash';
import { DEFAULT_PAGES }  from '../lib/defaultPages';
import {
  ACTION,
  DIRECTION,
  isEnum,
  MODE,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../lib/enums';
import { Helpers }        from '../lib/helpers';
import { TAge, TAgeCalc } from '../lib/types';
import { IAction }        from '../survey/IAction';
import { IBranch }        from '../survey/IBranch';
import { IForm }          from '../survey/IForm';
import { IPages }         from '../survey/IPages';
import { IPageConfig }    from '../survey/IQuestionableConfig';
import { IQuestionnaire } from '../survey/IQuestionnaire';
import { IResult }        from '../survey/IResult';
import {
  IPage,
  IQuestion,
  IRequirement,
  IResponse,
  ISection,
  IStep,
} from '../survey/IStep';
import { IStepData }          from '../survey/IStepData';
import { QuestionableConfig } from './Config';

/**
 * Utility wrapper for survey state
 */
export class Questionnaire implements IQuestionnaire {
  @ArrayUnique((action: IAction) => action.id)
  readonly actions!: IAction[];

  readonly branches!: IBranch[];

  readonly config!: QuestionableConfig;

  readonly flow: string[];

  readonly header!: string;

  @ArrayUnique((result: IResult) => result.label)
  readonly results!: IResult[];

  readonly pages: IPages = DEFAULT_PAGES;

  @ArrayUnique((question: IQuestion) => question.id)
  readonly questions!: IQuestion[];

  @ArrayUnique((section: ISection) => section.id)
  readonly sections!: ISection[];

  private readonly steps: IStep[];

  constructor(data: Partial<IQuestionnaire | Questionnaire>) {
    merge(this, data);

    // Create a new collection for our flow logic
    this.steps = this.questions.map((q, i) => ({
      order: i,
      ...q,
    }));

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
      this.throw(`Step id: ${id} not found in survery`);
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
      this.throw(`Step id: ${id} is not a page`);
    }
    return ret as IPage;
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getQuestion(q: Partial<IQuestion>): IQuestion {
    if (!q.id) {
      this.throw(`Question ${q} is not defined`);
    }
    return this.getQuestionById(q.id);
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getQuestionById(id: string): IQuestion {
    const ret = this.getStepById(id);
    if (!isEnum(QUESTION_TYPE, ret.type)) {
      this.throw(`Step id: ${id} not a question`);
    }
    return ret as IQuestion;
  }

  /**
   * Returns the next step in the sequence which is permitted by the current state of the form
   */
  getStep(
    thisStep: string,
    form: IForm,
    direction: DIRECTION,
  ): string {
    const nextStep =      this.flow.indexOf(thisStep) !== -1
      ? this.flow[this.flow.indexOf(thisStep) + direction]
      : undefined;
    // If there are no more steps, stay on current
    if (!nextStep) {
      return thisStep;
    }

    if (this.config.mode === MODE.EDIT) {
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

  getNextStep(props: IStepData): string {
    const thisStep = props.stepId as string;
    const dir      = DIRECTION.FORWARD;
    return this.getStep(thisStep, props.form, dir);
  }

  getPreviousStep(props: IStepData): string {
    const thisStep = props.stepId as string;
    const dir      = DIRECTION.BACKWARD;
    return this.getStep(thisStep, props.form, dir);
  }

  /**
   * Calculate the percent of survey completed
   * @param props
   * @returns
   */
  getProgressPercent(props: IStepData): number {
    const stepId = `${props.stepId}`;
    const step   = this.getStepById(stepId);
    if (Helpers.matches(step.type, PAGE_TYPE.LANDING)) {
      // Landing page exists before progress starts
      // less than 0% progress can be interpretted as 'do not display'
      return -1;
    }
    if (Helpers.matches(step.type, PAGE_TYPE.SUMMARY)) {
      // However we land on the summary, this is 100%
      return 100;
    }
    if (
      Helpers.matches(step.type, PAGE_TYPE.RESULTS)
      || Helpers.matches(step.type, PAGE_TYPE.NO_RESULTS)
    ) {
      // Results are beyond the survery progress
      // greater than 100% can be interpretted as 'do not display'
      return 101;
    }

    const answerable = this.getBranchQuestions(props);
    const lastStep   = answerable.length; // sections[sections.length - 1]?.lastStep;

    // if there is no step, the questionnaire has just started
    if (lastStep <= 0) {
      return 0.1;
    }
    const thisStepIdx = answerable.indexOf(stepId) + 1;
    // add 2 to account for the summary and result steps
    let lastStepIdx = lastStep + 2;
    if (this.config.mode === MODE.EDIT) {
      // if in design mode, every step will be iterated
      lastStepIdx = this.flow.length - 1;
    }
    // To calculate the percent, divide the index of this step
    //   by the index of the last step multiplied by 100.
    return Math.round((thisStepIdx / lastStepIdx) * 100);
  }

  /**
   * Gets all of the questions associated with a branch
   * @param props
   * @returns
   */
  getBranchQuestions(props: IStepData): string[] {
    const stepId = `${props.stepId}`;
    const step   = this.getStepById(stepId);
    if (!isEnum(QUESTION_TYPE, step.type)) {
      return [];
    }
    const question = step as IQuestion;
    return (
      this.branches
        .find((b) => b.id === question.branch?.id)
        ?.questions.map((q) => q.id) || []
    );
  }

  /**
   * Gets a list of questions that may be answered in the future
   * @param props
   * @returns
   */
  getAnswerableQuestions(props: IStepData): string[] {
    return this.questions
      .filter(
        (q) =>
          !q.requirements
          || q.requirements.length === 0
          || q.requirements.some((r) =>
            this.meetsAllRequirements(r, props.form, true)),
      )
      .map((q) => q.id);
  }

  /**
   * Gets all of the currently available sections
   * @param props
   * @returns
   */
  getSections(props: IStepData): ISection[] {
    if (!props || !this.sections || this.sections.length === 0) {
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
    if (this.config.mode === MODE.EDIT) {
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
  getResults(form: IForm): IResult[] {
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
   * Gets the appropriate action given a set of results
   * @returns
   */
  getActionByType(type: ACTION): IAction {
    const action = this.actions.find((a) => a.type === type);
    if (!action) {
      this.throw(`No matching action found for ${type}`);
    }
    return action;
  }

  /**
   * Gets the appropriate action given a set of results
   * @returns
   */
  getAction(results: IResult[]): IAction {
    const groupedByAction = groupBy(results, 'action.id');
    const hybrid          = this.actions.find((a) => a.type === ACTION.HYBRID);
    // If group above has more than one type of action, the resolved action will be a hybrid
    let match     = hybrid;
    const actions = Object.keys(groupedByAction);
    if (actions.length === 1) {
      match = this.actions.find((a) => a.id === actions[0]);
      if (!match) {
        this.throw(`Action id ${actions[0]} could not be found.`);
      }
    }
    if (!match) {
      this.throw('Could not find a Call to Action for these results.');
    }
    return match;
  }

  /**
   * Internal wrapper to create error, log, and throw
   * @param e Error as string
   */
  private throw(e: string): never {
    const error = new Error(e);
    this.config.events.error(error);
    throw error;
  }

  /**
   * Ensure the survey is constructed with (minimally) valid data
   */
  private validateInput() {
    if (this.questions?.length <= 0) {
      this.throw('No questions have been defined.');
    }
    if (this.header?.length <= 0) {
      this.throw('No header has been defined.');
    }
    if (this.results?.length <= 0) {
      this.throw('No results have been defined.');
    }
  }

  /**
   * Ensure we have referential integrity between questions/branches
   * In the cases where branches have defined and mismatches exist:
   * Top level branches that have questions assigned will update the question reference to use the branch
   * Each question that defines a branch relationship will establish a reference to a top level branch
   */
  private syncBranches(): void {
    // Branches defined take priority; sync these first
    this.branches.forEach((b) => {
      b.questions.forEach((bq) => {
        const question = this.questions.find((q) => q.id === bq.id);
        if (question && question?.branch?.id !== b.id) {
          question.branch = b;
        }
      });
    });

    this.questions.forEach((q) => {
      // Branches are optional on questions
      if (!q.branch?.id) {
        return;
      }
      const exists         = this.branches.find((b) => b.id === q.branch?.id);
      const validateBranch = exists || (q.branch as IBranch);
      if (!exists) {
        this.branches.push(validateBranch);
      }
      validateBranch.questions = validateBranch.questions || [];
      if (!validateBranch.questions.find((bq) => bq.id === q.id)) {
        validateBranch.questions.push(q);
      }
    });
  }

  /**
   * Gets the data and configuration for a page type
   * @param type Page Type
   * @returns
   */
  private getPageSet = (type: PAGE_TYPE): {
    config?: Partial<IPageConfig>,
    data?: IPage,
  } => {
    switch (type) {
      case PAGE_TYPE.LANDING:
        return ({
          config: this.config.pages.landing,
          data:   this.pages.landingPage,
        });
      case PAGE_TYPE.NO_RESULTS:
        return ({
          config: this.config.pages.noresults,
          data:   this.pages.noResultsPage,
        });
      case PAGE_TYPE.RESULTS:
        return ({
          config: this.config.pages.results,
          data:   this.pages.resultsPage,
        });
      case PAGE_TYPE.SUMMARY:
        return ({
          config: this.config.pages.summary,
          data:   this.pages.summaryPage,
        });
      default:
        return this.throw(`No data for page type ${type}`);
    }
  }

  /**
   * If configured, sets a default page if required for the page type
   * @param idx index of the page in `this.steps`
   * @param type LANDING, RESULTS, etc
   */
  private setPage(idx: number, type: PAGE_TYPE): void {
    const error = 'step is not correctly defined or defined more than once';

    const page = this.getPageSet(type);
    // visible is truthy unless explicitly set to false
    if (page?.config?.visible === false) {
      if (this.steps.filter((q) => q.type === type).length > 0) {
        // if the page has been assigned to steps, remove it
        const doomed = this.steps.find((q) => q.type === type);
        if (doomed) {
          const doomIdx = this.steps.indexOf(doomed);
          this.steps.splice(doomIdx, 1);
        }
      }
      return;
    }
    // Ensure the wizard has this page at the specified location
    if (this.steps[idx].type !== type && page.data) {
      if (idx === 0) {
        // In the case of the landing page, it will always go first
        this.steps.unshift(page.data);
      } else {
        this.steps.splice(idx + 1, 0, page.data);
      }
    }
    if (this.steps.filter((q) => q.type === type).length !== 1) {
      this.throw(`${type} ${error}.`);
    }
  }

  /**
   * Sets step defaults for landing, summary and results if none are defined.
   */
  private setPageDefaults(): void {
    this.setPage(0, PAGE_TYPE.LANDING);
    this.setPage(this.steps.length - 1, PAGE_TYPE.SUMMARY);
    this.setPage(this.steps.length - 1, PAGE_TYPE.RESULTS);
    this.setPage(this.steps.length - 1, PAGE_TYPE.NO_RESULTS);
  }

  /**
   * Performs constructor validation on the survery inputs.
   */
  private init(): void {
    this.validateInput();
    this.syncBranches();
    this.setPageDefaults();
  }

  private meetsAllRequirements(
    requirement: IRequirement,
    form: IForm,
    allowUnanswered = false,
  ) {
    const {
      minAge, maxAge, responses: answers, ageCalc,
    } = requirement;
    // Internal to each requirement, all evaluations are `AND`
    // This safely handles cases where requirement parameters are undefined
    return (
      Questionnaire.meetsMinAgeRequirements(form, minAge)
      && Questionnaire.meetsMaxAgeRequirements(form, maxAge)
      && Questionnaire.meetsAgeCalcRequirements(form, ageCalc)
      && this.meetsAnswerRequirements(answers, allowUnanswered)
    );
  }

  /**
   * Validates minimum age requirements
   * @param form The current state of the form
   * @param minAge a TAge object or undefined
   * @returns true if no min age, else true if age is >= min age
   */
  private static meetsMinAgeRequirements(form: IForm, minAge?: TAge): boolean {
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
  private static meetsMaxAgeRequirements(form: IForm, maxAge?: TAge): boolean {
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
    form: IForm,
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
   * @param allowUnanswered if true, consider questions that are not yet answered
   * @returns true if all answers are valid or if no answers are required
   */
  private meetsAnswerRequirements(
    answers?: IResponse[],
    allowUnanswered = false,
  ): boolean {
    if (!answers || answers.length <= 0) return true;

    return answers.every((a) => {
      const question = this.getQuestion(a.question);
      if (question.answers?.length > 0) {
        // Allowed answers are an array. Any matched answer makes the response valid.
        return a.answers.some(
          (i) =>
            (allowUnanswered && question.answer === undefined)
            || (question.answer !== undefined
              && question.answer
                === question.answers.find((x) => x.id === i.id)?.title),
        );
      }
      // If no answers are defined, this passes
      return true;
    });
  }
}
