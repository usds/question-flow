import { IRefCore } from './IRefCore';

export interface IBranchCore extends IRefCore {
  questions: IRefCore[];
}
