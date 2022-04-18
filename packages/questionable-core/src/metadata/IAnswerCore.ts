import { IRefCore }    from './IRefCore';
import { TAnswerType } from './properties/type/TAnswerType';

export interface IAnswerCore extends IRefCore {
  key?: string;
  synonyms?: string[];
  type?: TAnswerType;
}
