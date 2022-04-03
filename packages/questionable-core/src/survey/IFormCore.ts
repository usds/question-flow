import { TAgeCore }      from '../util/types';
import { IQuestionCore } from './IStepCore';

/**
 * Represents the survey as completed by the user
 */
export interface IFormCore {
  /**
   * Customer's age in years/months/days
   *
   * @title Age
   */
  age?: TAgeCore;
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
  responses: IQuestionCore[];
  /**
   * Time the survey was started
   *
   * @title Started
   */
  readonly started: Date;
}
