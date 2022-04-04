/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
} from 'lodash';
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
} from '../util/enums';
import { ComposableCore } from './ComposableCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore } from '../util/types';
import { AnswerCore }             from './AnswerCore';
import { IBranchCore }            from '../survey/IBranchCore';
import { BaseCore }               from './BaseCore';
import { RefCore }                from './RefCore';

export class StepCore extends ComposableCore implements IStepCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.step;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, ClassList.composable], obj);
  }

  public static override create(data: Partial<IStepCore> = {}) {
    if (data instanceof StepCore) {
      return data;
    }
    return new StepCore(data);
  }

  #entryRequirements: RequirementCore[];

  #exitRequirements: RequirementCore[];

  #footer: string;

  #info: string;

  #internalNotes: string;

  #order: number;

  #section: SectionCore;

  #subTitle: string;

  #type: TStepType;

  constructor(data: Partial<IStepCore> = {}) {
    super(data);

    this.#entryRequirements = data.entryRequirements?.map((r) =>
      RequirementCore.create(r)) || [];
    this.#exitRequirements  = data.exitRequirements?.map((r) =>
      RequirementCore.create(r)) || [];
    if (!data.type || `${data.type}` === `${BASE.DEFAULT}`) {
      this.#type = BASE.DEFAULT;
    } else {
      this.#type = data.type;
    }
    this.#footer        = data.footer || '';
    this.#info          = data.info || '';
    this.#internalNotes = data.internalNotes || '';
    this.#order         = data.order || 0;
    this.#section       = SectionCore.create(data.section);
    this.#subTitle      = data.subTitle || '';
  }

  public toString() {
    return this.id;
  }
  // static create(props: IStepDataCore, questionnaire: QuestionnaireCore) {
  //   return new StepCore({ ...props.step, ...props, questionnaire } as TStepCtor);
  // }

  public get entryRequirements(): RequirementCore[] {
    return this.#entryRequirements;
  }

  public get exitRequirements(): RequirementCore[] {
    return this.#exitRequirements;
  }

  public get footer(): string {
    return this.#footer;
  }

  public get info(): string {
    return this.#info;
  }

  public get internalNotes(): string {
    return this.#internalNotes;
  }

  public get order(): number {
    return this.#order;
  }

  public get section(): SectionCore {
    return this.#section;
  }

  public get subTitle(): string {
    return this.#subTitle;
  }

  public get type(): TStepType {
    return this.#type;
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

export class SectionCore extends ComposableCore implements ISectionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.section;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.section, ClassList.composable,
    ], obj);
  }

  public static create(data: Partial<ISectionCore> = {}) {
    if (data instanceof SectionCore) {
      return data;
    }
    return new SectionCore(data);
  }

  #lastStep: number | undefined;

  #requirements: RequirementCore[];

  #status: PROGRESS_BAR_STATUS;

  #order: number;

  constructor(data: Partial<ISectionCore> = {}) {
    super(data);
    this.#requirements = data.requirements?.map((r) => RequirementCore.create(r)) || [];
    this.#lastStep     = data.lastStep;
    this.#order        = data.order || 0;
    this.#status       = data.status || PROGRESS_BAR_STATUS.INCOMPLETE;
  }

  public get requirements() {
    return this.#requirements;
  }

  public get lastStep(): number | undefined {
    return this.#lastStep;
  }

  public set lastStep(val: number | undefined) {
    this.#lastStep = val;
  }

  public get order() {
    return this.#order;
  }

  public set order(val: number) {
    this.#order = val;
  }

  public get status(): PROGRESS_BAR_STATUS {
    return this.#status;
  }

  public set status(val: PROGRESS_BAR_STATUS) {
    this.#status = val;
  }
}

export class QuestionCore extends StepCore implements IQuestionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.question;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.question, ClassList.step], obj);
  }

  #type: QUESTION_TYPE;

  public get type(): QUESTION_TYPE {
    return this.#type;
  }

  #answers: AnswerCore[];

  #branch: BranchCore;

  #section: SectionCore;

  #answer = '';

  #answered: string[] = [];

  public static override create(data: Partial<IQuestionCore> = {}) {
    if (data instanceof QuestionCore) {
      return data;
    }
    return new QuestionCore(data);
  }

  constructor(data: Partial<IQuestionCore> = {}) {
    super(data);
    this.#answers = data.answers?.map((a) =>  AnswerCore.create(a)) || [];
    this.#branch  = BranchCore.create(data.branch);
    this.#section =  SectionCore.create(data.section);
    if (!data.type || `${data.type}` === `${QUESTION_TYPE.DEFAULT}`) {
      this.#type = QUESTION_TYPE.DEFAULT;
    } else {
      this.#type = data.type;
    }
  }

  public get answer() {
    return this.#answer;
  }

  public set answer(val: string) {
    this.#answered.push(val);
    this.#answer = val;
  }

  public getAnswerHistory() {
    return [...this.#answered];
  }

  public get branch() {
    return this.#branch;
  }

  public set branch(val: BranchCore) {
    this.#branch = val;
  }

  public get answers() {
    return this.#answers;
  }

  public get section() {
    return this.#section;
  }

  public add(data: AnswerCore | SectionCore | BranchCore) {
    if (data instanceof AnswerCore) {
      data.add(this);
      if (!this.existsIn(this.#answers, data)) {
        this.#answers.push(data);
      }
    } else if (data instanceof SectionCore) {
      this.#section = data;
    } else if (data instanceof BranchCore) {
      this.#branch = data;
    }
  }
}

export class ResponseCore extends BaseCore implements IResponseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.response], obj);
  }

  public static override create(data: Partial<IResponseCore> = {}) {
    if (data instanceof ResponseCore) {
      return data;
    }
    return new ResponseCore(data);
  }

  constructor(data: Partial<IResponseCore>) {
    super();
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
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.requirement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.composable], obj);
  }

  public static create(data: Partial<IRequirementCore> = {}) {
    if (data instanceof RequirementCore) {
      return data;
    }
    return new RequirementCore(data);
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
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.branch;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.composable], obj);
  }

  public static create(data: Partial<IBranchCore> = {}) {
    if (data instanceof BranchCore) {
      return data;
    }
    return new BranchCore(data);
  }

  constructor(data: Partial<IBranchCore> = {}) {
    super(data);
    this.questions = data.questions?.map((q) => RefCore.create(q)) || [];
  }

  public questions: RefCore[];
}
