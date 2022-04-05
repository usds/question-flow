import { IActionCore }                 from './IActionCore';
import { IBranchCore }                 from './IBranchCore';
import { IPagesCore }                  from './IPagesCore';
import { IQuestionCore, ISectionCore } from './IStepCore';
import { IQuestionableConfigCore }     from './IQuestionableConfigCore';
import { IResultCore }                 from './IResultCore';

/**
 * Definition for survey data input
 */
export interface IQuestionnaireCore {
   actions: IActionCore[];
   branches: IBranchCore[];
   config: IQuestionableConfigCore;
   flow: string[];
   header: string;
   pages: IPagesCore;
   questions: IQuestionCore[];
   results: IResultCore[];
   sections: ISectionCore[];
}
