/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
  merge,
  values,
  noop,
} from 'lodash';
import { DateTime } from 'luxon';
import {
  IQuestionCore,
  IRequirementCore,
  IResponseCore,
  ISectionCore,
  IStepCore,
}              from '../survey/IStepCore';
import {
  DIRECTION,
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  STEP_TYPE,
  BASE,
  TStepType,
  PROGRESS_BAR_STATUS,
  ACTION_TYPE,
} from '../util/enums';
import { QuestionnaireCore } from './QuestionnaireCore';
import { ComposableCore }    from './ComposableCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore, TDateOfBirthCore } from '../util/types';
import { AnswerCore }                               from './AnswerCore';
import { stepReducer }                              from './FormCore';
import { eventedCore }                              from '../state/pubsub';
import { getDateTime }                              from '../util/date';
import { IBranchCore }                              from '../survey/IBranchCore';
import { getInstanceName }                          from '../util/factories';

export type TStepCtor = Partial<StepCore>;

const stepDefaults = {
  entryRequirements: [],
  exitRequirements:  [],
  footer:            '',
  info:              '',
  internalNotes:     '',
  order:             0,
  section:           {},
  subTitle:          '',
};

const stepCoreClassName = getInstanceName(PREFIX.STEP);

export class StepCore extends ComposableCore implements IStepCore {
  public static override readonly _name = stepCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = stepCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([stepCoreClassName, ComposableCore._name], obj);
  }

  constructor(data: TStepCtor, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, stepDefaults);
    merge(this, data);
    if (data.entryRequirements) {
      this.entryRequirements = data.entryRequirements.map((r) =>
        new RequirementCore(r, questionnaire));
    }
    if (data.exitRequirements) {
      this.exitRequirements = data.exitRequirements.map((r) =>
        new RequirementCore(r, questionnaire));
    }
    this.#initStep();
  }

  #initStep() {
    if (!this.type || `${this.type}` === `${BASE.DEFAULT}`) {
      this.type = BASE.DEFAULT;
    }
  }

  public toString() {
    return this.id;
  }
  // static create(props: IStepDataCore, questionnaire: QuestionnaireCore) {
  //   return new StepCore({ ...props.step, ...props, questionnaire } as TStepCtor);
  // }

  public entryRequirements!: RequirementCore[];

  public exitRequirements!: RequirementCore[];

  public footer! : string;

  public info!: string;

  public internalNotes!: string;

  public order!: number;

  public section!: SectionCore;

  public subTitle!: string;

  public type!: TStepType;

  public title!: string;

  public goToStep(step: StepCore, cb = noop): void {
    if (cb) {
      cb(step, this);
    }
  }

  public goToNextStep(): void {
    const step = this.questionnaire.getNextStep(this);
    const dir  = DIRECTION.FORWARD;
    this.questionnaire.config.events?.page({
      dir, step,
    });
    this.goToStep(step);
  }

  public goToPrevStep(): void {
    const step = this.questionnaire.getPreviousStep(this);
    const dir  = DIRECTION.BACKWARD;
    this.questionnaire.config.events?.page({ dir, step });
    this.goToStep(step);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public isNextEnabled(): boolean {
    if (!this.id) {
      throw new Error('This survery is not defined');
    }
    if (this.id === STEP_TYPE.LANDING) {
      return true;
    }
    if (this.id === STEP_TYPE.SUMMARY) {
      return true;
    }
    // KLUDGE Alert: this is not an elegant way to solve this
    if (this.type === QUESTION_TYPE.DOB) {
      const yearsOld = this.form.age?.years || 0;
      return yearsOld > 0;
    }
    if (!this.form) {
      return false;
    }
    return this.isValid();
  }

  public isValid(): boolean {
    const q = this.form.responses.find((a) => a?.id === this.id);
    let ret = true;
    if (!q) {
      ret = false;
    }
    const answers = values(q?.answers);
    let years     = 0;
    switch (q?.type) {
      case STEP_TYPE.DOB:
        years = this.form?.age?.years || 0;
        if (years <= 0) {
          ret = false;
        }
        if (!q?.exitRequirements || q.exitRequirements.length === 0) {
          // ret === true
        }
        ret = ret
          && (q.exitRequirements?.every((r) => r.minAge && years >= r.minAge.years) || true);
        break;
      case STEP_TYPE.MULTIPLE_CHOICE:
        ret = ret && (
          q.answer !== undefined
          && answers?.find((x) => x.title === q.answer) !== undefined
        );
        break;
      default:
        // ret === true
        break;
    }
    return ret;
  }

  public getFieldSetName(): string {
    return kebabCase(this.title);
  }

  public getDomId(answer: string): string {
    const name = this.getFieldSetName();
    return `${name}-${kebabCase(answer)}`;
  }

  public getStepType() {
    if (isEnum(QUESTION_TYPE, this.type)) {
      return 'question';
    }
    if (isEnum(PAGE_TYPE, this.type)) {
      return 'page';
    }
    return 'unknown';
  }
}

const sectionDefaults = {
  lastStep:     undefined,
  order:        0,
  requirements: [],
  status:       undefined,
};

const sectionCoreClassName = getInstanceName(PREFIX.SECTION);

export class SectionCore extends ComposableCore implements ISectionCore {
  public static override readonly _name = sectionCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = sectionCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([sectionCoreClassName, ComposableCore._name,
    ], obj);
  }

  constructor(data: Partial<SectionCore>, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, sectionDefaults);
    merge(this, data);
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r, questionnaire));
    }
  }

  lastStep?: number | undefined;

  requirements!: RequirementCore[];

  status?: PROGRESS_BAR_STATUS | undefined;

  order?: number | undefined;
}

export type TQuestionCoreCtor = TStepCtor & Partial<QuestionCore>;

const questionDefaults = {
  answers: [],
  branch:  {},
  section: {},
  type:    QUESTION_TYPE.DEFAULT,
};

const questionCoreClassName = getInstanceName(PREFIX.QUESTION);

export class QuestionCore extends StepCore implements IQuestionCore {
  public static override readonly _name = questionCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = questionCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([questionCoreClassName, StepCore._name], obj);
  }

  type!: QUESTION_TYPE;

  answers!: AnswerCore[];

  branch!: BranchCore;

  section!: SectionCore;

  constructor(data: TQuestionCoreCtor, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, questionDefaults);
    merge(this, data);
    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a, questionnaire));
    }
    if (data.branch) {
      this.branch = new BranchCore(data.branch, questionnaire);
    }
    if (data.section) {
      this.section = new SectionCore(data.section, questionnaire);
    }
    this.#init();
  }

  #init() {
    if (!this.type || `${this.type}` === `${QUESTION_TYPE.DEFAULT}`) {
      this.type = QUESTION_TYPE.DEFAULT;
    }
  }

  #answer = '';

  #answers: string[] = [];

  public get answer() {
    return this.#answer;
  }

  public set answer(val: string) {
    this.#answers.push(val);
    this.#answer = val;
  }

  public getAnswerHistory() {
    return [...this.#answers];
  }

  /**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
  updateForm(
    answer: string,
  ): void {
    if (answer?.length > 0) {
      merge(this, { answer });
    }
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    // eslint-disable-next-line no-param-reassign
    this.form.responses = this.form.responses || [];
    const value         = this.form.responses.find((r) => r.id === this.id);
    if (!value) {
      this.form.responses.push(this);
    } else {
      merge(value, this);
    }
    eventedCore.publish({ event: { answer, props: this, step: this.id }, type: 'answer' });
    stepReducer(this.form, {
      type:  ACTION_TYPE.UPDATE,
      value: { ...this.form },
    });
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  protected isSelected(
    answer: string,
  ): boolean | undefined {
    if (!this?.form) {
      return undefined;
    }
    const q: IQuestionCore | undefined = this.form.responses.find(
      (a: IQuestionCore) => a.id === this.id,
    );
    if (!q) {
      return undefined;
    }
    return this.isValid() && q.answer === answer;
  }

  toString(): string {
    if (!this.title || this.title === undefined || this.title?.length <= 0) {
      throw new Error(`Value is required; ${this.id} does not have a title`);
    }
    return this.title;
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  getBirthdate(): DateTime | undefined {
    if (this.answer) {
      return getDateTime(this.answer);
    }
    if (this.form?.birthdate) {
      return getDateTime(this.form.birthdate);
    }
    return undefined;
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  toBirthdate(dob: TDateOfBirthCore): string | undefined {
    if (this.type !== QUESTION_TYPE.DOB) {
      return undefined;
    }
    if (dob.month && dob.day && dob.year) {
      if (+dob.month < 1 || +dob.month > 12) {
        return undefined;
      }
      if (+dob.day < 1 || +dob.day > 31) {
        return undefined;
      }
      if (+dob.year < 1900 || +dob.year > new Date().getFullYear()) {
        return undefined;
      }
      return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${dob.year}`;
    }
    return undefined;
  }
}

const responseDefaults = {
  answers:  [],
  question: {},
};

const responseCoreClassName = getInstanceName(PREFIX.RESPONSE);

export class ResponseCore extends ComposableCore implements IResponseCore {
  public static override readonly _name = responseCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = responseCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([responseCoreClassName, ComposableCore._name], obj);
  }

  constructor(data: Partial<ResponseCore>, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, responseDefaults);
    merge(this, data);

    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a, questionnaire));
    }
    if (data.question) {
      this.question = new QuestionCore(data.question, questionnaire);
    }
  }

  answers!: AnswerCore[];

  question!: QuestionCore;
}

const requirementDefaults = {
  ageCalc:     noop,
  explanation: '',
  responses:   [],
};

const requirementCoreClassName = getInstanceName(PREFIX.REQUIREMENT);

export class RequirementCore extends ComposableCore implements IRequirementCore {
  public static override readonly _name = requirementCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = requirementCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([requirementCoreClassName, ComposableCore._name], obj);
  }

  constructor(data: Partial<RequirementCore>, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, requirementDefaults);
    merge(this, data);

    if (data.responses) {
      this.responses = data.responses.map((q) => new ResponseCore(q, questionnaire));
    }
  }

  ageCalc?: TAgeCalcCore | undefined;

  explanation?: string | undefined;

  maxAge?: TAgeCore | undefined;

  minAge?: TAgeCore | undefined;

  responses!: ResponseCore[];
}

const branchDefaults = {
  questions: [],
};

const branchCoreClassName = getInstanceName(PREFIX.BRANCH);

export class BranchCore extends ComposableCore implements IBranchCore {
  public static override readonly _name = branchCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = branchCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([branchCoreClassName, ComposableCore._name], obj);
  }

  constructor(data: Partial<BranchCore>, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, branchDefaults);
    merge(this, data);

    if (data.questions) {
      this.questions = data.questions.map((q) => questionnaire.getQuestionById(q.id));
    }
    this.questions.forEach((q) => {
      // eslint-disable-next-line no-param-reassign
      q.branch = this;
    });
  }

  public questions!: QuestionCore[];
}
