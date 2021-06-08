import { TAge, TAgeCalc, TAnswers } from '../lib/types';

/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirement {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  ageCalc?: TAgeCalc;
  /**
   * Map of step id to required answer values
   *
   * @title Answers
   */
  answers: TAnswers;
  /**
   * User facing description of this requirement
   *
   * @title Exlanation
   */
  explanation?: string;
  /**
   * Optional maximum age allowed for this requirement
   *
   * @title Maximum Age
   */
  maxAge?: TAge;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  minAge?: TAge;
}
