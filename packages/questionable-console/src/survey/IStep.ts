import {
  IPageCore,
  IQuestionCore,
  IStepCore,
  PAGE_TYPE,
  QUESTION_TYPE,
  IRefCore,
} from '@usds.gov/questionable-core';
import {
  TStringFn, TOnDisplay, TOnAnswer, TValidateFn,
} from '../util/types';

export interface IStep extends IStepCore {
  onAnswer?: TOnAnswer;
  onDisplay?: TOnDisplay;
  validate?: TValidateFn;
}

export interface IAnswer extends IRefCore {
  key?: string;
}

export interface IQuestion extends IStep, IQuestionCore {
  answers: IAnswer[];
  componentType?: 'date' | 'path';
  default?: string | TStringFn;
  type: QUESTION_TYPE;
}

export interface IPage extends IStep, IPageCore {
  type: PAGE_TYPE;
}
