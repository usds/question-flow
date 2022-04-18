import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TSectionType = 'locked' | 'unlocked';
type TEnmSectionType = TEnmBaseType & {
  LOCKED: TSectionType & 'locked';
  UNLOCKED: TSectionType & 'unlocked';
};
export const SECTION_TYPE: TEnmSectionType = {
  ...BASE_TYPE,
  LOCKED:   'locked',
  UNLOCKED: 'unlocked',
};
