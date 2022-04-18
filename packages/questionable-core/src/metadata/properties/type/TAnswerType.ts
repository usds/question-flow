import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TAnswerType = 'fixed' | 'variable';
type TEnmAnswerType = TEnmBaseType & {
  FIXED: TAnswerType & 'fixed';
  VARIABLE: TAnswerType & 'variable';
};
export const ANSWER_TYPE: TEnmAnswerType = {
  ...BASE_TYPE,
  FIXED:    'fixed',
  VARIABLE: 'variable',
};
