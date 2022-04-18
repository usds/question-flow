import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TResultType = 'match' | 'non-match';
type TEnmResultType = TEnmBaseType & {
  MATCH: TResultType & 'match';
  NON_MATCH: TResultType & 'non-match';
};
export const RESULT_TYPE: TEnmResultType = {
  ...BASE_TYPE,
  MATCH:     'match',
  NON_MATCH: 'non-match',
};
