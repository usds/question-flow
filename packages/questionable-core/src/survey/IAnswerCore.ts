import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';

export type TAnswerType = 'fixed' | 'variable';
type TEnmAnswerType = TEnmBaseType & {
  FIXED: TAnswerType & 'fixed',
  VARIABLE: TAnswerType & 'variable',
}
export const ANSWER_TYPE: TEnmAnswerType = {
  ...BASE_TYPE,
  FIXED:    'fixed',
  VARIABLE: 'variable',
};

export interface IAnswerCore extends IRefCore {
  key?: string;
  synonyms?: string[];
  type?: TAnswerType;
}
