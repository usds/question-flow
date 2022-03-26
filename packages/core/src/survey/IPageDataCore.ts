import { IPageCore }     from './IStepCore';
import { IStepDataCore } from './IStepDataCore';

/**
 * Data defintion for page step
 */
export interface IPageDataCore extends IStepDataCore {
  step: IPageCore;
}
