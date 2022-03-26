import { IPageDataCore } from '@usds.gov/questionable-core';
import { IPage }         from './IStep';
import { IStepData }     from './IStepData';

type TInterim = IPageDataCore & IStepData;

/**
 * Data defintion for page step
 */
export interface IPageData extends TInterim {
  step: IPage;
}
