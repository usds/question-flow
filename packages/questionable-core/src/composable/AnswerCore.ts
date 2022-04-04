/* eslint-disable import/no-cycle */
import { IAnswerCore } from '../survey/IAnswerCore';
import {
  IRefCore,
} from '../survey/IRefCore';
import { matches } from '../util';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { ComposableCore } from './ComposableCore';
import { QuestionCore }   from './StepCore';

export class AnswerCore extends ComposableCore implements IAnswerCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.answer;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.answer, ClassList.composable], obj);
  }

  public static override create(data: Partial<IAnswerCore>, question?: QuestionCore): AnswerCore {
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

  #key = '';

  #questions: QuestionCore[] = [];

  constructor(data: Partial<IAnswerCore> = {}) {
    super(data);
    this.#key = data.key || '';
  }

  public get key() {
    return this.#key;
  }

  public get questions() {
    return this.#questions;
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
