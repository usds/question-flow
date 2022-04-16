/* eslint-disable no-param-reassign,
  @typescript-eslint/no-use-before-define,
  no-useless-constructor, import/no-cycle, max-classes-per-file */

import { kebabCase }                             from 'lodash';
import { addToPool, existsInPool, TCollectable } from '../constructable/types';
import { IAnswerCore }                           from '../survey/IAnswerCore';
import { IBranchCore }                           from '../survey/IBranchCore';
import {
  IQuestionCore,
  IRequirementCore,
  IResponseCore,
  ISectionCore,
  IStepCore,
} from '../survey/IStepCore';
import {
  isEnum,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  TStepType,
  TSectionType,
  SECTION_TYPE,
  TQuestionType,
  STEP_TYPE,
  TResponseType,
  RESPONSE_TYPE,
  TRequirementType,
  REQUIREMENT_TYPE,
  BRANCH_TYPE,
  TBranchType,
  TAnswerType,
  ANSWER_TYPE,
  TProgressBarStatusType,
} from '../util/enums';
import { matches }                                   from '../util/helpers';
import { checkInstanceOf, ClassList, TInstanceOf }   from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore, TPointerDirection } from '../util/types';
import { RefCore }                                   from './RefCore';

export class StepCore extends RefCore implements IStepCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.step;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, ClassList.ref], obj);
  }

  public static override create(data: Partial<StepCore>) {
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

  #type: TStepType;

  constructor(data: Partial<StepCore>) {
    super(data);
    this.#entryRequirements = data.entryRequirements?.map((r) => RequirementCore.create(r)) || [];
    this.#exitRequirements  = data.exitRequirements?.map((r) => RequirementCore.create(r)) || [];
    const type: TStepType   = (!data.type || `${data.type}` === `${STEP_TYPE.DEFAULT}`) ? STEP_TYPE.DEFAULT : data.type;
    this.#type              = type;
    this.#footer            = data.footer || '';
    this.#info              = data.info || '';
    this.#internalNotes     = data.internalNotes || '';
    this.#order             = data.order || 0;
    this.#section           = SectionCore.createOptional(data.section);
    this.#subTitle          = data.subTitle || '';
  }

  public toString() {
    return this.id;
  }

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

  public existsIn(data: TCollectable, direction?: TPointerDirection): boolean {
    if (data instanceof RequirementCore) {
      if (direction === 'out') {
        return this.#exitRequirements.some(
          (q) => q === data || matches(q.title, data.title),
        );
      }
      return this.#entryRequirements.some(
        (q) => q === data || matches(q.title, data.title),
      );
    }
    return existsInPool(data, this);
  }

  public add(data: TCollectable, direction?: TPointerDirection): StepCore {
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
    addToPool(data, this);
    return this;
  }
}

export class SectionCore extends RefCore implements ISectionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.section;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.section, ClassList.ref], obj);
  }

  public static override create(data: Partial<SectionCore>) {
    if (data instanceof SectionCore) {
      return data;
    }
    return new SectionCore(data);
  }

  public static override createOptional(data?: Partial<SectionCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return SectionCore.create(data);
  }

  #lastStep: number | undefined;

  #requirements: RequirementCore[];

  #status: TProgressBarStatusType;

  #order: number;

  #type: TSectionType;

  constructor(data: Partial<SectionCore>) {
    super(data);
    this.#requirements = data.requirements?.map((r) => RequirementCore.create(r)) || [];
    this.#lastStep     = data.lastStep;
    this.#order        = data.order || 0;
    this.#status       = data.status || PROGRESS_BAR_STATUS.INCOMPLETE;
    this.#type         = data.type || SECTION_TYPE.UNLOCKED;
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

  public get status(): TProgressBarStatusType {
    return this.#status;
  }

  public set status(val: TProgressBarStatusType) {
    this.#status = val;
  }

  public get type(): TSectionType {
    return this.#type;
  }

  public existsIn(data: RequirementCore): boolean {
    return existsInPool(data, this);
  }

  public add(data: RequirementCore): SectionCore {
    addToPool(data, this);
    return this;
  }
}

export class QuestionCore extends StepCore implements IQuestionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.question;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.question, ClassList.step], obj);
  }

  public static override create(data: Partial<QuestionCore>) {
    if (data instanceof QuestionCore) {
      return data;
    }
    return new QuestionCore(data);
  }

  public static override createOptional(data?: Partial<QuestionCore>) {
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

  #type: TQuestionType;

  constructor(data: Partial<QuestionCore>) {
    super(data);
    const type: TQuestionType = (!data.type || `${data.type}` === `${QUESTION_TYPE.DEFAULT}`)
      ? QUESTION_TYPE.TEXT : data.type;
    this.#type                = type;
    this.#answers             = data.answers?.map((a) => AnswerCore.create(a)) || [];
    this.#branch              = BranchCore.createOptional(data.branch);
    this.#section             = SectionCore.createOptional(data.section);
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

  public get type(): TQuestionType {
    return this.#type;
  }

  public override existsIn(data: TCollectable, direction?: TPointerDirection): boolean {
    if (super.existsIn(data, direction)) {
      return true;
    }
    return existsInPool(data, this);
  }

  public override add(data: TCollectable, direction?: TPointerDirection): QuestionCore {
    if (this.existsIn(data, direction)) {
      return this;
    }
    addToPool(data, this);
    if (data instanceof AnswerCore) {
      data.add(this);
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

  public static override create(data: Partial<ResponseCore>) {
    if (data instanceof ResponseCore) {
      return data;
    }
    return new ResponseCore(data);
  }

  public static override createOptional(data?: Partial<ResponseCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return ResponseCore.create(data);
  }

  #answers: AnswerCore[];

  #question: QuestionCore | undefined;

  #type: TResponseType;

  constructor(data: Partial<ResponseCore>) {
    super(data);
    this.#answers = data.answers?.map((a) => AnswerCore.create(a)) || [];
    if (data.question) {
      this.#question = QuestionCore.create(data.question);
    }
    this.#type = data.type || RESPONSE_TYPE.COMPLETE;
  }

  public get question(): QuestionCore | undefined {
    return this.#question;
  }

  public get answers(): AnswerCore[] {
    return this.#answers;
  }

  public get type(): TResponseType {
    return this.#type;
  }

  public existsIn(data: TCollectable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TCollectable): ResponseCore {
    addToPool(data, this);
    return this;
  }
}

export class RequirementCore extends RefCore implements IRequirementCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.requirement;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.ref], obj);
  }

  public static override create(data: Partial<RequirementCore>) {
    if (data instanceof RequirementCore) {
      return data;
    }
    return new RequirementCore(data);
  }

  public static override createOptional(data?: Partial<RequirementCore>) {
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

  #type: TRequirementType;

  constructor(data: Partial<RequirementCore>) {
    super(data);
    this.#ageCalc     = data.ageCalc || (() => true);
    this.#explanation = data.explanation || '';
    this.#maxAge      = data.maxAge;
    this.#minAge      = data.minAge;
    this.#responses   = data.responses?.map((q) => new ResponseCore(q)) || [];
    this.#type        = data.type || REQUIREMENT_TYPE.NON_REQUIRED;
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

  get type(): TRequirementType {
    return this.#type;
  }

  public existsIn(data: TCollectable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TCollectable): RequirementCore {
    addToPool(data, this);
    if (data instanceof ResponseCore) {
      (data as ResponseCore).add(this);
    }
    return this;
  }
}

export class BranchCore extends RefCore implements IBranchCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.branch;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.ref], obj);
  }

  public static override create(data: Partial<BranchCore>) {
    if (data instanceof BranchCore) {
      return data;
    }
    return new BranchCore(data);
  }

  public static override createOptional(data?: Partial<BranchCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return BranchCore.create(data);
  }

  #questions;

  #sections;

  #type: TBranchType;

  constructor(data: Partial<BranchCore>) {
    super(data);
    this.#questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.#sections  = data.sections?.map((q) => SectionCore.create(q)) || [];
    this.#type      = data.type || BRANCH_TYPE.LINEAR;
  }

  public get questions(): QuestionCore[] {
    return this.#questions;
  }

  public get sections(): SectionCore[] {
    return this.#sections;
  }

  public get type(): TBranchType {
    return this.#type;
  }

  public existsIn(data: SectionCore | QuestionCore): boolean {
    return existsInPool(data, this);
  }

  public add(data: SectionCore | QuestionCore): BranchCore {
    data.branch = this;
    addToPool(data, this);
    return this;
  }
}

export class AnswerCore extends RefCore implements IAnswerCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.answer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.answer, ClassList.ref], obj);
  }

  public static override create(
    data: Partial<AnswerCore>,
    question?: QuestionCore,
  ): AnswerCore {
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

  public static override createOptional(data?: Partial<AnswerCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return AnswerCore.create(data);
  }

  #key = '';

  #questions: QuestionCore[] = [];

  #synonyms: string[] = [];

  #type: TAnswerType;

  constructor(data: Partial<AnswerCore>) {
    super(data);
    this.#key      = data.key || '';
    this.#synonyms = data.synonyms || [];
    this.#type     = data.type || ANSWER_TYPE.FIXED;
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

  public get type(): TAnswerType {
    return this.#type;
  }

  public existsIn(data: QuestionCore): boolean {
    return existsInPool(data, this);
  }

  public add(data: QuestionCore): AnswerCore {
    addToPool(data, this);
    return this;
  }
}
