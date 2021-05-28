import { TAge, TAgeCalc, TAnswers } from '../lib/types';

/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirement {
  minAge?: TAge;
  maxAge?: TAge;
  ageCalc?: TAgeCalc;
  answers: TAnswers;
  explanation?: string;
}
