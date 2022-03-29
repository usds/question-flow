import { TReducerCore } from '../util/types';
import { IFormCore }    from './IFormCore';
import { IStepCore }    from './IStepCore';

/**
 * Data defintion for base wizard step
 */
export interface IStepDataCore {
  /**
   * Reducer to execute with form progression
   *
   * @hidden JSON Schema doesn't support functions
   */
  dispatchForm: TReducerCore;
  /**
   * The user's current form state
   *
   * @title FormCore
   */
  form: IFormCore;
  /**
   * Current step
   *
   * @title Step
   */
  step?: IStepCore;
/**
 * Internally unique identifier
 *
 * @title Step ID
 */
  stepId: string | number;
}
