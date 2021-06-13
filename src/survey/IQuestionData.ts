import { IQuestion } from './IQuestion';
import { IStepData } from './IStepData';

/**
 * Data defintion for question step
 */

export interface IQuestionData extends IStepData {
  step: IQuestion;
}
