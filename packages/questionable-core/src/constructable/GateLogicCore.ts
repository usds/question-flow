import {
  groupBy, isEmpty, noop,
} from 'lodash';
import { QuestionableConfigCore } from '../composable/QuestionableConfigCore';
import { ResultCore }             from '../composable/ResultCore';
import { FormCore }               from '../composable/FormCore';
import { PageCore }               from '../composable/PageCore';
import { QuestionnaireCore }      from '../composable/QuestionnaireCore';
import {
  BranchCore,
  QuestionCore,
  RequirementCore,
  ResponseCore,
  SectionCore,
  StepCore,
} from '../composable/StepCore';
import {
  ACTION,
  DIRECTION,
  isEnum,
  MODE,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../util/enums';
import { log, toggleOut }         from '../util/logger';
import { matches }                from '../util/helpers';
import { TAgeCalcCore, TAgeCore } from '../util/types';
import { IPageConfigCore }        from '../survey/IQuestionableConfigCore';
import { ActionCore }             from '../composable/ActionCore';
import { PagesCore }              from '../composable/PagesCore';
import { Questioner }             from './Questioner';

type TPageSet = {
  config?: Partial<IPageConfigCore>;
  data?: PageCore;
} | undefined;

export class GateLogicCore {
  #questionnaire: QuestionnaireCore;

  #flow: string[];

  #config: QuestionableConfigCore;

  #steps: StepCore[];

  #pageList: PageCore[] = [];

  #pages: PagesCore;

  #form: FormCore;

  constructor(questionnaire: QuestionnaireCore, form: FormCore) {
    this.#questionnaire = questionnaire;
    this.#form          = form;
    this.#flow          = questionnaire.flow;
    this.#config        = questionnaire.config;
    this.#steps         = questionnaire.steps;
    const pages         = questionnaire.pages || new PagesCore();
    this.#pages         = pages;
    this.#pageList      = pages.all();
  }

  public enableLog() {
    if (this.#config.dev) {
      // Fork for future enhancements to dev logging
      GateLogicCore.enableLogging();
    }
    return GateLogicCore.enableLogging();
  }

  public static enableLogging() {
    toggleOut('on');
  }

  public goToStep(step: StepCore, cb = noop): void {
    if (cb) {
      cb(step, this);
    }
  }

  public goToNextStep(s: StepCore): void {
    const step = this.getNextStep(s);
    const dir  = DIRECTION.FORWARD;
    this.#config.events?.page({
      dir, step,
    });
    this.goToStep(step);
  }

  public goToPrevStep(s: StepCore): void {
    const step = this.getPreviousStep(s);
    const dir  = DIRECTION.BACKWARD;
    this.#config.events?.page({ dir, step });
    this.goToStep(step);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public isNextEnabled(s: StepCore): boolean {
    if (!s.id) {
      throw new Error('This survery is not defined');
    }
    if (s.id === STEP_TYPE.LANDING) {
      return true;
    }
    if (s.id === STEP_TYPE.SUMMARY) {
      return true;
    }
    // KLUDGE Alert: this is not an elegant way to solve this
    if (s.type === QUESTION_TYPE.DOB) {
      const yearsOld = this.#form.age?.years || 0;
      return yearsOld > 0;
    }
    if (!this.#form) {
      return false;
    }
    return Questioner.isValid(s, this.#form);
  }

  /**
   * Fetches the first step
   * @returns
   */
  getFirstStep<T extends StepCore>(): T {
    const ret = this.#steps[0] as T;
    if (!ret) {
      this.throw('There is no step');
    }
    // if (isEnum(QUESTION_TYPE, ret.type) && (ret instanceof T)) {
    //   return ret as QuestionCore;
    // }
    // if (isEnum(PAGE_TYPE, ret.type)) {
    //   return ret as IPageCore;
    // }
    return ret;
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getStepById(id: string): StepCore {
    const ret = this.#steps.find((q) => q.id === id);
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
  getPageById(id: string): PageCore {
    const ret = this.getStepById(id);
    if (!isEnum(PAGE_TYPE, ret.type)) {
      this.throw(`Step id: ${id} is not a page`);
    }
    return ret as PageCore;
  }

  /**
   * Fetches a question by its id
   * @param id unique identifier of the question
   * @returns
   */
  getQuestion(q: { id: string }): QuestionCore {
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
  getQuestionById(id: string): QuestionCore {
    const ret = this.getStepById(id);
    if (!isEnum(QUESTION_TYPE, ret.type)) {
      this.throw(`Step id: ${id} not a question`);
    }
    return ret as QuestionCore;
  }

  // protected isValidExit(question: QuestionCore, form: FormCore, skip = 0) {
  //   let allowExit = true;
  //   if (skip === 0
  //     && direction === DIRECTION.FORWARD
  //     && thisQuestion.exitRequirements
  //     && thisQuestion.exitRequirements.length > 0) {
  //     allowExit = thisQuestion.exitRequirements.every((r) =>
  //       this.meetsAllRequirements(r, form));
  //   }
  //   return allowExit;
  // }

  /**
   * Returns the next step in the sequence which is permitted by the current state of the form
   */
  // eslint-disable-next-line sonarjs/cognitive-complexity
  getStep(data: StepCore, direction: DIRECTION, skip = 0): StepCore {
    const thisQuestion = data;
    const nextStepId   = this.#flow.indexOf(thisQuestion.id) !== -1
      ? this.#flow[this.#flow.indexOf(thisQuestion.id) + direction]
      : undefined;
    // If there are no more steps, stay on current
    if (!nextStepId) {
      return thisQuestion;
    }

    if (skip === 0
      && direction === DIRECTION.FORWARD
      && thisQuestion.exitRequirements
      && thisQuestion.exitRequirements.length > 0) {
      const allowExit = thisQuestion.exitRequirements.every((r) =>
        this.meetsAllRequirements(r));
      if (!allowExit) {
        return thisQuestion;
      }
    }

    if (this.#config.mode === MODE.EDIT) {
      return this.getStepById(nextStepId);
    }
    // Special handling for results
    const hasResults = this.getResults().length > 0;
    if (nextStepId === STEP_TYPE.RESULTS && !hasResults) {
      return this.#pages.noResultsPage;
    }
    if (nextStepId === STEP_TYPE.NO_RESULTS && hasResults) {
      return this.#pages.resultsPage;
    }

    const nextQuestion = this.getStepById(nextStepId);
    if (!nextQuestion?.entryRequirements) {
      return nextQuestion;
    }

    // match is a tri-state (undefined === unset)
    let match: boolean | undefined;

    // Each requirement is joined by `OR`
    nextQuestion.entryRequirements?.forEach((r) => {
      // This safely handles cases where requirement parameters are undefined
      const next = this.meetsAllRequirements(r);

      if (match === undefined) {
        match = next;
      } else {
        match = match || next;
      }
    });

    // If the requested step meets all requirements, return it
    if (match) {
      return nextQuestion;
    }
    // Get the next step whose requirements are met
    const n = this.getStep(nextQuestion, direction, skip + 1);
    if (n !== nextQuestion) {
      return n;
    }
    return thisQuestion;
  }

  /**
   * Gets the next allowed step id in the sequence
   * @param props step context
   * @returns step id
   */
  getNextStep(props: StepCore): StepCore {
    const dir = DIRECTION.FORWARD;
    return this.getStep(props, dir);
  }

  /**
   * Gets the previously answered step id
   * @param props step context
   * @returns step id
   */
  getPreviousStep(props: StepCore): StepCore {
    const dir = DIRECTION.BACKWARD;
    return this.getStep(props, dir);
  }

  /**
   * Calculate the percent of survey completed
   * @param props
   * @returns
   */
  getProgressPercent(step: StepCore): number {
    if (matches(step.type, PAGE_TYPE.LANDING)) {
      // Landing page exists before progress starts
      // less than 0% progress can be interpretted as 'do not display'
      return -1;
    }
    if (matches(step.type, PAGE_TYPE.SUMMARY)) {
      // However we land on the summary, this is 100%
      return 100;
    }
    if (
      matches(step.type, PAGE_TYPE.RESULTS)
      || matches(step.type, PAGE_TYPE.NO_RESULTS)
    ) {
      // Results are beyond the survery progress
      // greater than 100% can be interpretted as 'do not display'
      return 101;
    }

    // if we have branches then we need to do this, otherwise we need to get the number of steps
    const answerable = this.getAllAnswerableQuestions(step);
    const lastStep   = answerable.length; // sections[sections.length - 1]?.lastStep;

    // if there is no step, the questionnaire has just started
    if (lastStep <= 0) {
      return 0.1;
    }
    const thisStepIdx = answerable.indexOf(step.id) + 1;
    // add 2 to account for the summary and result steps
    let lastStepIdx = lastStep + 2;
    if (this.#config.mode === MODE.EDIT) {
      // if in design mode, every step will be iterated
      lastStepIdx = this.#flow.length - 1;
    }
    // To calculate the percent, divide the index of this step
    //   by the index of the last step multiplied by 100.

    return Math.round((thisStepIdx / lastStepIdx) * 100);
  }

  /**
   * Gets all of the questions associated with a branch
   * @param props
   * @returns string[]
   */
  getAllAnswerableQuestions(step: StepCore): string[] {
    if (!isEnum(QUESTION_TYPE, step.type)) {
      return [];
    }

    if (this.#questionnaire.branches.length) {
      const question = step as QuestionCore;
      return this.getBranchQuestions(question);
    }
    return this.getQuestionsWithoutBranches();
  }

  /**
   * Gets all of the questions associated with a branch
   * @param step
   * @returns string[]
   */
  protected getBranchQuestions(step: StepCore): string[] {
    const question = step as QuestionCore;

    if (question.branch) {
      this.#config.events.gate({
        data: {
          [this.#questionnaire.header]: `${question.branch.title}`,
        },
        gate: 'branch',
      });

      return (
        this.#questionnaire.branches
          .find((b) => b.id === question.branch?.id)
          ?.questions.map((q) => q.id) || []
      );
    }
    return [];
  }

  /**
   * Gets all of the questions regardless of branch
   * @returns string[]
   */
  protected getQuestionsWithoutBranches(): string[] {
    return this.#steps
      .filter((q) => isEnum(QUESTION_TYPE, q.type))
      .map((q) => q.id);
  }

  /**
   * Gets a list of questions that may be answered in the future
   * @param props
   * @returns
   */
  getAnswerableQuestions(): string[] {
    return this.#questionnaire.questions
      .filter(
        (q) =>
          !q.entryRequirements
          || q.entryRequirements.length === 0
          || q.entryRequirements.some((r) =>
            this.meetsAllRequirements(r, true)),
      )
      .map((q) => q.id);
  }

  /**
   * Gets all of the currently available sections
   * @param props
   * @returns
   */
  getSections(thisQuestion: StepCore): SectionCore[] {
    if (!thisQuestion || !this.#questionnaire.sections || this.#questionnaire.sections.length === 0) {
      return [];
    }

    const thisQuestionIdx = this.#steps.indexOf(thisQuestion);

    // Get all sections that meet the requirements based on current answers
    let sections = this.#questionnaire.sections.filter(
      (s) =>
        s.requirements.length === 0
        || s.requirements.some((r) => this.meetsAllRequirements(r)),
    );
    if (this.#config.mode === MODE.EDIT) {
      // In design mode, all sections are valid
      sections = [...this.#questionnaire.sections];
    }
    return sections.map((s) => {
      const section    = SectionCore.create(s);
      section.lastStep = this.#questionnaire.questions.reduce(
        (acc, q, index) => (q.section?.id === s.id ? index : acc),
        -1,
      );
      if (matches(section.id, PAGE_TYPE.RESULTS)) {
        section.lastStep = this.#questionnaire.questions.length - 2;
      } else if (matches(section.id, PAGE_TYPE.LANDING)) {
        section.lastStep = 0;
      }
      if (section.lastStep < 0) {
        section.status = PROGRESS_BAR_STATUS.INCOMPLETE;
      } else if (matches(section.id, thisQuestion.section?.id)) {
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
  getResults(): ResultCore[] {
    return this.#questionnaire.results.filter((r) =>
      r.requirements.some((match) => {
        if (this.meetsAllRequirements(match)) {
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
  getActionByType(type: ACTION): ActionCore {
    const action = this.#questionnaire.actions.find((a) => a.type === type);
    if (!action) {
      this.throw(`No matching action found for ${type}`);
    }
    return action;
  }

  /**
   * Gets the appropriate action given a set of results
   * @returns
   */
  getAction(results: ResultCore[]): ActionCore {
    const groupedByAction = groupBy(results, 'action.id');
    const hybrid          = this.#questionnaire.actions.find((a) => a.type === ACTION.HYBRID);
    // If group above has more than one type of action, the resolved action will be a hybrid
    let match     = hybrid;
    const actions = Object.keys(groupedByAction);
    if (actions.length === 1) {
      match = this.#questionnaire.actions.find((a) => a.id === actions[0]);
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
  protected throw(e: string): never {
    const error = new Error(e);
    this.#config.events.error(error);
    throw error;
  }

  /**
   * Ensure the survey is constructed with (minimally) valid data
   */
  protected validateInput() {
    if (this.#questionnaire.questions?.length <= 0) {
      this.throw('No questions have been defined.');
    }
    // if (this.#questionnaire.header?.length <= 0) {
    //   this.throw('No header has been defined.');
    // }
    if (this.#questionnaire.results?.length <= 0) {
      this.throw('No results have been defined.');
    }
  }

  /**
   * Ensure we have referential integrity between questions/branches
   * In the cases where branches have defined and mismatches exist:
   * Top level branches that have questions assigned will update the question reference to use the branch
   * Each question that defines a branch relationship will establish a reference to a top level branch
   */
  protected syncBranches(): void {
    // Branches defined take priority; sync these first
    this.#questionnaire.branches.forEach((b) => {
      b.questions.forEach((bq) => {
        const question = this.#questionnaire.questions.find((q) => q.id === bq.id);
        if (question && question?.branch?.id !== b.id) {
          question.branch = b;
        }
      });
    });

    this.#questionnaire.questions.forEach((q) => {
      // Branches are optional on questions
      if (!q.branch?.id) {
        return;
      }
      const exists         = this.#questionnaire.branches.find((b) => b.existsIn(q) || q.branch === b);
      const validateBranch = exists || (q.branch as BranchCore);
      if (!exists) {
        this.#questionnaire.add(validateBranch);
      }
      if (!validateBranch.questions.find((bq) => bq.id === q.id)) {
        validateBranch.add(q);
      }
    });
  }

  /**
   * Gets the data and configuration for a page type
   * @param type Page Type
   * @returns
   */
  // eslint-disable-next-line class-methods-use-this
  protected getPageSet = (
    type: PAGE_TYPE,
  ): TPageSet => {
    const data = this.#pageList.find((p: PageCore | undefined) => p?.type === type);
    if (data) {
      return {
        config: {},
        data,
      };
    }
    return undefined;
  };

  /**
   * If configured, sets a default page if required for the page type
   * @param idx index of the page in `this.#steps`
   * @param type LANDING, RESULTS, etc
   */
  protected setPage(idx: number, type: PAGE_TYPE): void {
    const error = 'step is not correctly defined or defined more than once';

    const page = this.getPageSet(type);
    if (!page) return;
    // visible is truthy unless explicitly set to false
    if (!page.data || page?.config?.visible === false) {
      if (this.#steps.filter((q) => q.type === type).length > 0) {
        // if the page has been assigned to steps, remove it
        const doomed = this.#steps.find((q) => q.type === type);
        if (doomed) {
          const doomIdx = this.#steps.indexOf(doomed);
          this.#steps.splice(doomIdx, 1);
        }
      }
      return;
    }
    // Ensure the wizard has this page at the specified location
    if (this.#steps[idx].type !== type) {
      if (idx === 0) {
        // In the case of the landing page, it will always go first
        this.#steps.unshift(page.data);
      } else {
        this.#steps.splice(idx + 1, 0, page.data);
      }
    }
    if (this.#steps.filter((q) => q.type === type).length !== 1) {
      this.throw(`${type} ${error}.`);
    }
  }

  /**
   * Sets step defaults for landing, summary and results if none are defined.
   */
  protected setPageDefaults(): void {
    this.setPage(0, PAGE_TYPE.LANDING);
    this.setPage(this.#steps.length - 1, PAGE_TYPE.SUMMARY);
    this.setPage(this.#steps.length - 1, PAGE_TYPE.RESULTS);
    this.setPage(this.#steps.length - 1, PAGE_TYPE.NO_RESULTS);
  }

  /**
   * Performs constructor validation on the survery inputs.
   */
  protected init(): void {
    this.validateInput();
    this.syncBranches();
    this.setPageDefaults();
  }

  public meetsAllRequirements(
    requirement: RequirementCore,
    allowUnanswered = false,
  ) {
    const {
      minAge, maxAge, responses: answers, ageCalc,
    } = requirement;
    // Internal to each requirement, all evaluations are `AND`
    // This safely handles cases where requirement parameters are undefined
    return (
      GateLogicCore.meetsMinAgeRequirements(this.#form, minAge)
      && GateLogicCore.meetsMaxAgeRequirements(this.#form, maxAge)
      && GateLogicCore.meetsAgeCalcRequirements(this.#form, ageCalc)
      && this.meetsAnswerRequirements(answers, allowUnanswered)
    );
  }

  /**
   * Validates minimum age requirements
   * @param form The current state of the form
   * @param minAge a TAge object or undefined
   * @returns true if no min age, else true if age is >= min age
   */
  public static meetsMinAgeRequirements(form: FormCore, minAge?: TAgeCore): boolean {
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
  public static meetsMaxAgeRequirements(form: FormCore, maxAge?: TAgeCore): boolean {
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
  protected static meetsAgeCalcRequirements(
    form: FormCore,
    ageCalc?: TAgeCalcCore,
  ): boolean {
    if (!ageCalc) return true;
    if (form.birthdate === undefined) {
      return false;
    }
    const { birthdate } = form;

    return ageCalc(birthdate);
  }

  /**
   *
   * @param questionAnswer the user's answer
   * @param matchAnswer the question answer for validation
   * @param allowUnanswered optional bit to ignore undefined
   * @param id answer id
   * @returns true if the answer is a match
   */
  protected matchesAnswer(
    questionAnswer?: string,
    matchAnswer?: string,
    allowUnanswered = false,
    id = '',
  ): boolean {
    let ret = false;
    if (allowUnanswered && isEmpty(questionAnswer)) {
      ret = true;
    }
    if (isEmpty(questionAnswer)) {
      ret = false;
    }
    ret = matches(questionAnswer, matchAnswer);
    if (this.#config.dev) {
      log('Answer matching', {
        id,
        matchAnswer,
        questionAnswer,
        ret,
      });
    }
    return ret;
  }

  /**
   * Determines if current answers in the form meet the step's requirements
   * @param answers Collection of required answer that `matches()`
   * @param allowUnanswered if true, consider questions that are not yet answered
   * @returns true if all answers are valid or if no answers are required
   */
  protected meetsAnswerRequirements(
    answers?: ResponseCore[],
    allowUnanswered = false,
  ): boolean {
    if (!answers || answers.length <= 0) return true;

    return answers.every((a) => {
      if (!a.question) return true;
      const question = this.getQuestion(a.question);
      if (question.answers?.length > 0) {
        // Allowed answers are an array. Any matched answer makes the response valid.
        const hasAnyMatch = a.answers.some((i) => {
          const answer = question.answers.find((x) =>
            matches(`${x.id}`, `${i.id}`));
          return this.matchesAnswer(
            question.answer,
            answer?.title,
            allowUnanswered,
            i.id,
          );
        });
        if (this.#config.dev) {
          log('Answer matching', { hasAnyMatch, question });
        }
        return hasAnyMatch;
      }
      // If no answers are defined, this passes
      return true;
    });
  }
}
