/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
import {
  StepCore, TStepCtor,
} from '@usds.gov/questionable-core';
import { IStep }                              from '../survey/IStep';
import { TOnAnswer, TOnDisplay, TValidateFn } from '../util/types';
import { Questionnaire }                      from './Questionnaire';

export class Step extends StepCore implements IStep {
  constructor(data: TStepCtor, questionnaire: Questionnaire) {
    super(data, questionnaire);
  }

  onAnswer?: TOnAnswer | undefined;

  onDisplay?: TOnDisplay | undefined;

  validate?: TValidateFn | undefined;
}
