/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                 from '../constructable/types';
import { IAnswerCore }                             from '../survey/IAnswerCore';
import { ANSWER_TYPE, TAnswerType }                from '../util/enums';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { QuestionCore }                            from './QuestionCore';
import { RefCore }                                 from './RefCore';

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
