import { IQuestion } from './IStep';
import { IStepData } from './IStepData';

/**
 * Data defintion for question step
 */

export interface IQuestionData extends IStepData {
  step: IQuestion;
}
