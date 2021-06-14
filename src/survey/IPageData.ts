import { IPage }     from './IStep';
import { IStepData } from './IStepData';

/**
 * Data defintion for page step
 */
export interface IPageData extends IStepData {
  step: IPage;
}
