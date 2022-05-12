import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TActionType = 'call' | 'hybrid' | 'none' | 'online' | 'shell';
type TEnmActionType = TEnmBaseType & {
  CALL: TActionType & 'call';
  HYBRID: TActionType & 'hybrid';
  NONE: TActionType & 'none';
  ONLINE: TActionType & 'online';
  SHELL: TActionType & 'shell';
};
export const ACTION_TYPE: TEnmActionType = {
  ...BASE_TYPE,
  CALL:   'call',
  HYBRID: 'hybrid',
  NONE:   'none',
  ONLINE: 'online',
  SHELL:  'shell',
};
