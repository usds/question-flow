import { IQuestionCore }                     from './IQuestionCore';
import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';
import { ISectionCore }                      from './ISectionCore';

export type TBranchType = 'linear' | 'non-linear';
type TEnmBranchType = TEnmBaseType & {
  LINEAR: TBranchType & 'linear',
  NON_LINEAR: TBranchType & 'non-linear',
}
export const BRANCH_TYPE: TEnmBranchType = {
  ...BASE_TYPE,
  LINEAR:     'linear',
  NON_LINEAR: 'non-linear',
};

export interface IBranchCore extends IRefCore {
  questions?: IQuestionCore[];
  sections?: ISectionCore[];
  type?: TBranchType;
}
