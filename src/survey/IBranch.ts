import { IRef } from './IRef';

export interface IBranch extends IRef {
  questions: IRef[];
}
