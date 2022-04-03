import { EBranchCoreProperties as p } from '../metadata/MBranch';
import { IRefCore }                   from './IRefCore';

export interface IBranchCore extends IRefCore {
  [p.questions]: IRefCore[];
}
