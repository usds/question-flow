import { getInstanceName, PREFIX, TInstanceOf } from '../util/instanceOf';
import { TAgeCore, ClassProperties }            from '../util/types';
import { IQuestionCore }                        from './IStepCore';

export const FormCoreClassName = getInstanceName(PREFIX.ACTION);
export type TEFormCoreProperties = {
  _age: '_age',
  _birthdate: '_birthdate',
  _finished: '_finished',
  _name: '_name',
  _responses: '_responses',
  _started: '_started',
  age: 'age',
  birthdate: 'birthdate',
  finished: 'finished',
  instanceOfCheck: 'instanceOfCheck',
  responses: 'responses',
  started: 'started'
};
export const EFormCoreProperties: TEFormCoreProperties = {
  _age:            '_age' as const,
  _birthdate:      '_birthdate' as const,
  _finished:       '_finished' as const,
  _name:           '_name' as const,
  _responses:      '_responses' as const,
  _started:        '_started' as const,
  age:             'age' as const,
  birthdate:       'birthdate' as const,
  finished:        'finished' as const,
  instanceOfCheck: 'instanceOfCheck' as const,
  responses:       'responses' as const,
  started:         'started' as const,
};
export type FormCoreProperties = ClassProperties<typeof EFormCoreProperties>;
// For (a little) brevity in interface members
const p = EFormCoreProperties;
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
