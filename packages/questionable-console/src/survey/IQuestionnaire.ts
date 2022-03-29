import { IQuestionnaireCore } from '@usds.gov/questionable-core';
import { IQuestion, IStep }   from './IStep';

export interface IQuestionnaire extends IQuestionnaireCore {
  questions: IQuestion[],
  steps: IStep[],
}
