import { TAge, TAgeCalc, TAnswers } from '../lib/types';

/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirement {
  /**
   * @hidden
   */
  ageCalc?: TAgeCalc;
  answers: TAnswers;
  explanation?: string;
  maxAge?: TAge;
  minAge?: TAge;
}
