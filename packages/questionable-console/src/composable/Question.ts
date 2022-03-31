/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
import {
  QuestionCore,
  QUESTION_TYPE,
  TQuestionCoreCtor,
} from '@usds.gov/questionable-core';
import { IAnswer, IQuestion } from '../survey/IStep';
import {
  TStringFn,
  TOnAnswer,
  TOnDisplay,
  TValidateFn,
}              from '../util/types';
import { Questionnaire } from './Questionnaire';
import { Step }          from './Step';

type ctor = TQuestionCoreCtor;

export class Question extends QuestionCore implements Step, IQuestion {
  constructor(data: ctor, questionnaire: Questionnaire) {
    super(data, questionnaire);
    this.type = data.type;
  }

  answers: IAnswer[] = [];

  componentType?: 'date' | 'path' | undefined;

  default?: string | TStringFn | undefined;

  onAnswer?: TOnAnswer | undefined;

  onDisplay?: TOnDisplay | undefined;

  validate?: TValidateFn | undefined;

  type: QUESTION_TYPE;
}
