/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
  merge,
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
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  BASE,
  TStepType,
  PROGRESS_BAR_STATUS,
  ACTION_TYPE,
} from '../util/enums';
import { QuestionnaireCore } from './QuestionnaireCore';
import { ComposableCore }    from './ComposableCore';
import {
  checkInstanceOf,
  ClassList,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore, TDateOfBirthCore } from '../util/types';
import { AnswerCore }                               from './AnswerCore';
import { stepReducer }                              from './FormCore';
import { eventedCore }                              from '../state/pubsub';
import { getDateTime }                              from '../util/date';
import { IBranchCore }                              from '../survey/IBranchCore';
import { IQuestionnaireCore } from '../survey/IQuestionnaireCore';

const {
  STEP,
  QUESTION,
  COMPOSABLE,
} = PREFIX;

export class StepCore extends ComposableCore implements IStepCore {
  public static override readonly _name = STEP;

  public override readonly instanceOfCheck: TInstanceOf = ClassList.step;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, COMPOSABLE], obj);
  }

  public static override create(data: Partial<StepCore> = {}) {
    if (data instanceof StepCore) {
      return data;
    }
    return new StepCore(data);
  }

  constructor(data: Partial<IStepCore> = {}) {
    super(data);

    if (data.entryRequirements) {
      this.entryRequirements = data.entryRequirements.map((r) =>
        new RequirementCore(r));
    }
    if (data.exitRequirements) {
      this.exitRequirements = data.exitRequirements.map((r) =>
        new RequirementCore(r));
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

export class SectionCore extends ComposableCore implements ISectionCore {
  public static override readonly _name = PREFIX.SECTION;

  public override readonly instanceOfCheck: TInstanceOf = ClassList.section;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.section, ClassList.composable,
    ], obj);
  }

  constructor(data: Partial<ISectionCore> = {}) {
    super(data);
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r));
    }
  }

  lastStep?: number | undefined;

  requirements!: RequirementCore[];

  status?: PROGRESS_BAR_STATUS | undefined;

  order?: number | undefined;
}

const questionDefaults = {
  answers: [],
  branch:  {},
  section: {},
  type:    QUESTION_TYPE.DEFAULT,
};

const questionCoreClassName = PREFIX.QUESTION;

export class QuestionCore extends StepCore implements IQuestionCore {
  public static override readonly _name = questionCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = ClassList.question;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.question, ClassList.step], obj);
  }

  type!: QUESTION_TYPE;

  answers!: AnswerCore[];

  branch!: BranchCore;

  section!: SectionCore;

  constructor(data: Partial<IQuestionCore> = {}) {
    super(data);
    merge(this, questionDefaults);
    merge(this, data);
    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a));
    }
    if (data.branch) {
      this.branch = new BranchCore(data.branch);
    }
    if (data.section) {
      this.section = new SectionCore(data.section);
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
  public static override readonly _name = PREFIX.RESPONSE;

  public override readonly instanceOfCheck: TInstanceOf = ClassList.response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.response, ClassList.composable], obj);
  }

  constructor(data: Partial<IResponseCore>) {
    super(data);

    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a));
    }
    if (data.question) {
      this.question = new QuestionCore(data.question);
    }
  }

  answers!: AnswerCore[];

  question!: QuestionCore;
}

export class RequirementCore extends ComposableCore implements IRequirementCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.requirement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.composable], obj);
  }

  constructor(data: Partial<IRequirementCore>) {
    super(data);

    if (data.responses) {
      this.responses = data.responses.map((q) => new ResponseCore(q));
    }
  }

  ageCalc?: TAgeCalcCore | undefined;

  explanation?: string | undefined;

  maxAge?: TAgeCore | undefined;

  minAge?: TAgeCore | undefined;

  responses!: ResponseCore[];
}

export class BranchCore extends ComposableCore implements IBranchCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.branch;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.composable], obj);
  }

  constructor(data: Partial<IBranchCore> = {}) {
    super(data);
  }

  public questions!: QuestionCore[];
}
