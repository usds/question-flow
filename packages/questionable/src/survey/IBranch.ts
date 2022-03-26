import { IBranchCore } from '@usds.gov/questionable-core';
import { IRef }        from './IRef';

export interface IBranch extends IBranchCore {
  questions: IRef[];
}
