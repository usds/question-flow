import { TAnswerType } from '../util';
import { IRefCore }    from './IRefCore';

export interface IAnswerCore extends IRefCore {
  key?: string;
  synonyms?: string[];
  type?: TAnswerType;
}
