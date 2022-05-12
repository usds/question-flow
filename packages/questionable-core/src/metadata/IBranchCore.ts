import { IQuestionCore } from './IQuestionCore';
import { IRefCore }      from './IRefCore';
import { ISectionCore }  from './ISectionCore';
import { TBranchType }   from './properties/type/TBranchType';

export interface IBranchCore extends IRefCore {
  questions?: IQuestionCore[];
  sections?: ISectionCore[];
  type?: TBranchType;
}
