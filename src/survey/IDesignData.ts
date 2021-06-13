import { IStep }     from './IStep';
import { IStepData } from './IStepData';

/**
 * Data defintion for design step
 */

export interface IDesignData extends IStepData {
  step: IStep;
}
