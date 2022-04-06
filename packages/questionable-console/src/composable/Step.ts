/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
import {
  StepCore,
} from '@usds.gov/questionable-core';
import { IStep }                              from '../survey/IStep';
import { TOnAnswer, TOnDisplay, TValidateFn } from '../util/types';

export class Step extends StepCore implements IStep {
  constructor(data: Partial<Step>) {
    super(data);
  }

  onAnswer?: TOnAnswer | undefined;

  onDisplay?: TOnDisplay | undefined;

  validate?: TValidateFn | undefined;
}
