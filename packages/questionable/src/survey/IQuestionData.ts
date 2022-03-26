import { IQuestionDataCore } from '@usds.gov/questionable-core';
import { IQuestion }         from './IStep';
import { IStepData }         from './IStepData';

type TInterim = IQuestionDataCore & IStepData;

/**
 * Data defintion for question step
 */
export interface IQuestionData extends TInterim {
  step: IQuestion;
}
