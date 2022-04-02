import { getInstanceName, PREFIX }                          from '../util/instanceOf';
import { ClassProperties }                                  from '../util/types';
import { IRefCore, ERefCoreProperties, TRefCoreProperties } from './IRefCore';

export const BranchCoreClassName = getInstanceName(PREFIX.BRANCH);
export type TEBranchCoreProperties = {
  questions: 'questions',
} & typeof ERefCoreProperties;
export const EBranchCoreProperties: TEBranchCoreProperties = {
  ...ERefCoreProperties,
  questions: 'questions' as const,
};
export type BranchCoreProperties = ClassProperties<typeof EBranchCoreProperties> | TRefCoreProperties;
// For (a little) brevity in interface members
const P = EBranchCoreProperties;
export interface IBranchCore extends IRefCore {
  [P.questions]: IRefCore[];
}
