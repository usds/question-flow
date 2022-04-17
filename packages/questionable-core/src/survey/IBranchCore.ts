import { TBranchType }   from '../util';
import { IQuestionCore } from './IQuestionCore';
import { IRefCore }      from './IRefCore';
import { ISectionCore }  from './ISectionCore';

export interface IBranchCore extends IRefCore {
  questions?: IQuestionCore[];
  sections?: ISectionCore[];
  type?: TBranchType;
}
