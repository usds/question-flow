/* eslint-disable import/no-cycle */
import { IAnswerCore } from '../survey/IAnswerCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { RefCore }      from './RefCore';
import { QuestionCore } from './StepCore';

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
    if (!data) {
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

  public add(question: QuestionCore) {
    super.add(question);
    const exists = this.existsIn(this.#questions, question);
    if (!exists) {
      this.#questions.push(question);
    }
    return question;
  }
}
