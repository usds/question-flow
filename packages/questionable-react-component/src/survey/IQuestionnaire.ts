import { QuestionnaireCore }   from '@usds.gov/questionable-core';
import { IAction }             from './IAction';
import { IQuestionableConfig } from './IQuestionableConfig';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire extends QuestionnaireCore {
   actions?: Partial<IAction>[] | undefined;
   config?: IQuestionableConfig | undefined;
}
