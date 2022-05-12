import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TBranchType = 'linear' | 'non-linear';
type TEnmBranchType = TEnmBaseType & {
  LINEAR: TBranchType & 'linear';
  NON_LINEAR: TBranchType & 'non-linear';
};
export const BRANCH_TYPE: TEnmBranchType = {
  ...BASE_TYPE,
  LINEAR:     'linear',
  NON_LINEAR: 'non-linear',
};
