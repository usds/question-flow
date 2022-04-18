/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                 from '../constructable/types';
import { TCollectable }                            from '../metadata/types/TCollectable';
import { IQuestionCore }                           from '../metadata/IQuestionCore';
import { QUESTION_TYPE, TQuestionType }            from '../metadata/properties/type/TQuestionType';
import { checkInstanceOf, ClassList, TInstanceOf } from '../lib/instanceOf';
import { TPointerDirection }                       from '../lib/types';
import { AnswerCore }                              from './AnswerCore';
import { BranchCore }                              from './BranchCore';
import { SectionCore }                             from './SectionCore';
import { StepCore }                                from './StepCore';

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
