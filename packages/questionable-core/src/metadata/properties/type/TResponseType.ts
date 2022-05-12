import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TResponseType = 'complete' | 'incomplete';
type TEnmResponseType = TEnmBaseType & {
  COMPLETE: TResponseType & 'complete';
  INCOMPLETE: TResponseType & 'incomplete';
};
export const RESPONSE_TYPE: TEnmResponseType = {
  ...BASE_TYPE,
  COMPLETE:   'complete',
  INCOMPLETE: 'incomplete',
};
