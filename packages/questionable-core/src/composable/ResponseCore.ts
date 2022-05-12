/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                       from '../constructable/lib/pools';
import { TCollectable }                                  from '../metadata/types/TCollectable';
import { IResponseCore }                                 from '../metadata/IResponseCore';
import { RESPONSE_TYPE, TResponseType }                  from '../metadata/properties/type/TResponseType';
import {
  checkInstanceOf, ClassList, EClassList, TInstanceOf,
} from '../lib/instanceOf';
import { AnswerCore }   from './AnswerCore';
import { QuestionCore } from './QuestionCore';
import { RefCore }      from './RefCore';
import { classCreate }  from '../constructable/Factory';

type TMatches = {
  question: TCollectable;
} | {
  answers: TCollectable[];
};
type TRespondable = TCollectable & TMatches;

export class ResponseCore extends RefCore implements IResponseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.response;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.response], obj });
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
    this.#answers  = data.answers?.map((itm) => classCreate(EClassList.ANSWER, itm)) || [];
    this.#question = classCreate(EClassList.QUESTION, data.question, true);
    this.#type     = data.type || RESPONSE_TYPE.COMPLETE;
  }

  public get question(): QuestionCore | undefined {
    return this.#question;
  }

  public set question(data: QuestionCore | undefined) {
    if (data && !this.#question) {
      this.#question = data;
    }
  }

  public get answers(): AnswerCore[] {
    return this.#answers;
  }

  public set answers(data: AnswerCore[]) {
    if (!this.#answers) {
      this.#answers = data;
    }
  }

  public get type(): TResponseType {
    return this.#type;
  }

  public existsIn(data: TRespondable): boolean {
    return existsInPool(data, this);
  }

  public add(data: TCollectable): ResponseCore {
    addToPool(data, this);
    return this;
  }
}
