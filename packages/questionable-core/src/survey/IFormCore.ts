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
  age?: TAgeCore | undefined;
  /**
   * Customer's entered birthdate
   *
   * @title Birthdate
   */
  birthdate?: string | undefined;
  /**
   * Time the survey was completed
   *
   * @title Finished
   */
  finished?: Date | undefined;
  /**
   * All currently provided responses
   *
   * @title Responses
   */
  responses?: IQuestionCore[] | undefined;
  /**
   * Time the survey was started
   *
   * @title Started
   */
  readonly started: Date;
}
