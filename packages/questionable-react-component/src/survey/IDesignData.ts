import { IDesignDataCore } from '@usds.gov/questionable-core';
import { IStep }           from './IStep';
import { IStepData }       from './IStepData';

type TInterim = IDesignDataCore & IStepData;

/**
 * Data defintion for design step
 */
export interface IDesignData extends TInterim {
  step: IStep;
}
