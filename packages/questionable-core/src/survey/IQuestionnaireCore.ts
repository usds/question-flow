import { IActionCore }             from './IActionCore';
import { IBranchCore }             from './IBranchCore';
import { IPagesCore }              from './IPagesCore';
import { IQuestionableConfigCore } from './IConfigCore';
import { IResultCore }             from './IResultCore';
import { IQuestionCore }           from './IQuestionCore';
import { ISectionCore }            from './ISectionCore';

/**
 * Definition for survey data input
 */
export interface IQuestionnaireCore {
  actions?: IActionCore[];
  branches?: IBranchCore[];
  config?: IQuestionableConfigCore;
  header?: string;
  pages: IPagesCore;
  questions: IQuestionCore[];
  results?: IResultCore[];
  sections?: ISectionCore[];
}
