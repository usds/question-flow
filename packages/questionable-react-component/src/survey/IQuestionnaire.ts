import { IQuestionnaireCore }  from '@usds.gov/questionable-core';
import { IAction }             from './IAction';
import { IBranch }             from './IBranch';
import { IPages }              from './IPages';
import { IQuestion, ISection } from './IStep';
import { IQuestionableConfig } from './IQuestionableConfig';
import { IResult }             from './IResult';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire extends IQuestionnaireCore {
   actions: IAction[];
   branches: IBranch[];
   config: IQuestionableConfig;
   pages: IPages;
   questions: IQuestion[];
   results: IResult[];
   sections: ISection[];
}
