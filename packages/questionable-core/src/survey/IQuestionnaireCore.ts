import { IActionCore }                 from './IActionCore';
import { IBranchCore }                 from './IBranchCore';
import { IPagesCore }                  from './IPagesCore';
import { IQuestionableConfigCore }     from './IQuestionableConfigCore';
import { IResultCore }                 from './IResultCore';
import { IQuestionCore, ISectionCore } from './IStepCore';

/**
 * Definition for survey data input
 */
export interface IQuestionnaireCore {
  actions?: IActionCore[] | undefined;
  branches?: IBranchCore[] | undefined;
  config?: IQuestionableConfigCore | undefined;
  header?: string | undefined;
  pages: IPagesCore;
  questions: IQuestionCore[];
  results?: IResultCore[] | undefined;
  sections?: ISectionCore[] | undefined;
}
