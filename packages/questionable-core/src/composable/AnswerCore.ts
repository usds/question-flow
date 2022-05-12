/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                       from '../constructable/lib/pools';
import { IAnswerCore }                                   from '../metadata/IAnswerCore';
import { ANSWER_TYPE, TAnswerType }                      from '../metadata/properties/type/TAnswerType';
import {
  checkInstanceOf, ClassList, EClassList, TInstanceOf,
} from '../lib/instanceOf';
import { QuestionCore } from './QuestionCore';
import { RefCore }      from './RefCore';
import { TCollectable } from '../metadata/types/TCollectable';
import { classCreate }  from '../constructable/Factory';

type TMatches = {
  questions?: TCollectable[];
} | {
  answer?: TCollectable;
} | {
  answers?: TCollectable[];
};
type TActionable = TCollectable & TMatches;

export class AnswerCore extends RefCore implements IAnswerCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.answer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.answer, ClassList.ref], obj });
  }

  public static override create(data: Partial<AnswerCore>): AnswerCore {
    if (data instanceof AnswerCore) {
      return data;
    }
    return new AnswerCore(data);
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
    this.#key       = data.key || '';
    this.#synonyms  = data.synonyms || [];
    this.#type      = data.type || ANSWER_TYPE.FIXED;
    this.#questions = data.questions?.map((itm) => classCreate(EClassList.QUESTION, itm)) || [];
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

  public existsIn(data: TActionable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TActionable): AnswerCore {
    addToPool(data, this);
    return this;
  }
}
