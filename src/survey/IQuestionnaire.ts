import { IAction }             from './IAction';
import { IResult }             from './IResult';
import { IQuestion, ISection } from './IStep';
import { IPages }              from './IPages';
import { IBranch }             from './IBranch';

/**
 * Definition for survey data input
 */
export interface IQuestionnaire {
  readonly actions: IAction[];
  readonly branches: IBranch[];
  readonly header: string;
  readonly pages: IPages;
  readonly questions: IQuestion[];
  readonly results: IResult[];
  readonly sections: ISection[];
}
