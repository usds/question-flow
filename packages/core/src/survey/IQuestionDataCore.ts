import { IQuestionCore } from './IStepCore';
import { IStepDataCore } from './IStepDataCore';

/**
 * Data defintion for question step
 */

export interface IQuestionDataCore extends IStepDataCore {
  step: IQuestionCore;
}
