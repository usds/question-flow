/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
import {
  StepCore,
} from '@usds.gov/questionable-core';
import { TVal } from '../util/types';

export type TOnAnswer = (answer: TVal, step: Step, ...params: unknown[]) => Promise<void>;
export type TOnDisplay = (answer:TVal, step: Step, ...params: unknown[]) => Promise<void>;
export type TValidateFn = (answer: TVal, step: Step, ...params: unknown[]) => Promise<boolean>;

export class Step extends StepCore {
  constructor(data: Partial<Step>) {
    super(data);
  }

  onAnswer?: TOnAnswer | undefined;

  onDisplay?: TOnDisplay | undefined;

  validate?: TValidateFn | undefined;
}
