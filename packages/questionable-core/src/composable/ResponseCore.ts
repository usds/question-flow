/* eslint-disable import/no-cycle */
import { addToPool, existsInPool }                 from '../constructable/types';
import { TCollectable }                            from '../metadata/types/TCollectable';
import { IResponseCore }                           from '../metadata/IResponseCore';
import { RESPONSE_TYPE, TResponseType }            from '../metadata/properties/type/TResponseType';
import { checkInstanceOf, ClassList, TInstanceOf } from '../lib/instanceOf';
import { AnswerCore }                              from './AnswerCore';
import { QuestionCore }                            from './QuestionCore';
import { RefCore }                                 from './RefCore';

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
