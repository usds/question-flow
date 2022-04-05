import { IRefCore } from './IRefCore';

export interface IAnswerCore extends IRefCore {
  key: string | undefined;
  synonyms: string[] | undefined;
}
