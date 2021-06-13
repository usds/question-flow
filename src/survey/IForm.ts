import { TAge }      from '../lib/types';
import { IQuestion } from './IQuestion';

/**
 * Represents the survey as completed by the user
 */
export interface IForm {
  /**
   * Customer's age in years/months/days
   *
   * @title Age
   */
  age?: TAge;
  /**
   * Customer's entered birthdate
   *
   * @title Birthdate
   */
  birthdate?: string;
  /**
   * Time the survey was completed
   *
   * @title Finished
   */
  finished?: Date;
  /**
   * All currently provided responses
   *
   * @title Responses
   */
  responses: IQuestion[];
  /**
   * Time the survey was started
   *
   * @title Started
   */
  readonly started: Date;
}
