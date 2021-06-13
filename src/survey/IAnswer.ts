import { TAge }      from '../lib/types';
import { IQuestion } from './IStep';

/**
 * Represents the survey as completed by the user
 */
export interface IAnswer {
  /**
   * Customer's age in years/months/days
   *
   * @title Age
   */
  age?: TAge;
  /**
   * All currently provided answers
   *
   * @title Answers
   */
  answers: IQuestion[];
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
   * Time the survey was started
   *
   * @title Started
   */
  readonly started: Date;
}
