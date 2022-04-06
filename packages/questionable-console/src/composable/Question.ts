/* eslint-disable import/no-cycle */
import {
  QuestionCore,
} from '@usds.gov/questionable-core';
import {
  TStringFn,
  TOnAnswer,
  TOnDisplay,
  TValidateFn,
}              from '../util/types';
import { Answer } from './Answer';

export class Question extends QuestionCore {
  public static override create(data: Partial<Question>, order = 0) {
    if (data instanceof Question) {
      return data;
    }
    return new Question(data, order);
  }

  #answers: Answer[];

  constructor(data: Partial<Question>, order = 0) {
    super(data);
    this.#answers = data.answers?.map((a) => Answer.create(a)) || [];
    this.set('order', order);
    this.componentType = data.componentType;
    this.default       = data.default;
    this.onAnswer      = data.onAnswer;
    this.onDisplay     = data.onDisplay;
    this.validate      = data.validate;
  }

  public get answers(): Answer[] {
    return this.#answers;
  }

  componentType?: 'date' | 'path' | undefined;

  default?: string | TStringFn | undefined;

  onAnswer?: TOnAnswer | undefined;

  onDisplay?: TOnDisplay | undefined;

  validate?: TValidateFn | undefined;
}
