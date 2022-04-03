import { TInstanceOf }               from '../util/instanceOf';
import { TAgeCore }                  from '../util/types';
import { EFormCoreProperties as p  } from '../metadata/MForm';
import { IQuestionCore }             from './IStepCore';

/**
 * Represents the survey as completed by the user
 */
export interface IFormCore {
  [p.instanceOfCheck]: TInstanceOf;
  /**
   * Customer's age in years/months/days
   *
   * @title Age
   */
  [p.age]?: TAgeCore;
  /**
   * Customer's entered birthdate
   *
   * @title Birthdate
   */
  [p.birthdate]?: string;
  /**
   * Time the survey was completed
   *
   * @title Finished
   */
  [p.finished]?: Date;
  /**
   * All currently provided responses
   *
   * @title Responses
   */
  [p.responses]: IQuestionCore[];
  /**
   * Time the survey was started
   *
   * @title Started
   */
  readonly [p.started]: Date;
}
