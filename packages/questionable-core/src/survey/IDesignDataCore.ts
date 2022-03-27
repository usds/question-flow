import { IStepCore }     from './IStepCore';
import { IStepDataCore } from './IStepDataCore';

/**
 * Data defintion for design step
 */

export interface IDesignDataCore extends IStepDataCore {
  step: IStepCore;
}
