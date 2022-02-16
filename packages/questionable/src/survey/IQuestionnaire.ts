import { IAction }             from './IAction';
import { IBranch }             from './IBranch';
import { IPages }              from './IPages';
import { IQuestion, ISection } from './IStep';
import { IQuestionableConfig } from './IQuestionableConfig';
import { IResult }             from './IResult';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire {
  readonly actions: IAction[];
  readonly branches: IBranch[];
  readonly config: IQuestionableConfig;
  readonly header: string;
  readonly pages: IPages;
  readonly questions: IQuestion[];
  readonly results: IResult[];
  readonly sections: ISection[];
}
