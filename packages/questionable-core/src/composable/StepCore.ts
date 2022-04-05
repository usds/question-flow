/* eslint-disable no-param-reassign */
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
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore } from '../util/types';
import { IBranchCore }            from '../survey/IBranchCore';
import { RefCore }                from './RefCore';
import { matches }                from '../util/helpers';
import { ResultCore }             from './ResultCore';
import { IAnswerCore }            from '../survey/IAnswerCore';

type TCollected = RequirementCore | AnswerCore | StepCore | QuestionCore | ResultCore;
type TDirection = 'in' | 'out';

export class StepCore extends RefCore implements IStepCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.step;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, ClassList.ref], obj);
  }

  public static override create(data: IStepCore) {
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

  #section: SectionCore | undefined;

  #subTitle: string;

  constructor(data: IStepCore) {
    super(data);

    this.#entryRequirements = data.entryRequirements?.map((r) =>
      RequirementCore.create(r)) || [];
    this.#exitRequirements  = data.exitRequirements?.map((r) =>
      RequirementCore.create(r)) || [];
    if (!data.type || `${data.type}` === `${BASE.DEFAULT}`) {
      this.set('type', BASE.DEFAULT);
    } else {
      this.set('type', data.type);
    }
    this.#footer        = data.footer || '';
    this.#info          = data.info || '';
    this.#internalNotes = data.internalNotes || '';
    this.#order         = data.order || 0;
    this.#section       = SectionCore.createOptional(data.section);
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

  public get section(): SectionCore | undefined {
    return this.#section;
  }

  public get subTitle(): string {
    return this.#subTitle;
  }

  public get type(): TStepType {
    return super.type as TStepType; // this.#type;
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

  public existsIn(data: TCollected, direction?: TDirection): boolean {
    if (data instanceof RequirementCore) {
      if (direction === 'out') {
        return this.#exitRequirements.some((q) => q === data || matches(q.title, data.title));
      }
      return this.#entryRequirements.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: TCollected, direction?:TDirection): StepCore {
    const exists = this.existsIn(data, direction);
    if (exists) {
      return this;
    }
    if (data instanceof RequirementCore) {
      if (direction === 'out') {
        this.#exitRequirements.push(data);
      } else {
        this.#entryRequirements.push(data);
      }
    }
    return this;
  }
}

export class SectionCore extends RefCore implements ISectionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.section;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.section, ClassList.ref,
    ], obj);
  }

  public static override create(data: ISectionCore) {
    if (data instanceof SectionCore) {
      return data;
    }
    return new SectionCore(data);
  }

  public static override createOptional(data?: ISectionCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return SectionCore.create(data);
  }

  #lastStep: number | undefined;

  #requirements: RequirementCore[];

  #status: PROGRESS_BAR_STATUS;

  #order: number;

  constructor(data: ISectionCore) {
    super(data);
    this.#requirements = data.requirements?.map((r) => RequirementCore.create(r)) || [];
    this.#lastStep     = data.lastStep;
    this.#order        = data.order || 0;
    this.#status       = data.status || PROGRESS_BAR_STATUS.INCOMPLETE;
  }

  public get requirements(): RequirementCore[] {
    return this.#requirements;
  }

  public get lastStep(): number | undefined {
    return this.#lastStep;
  }

  public set lastStep(val: number | undefined) {
    this.#lastStep = val;
  }

  public get order(): number {
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

  public existsIn(data: RequirementCore): boolean {
    if (data instanceof RequirementCore) {
      return this.#requirements.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: RequirementCore): SectionCore {
    const exists = this.existsIn(data);
    if (exists) {
      return this;
    }
    if (data instanceof RequirementCore) {
      this.#requirements.push(data);
    }
    return this;
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

  public static override create(data: IQuestionCore) {
    if (data instanceof QuestionCore) {
      return data;
    }
    return new QuestionCore(data);
  }

  public static override createOptional(data?: IQuestionCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return QuestionCore.create(data);
  }

  // #type: QUESTION_TYPE;

  #answers: AnswerCore[];

  #branch: BranchCore | undefined;

  #section: SectionCore | undefined;

  #answer = '';

  #answered: string[] = [];

  constructor(data: IQuestionCore) {
    super(data);
    this.#answers = data.answers?.map((a) =>  AnswerCore.create(a)) || [];
    this.#branch  = BranchCore.createOptional(data.branch);
    this.#section =  SectionCore.createOptional(data.section);
    if (!data.type || `${data.type}` === `${QUESTION_TYPE.DEFAULT}`) {
      this.set('type', QUESTION_TYPE.DEFAULT);
    } else {
      this.set('type', data.type);
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

  public set branch(val: BranchCore | undefined) {
    this.#branch = val;
  }

  public get answers() {
    return this.#answers;
  }

  public get section() {
    return this.#section;
  }

  public set section(val: SectionCore | undefined) {
    this.#section = val;
  }

  public get type(): QUESTION_TYPE {
    return super.type as QUESTION_TYPE;
  }

  public override existsIn(data: TCollected, direction?: TDirection): boolean {
    if (super.existsIn(data, direction)) {
      return true;
    }
    if (data instanceof AnswerCore) {
      return this.#answers.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public override add(data: TCollected, direction?: TDirection): QuestionCore {
    if (this.existsIn(data, direction)) {
      return this;
    }
    if (data instanceof AnswerCore) {
      data.add(this);
      this.#answers.push(data);
    }
    return this;
  }
}

export class ResponseCore extends RefCore implements IResponseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.response], obj);
  }

  public static override create(data: IResponseCore) {
    if (data instanceof ResponseCore) {
      return data;
    }
    return new ResponseCore(data);
  }

  public static override createOptional(data?: IResponseCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return ResponseCore.create(data);
  }

  #answers: AnswerCore[];

  #question: QuestionCore;

  constructor(data: IResponseCore) {
    super(data);
    this.#answers  = data.answers?.map((a) => new AnswerCore(a)) || [];
    this.#question = QuestionCore.create(data.question);
  }

  public get question(): QuestionCore {
    return this.#question;
  }

  public get answers(): AnswerCore[] {
    return this.#answers;
  }

  public existsIn(data: TCollected): boolean {
    if (data instanceof AnswerCore) {
      return this.#answers.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: TCollected): ResponseCore {
    if (this.existsIn(data)) {
      return this;
    }
    if (data instanceof AnswerCore) {
      this.#answers.push(data);
    }
    return this;
  }
}

export class RequirementCore extends RefCore implements IRequirementCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.requirement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.ref], obj);
  }

  public static override create(data: IRequirementCore) {
    if (data instanceof RequirementCore) {
      return data;
    }
    return new RequirementCore(data);
  }

  public static override createOptional(data?: IRequirementCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return RequirementCore.create(data);
  }

  #ageCalc;

  #explanation;

  #maxAge;

  #minAge;

  #responses;

  constructor(data: IRequirementCore) {
    super(data);

    this.#ageCalc     = data.ageCalc || (() => true);
    this.#explanation = data.explanation || '';
    this.#maxAge      = data.maxAge;
    this.#minAge      = data.minAge;
    this.#responses   = data.responses?.map((q) => new ResponseCore(q)) || [];
  }

  get ageCalc(): TAgeCalcCore | undefined {
    return this.#ageCalc;
  }

  get explanation(): string {
    return this.#explanation;
  }

  get maxAge(): TAgeCore | undefined {
    return this.#maxAge;
  }

  get minAge(): TAgeCore | undefined {
    return this.#minAge;
  }

  get responses(): ResponseCore[] {
    return this.#responses;
  }

  public existsIn(data: TCollected): boolean {
    if (data instanceof ResponseCore) {
      return this.#responses.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: TCollected): RequirementCore {
    if (this.existsIn(data)) {
      return this;
    }
    if (data instanceof ResponseCore) {
      data.add(this);
      this.#responses.push(data);
    }
    return this;
  }
}

export class BranchCore extends RefCore implements IBranchCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.branch;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.ref], obj);
  }

  public static override create(data: IBranchCore) {
    if (data instanceof BranchCore) {
      return data;
    }
    return new BranchCore(data);
  }

  public static override createOptional(data?: IBranchCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return BranchCore.create(data);
  }

  #questions;

  #sections;

  constructor(data: IBranchCore) {
    super(data);
    this.#questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.#sections  = data.sections?.map((q) => SectionCore.create(q)) || [];
  }

  public get questions(): QuestionCore[] {
    return this.#questions;
  }

  public get sections(): SectionCore[] {
    return this.#sections;
  }

  public existsIn(data: TCollected): boolean {
    if (data instanceof SectionCore) {
      return this.#sections.some((q) => q === data || matches(q.title, data.title));
    }
    if (data instanceof QuestionCore) {
      return this.#questions.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: TCollected): BranchCore {
    if (this.existsIn(data)) {
      return this;
    }
    if (data instanceof SectionCore) {
      data.branch = this;
      this.#sections.push(data);
    }
    if (data instanceof QuestionCore) {
      data.branch = this;
      this.#questions.push(data);
    }
    return this;
  }
}

export class AnswerCore extends RefCore implements IAnswerCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.answer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.answer, ClassList.ref], obj);
  }

  public static override create(data: IAnswerCore, question?: QuestionCore): AnswerCore {
    let ret: AnswerCore;
    if (data instanceof AnswerCore) {
      ret = data;
    }
    ret = new AnswerCore(data);
    if (question) {
      ret.#questions.push(question);
    }
    return ret;
  }

  public static override createOptional(data?: IAnswerCore) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return AnswerCore.create(data);
  }

  #key = '';

  #questions: QuestionCore[] = [];

  #synonyms: string[] = [];

  constructor(data: IAnswerCore) {
    super(data);
    this.#key      = data.key || '';
    this.#synonyms = data.synonyms || [];
  }

  public get key() {
    return this.#key;
  }

  public get questions() {
    return this.#questions;
  }

  public get synonyms() {
    return this.#synonyms;
  }

  public existsIn(data: QuestionCore): boolean {
    if (data instanceof QuestionCore) {
      return this.#questions.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: QuestionCore): AnswerCore {
    if (data instanceof QuestionCore) {
      const exists = this.existsIn(data);
      if (!exists) {
        this.#questions.push(data);
      }
    }
    return this;
  }
}
