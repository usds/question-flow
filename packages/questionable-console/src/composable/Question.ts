/* eslint-disable import/no-cycle */
import {
  noopAsync,
  QuestionCore,
  AnswerCore as Answer,
  TQuestionType,
} from '@usds.gov/questionable-core';
import {
  TStringFn,
}              from '../util/types';
import {
  TOnAnswer,
  TOnDisplay,
  TValidateFn,
} from './Step';

export class Question extends QuestionCore {
  public static override create(data: Partial<Question>, order = 0) {
    if (data instanceof Question) {
      return data;
    }
    return new Question(data, order);
  }

  #answers: Answer[];

  #componentType?: 'date' | 'path' | undefined;

  #default?: string | TStringFn;

  #onAnswer?: TOnAnswer;

  #onDisplay?: TOnDisplay;

  #validate?: TValidateFn;

  constructor(data: Partial<Question>, order = 0) {
    super(data);
    this.#answers = data.answers?.map((a) => Answer.create(a)) || [];
    this.set('order', order);
    this.#componentType = data.componentType || undefined;
    this.#default       = data.default || '';
    this.#onAnswer      = data.onAnswer || noopAsync;
    this.#onDisplay     = data.onDisplay || noopAsync;
    this.#validate      = data.validate || (async () => true);
  }

  public get answers(): Answer[] {
    return this.#answers;
  }

  public get componentType() {
    return this.#componentType;
  }

  public get default() {
    return this.#default;
  }

  public get onAnswer() {
    return this.#onAnswer;
  }

  public get onDisplay() {
    return this.#onDisplay;
  }

  public get validate() {
    return this.#validate;
  }

  public get type(): TQuestionType {
    return super.type;
  }
}
