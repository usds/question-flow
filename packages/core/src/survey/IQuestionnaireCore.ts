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
  readonly actions: IActionCore[];
  readonly branches: IBranchCore[];
  readonly config: IQuestionableConfigCore;
  readonly header: string;
  readonly pages: IPagesCore;
  readonly questions: IQuestionCore[];
  readonly results: IResultCore[];
  readonly sections: ISectionCore[];
}
