import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TButtonType = 'button' | 'link';
type TEnmBranchType = TEnmBaseType & {
  BUTTON: TButtonType & 'button';
  LINK: TButtonType & 'link';
};
export const BUTTON_TYPE: TEnmBranchType = {
  ...BASE_TYPE,
  BUTTON: 'button',
  LINK:   'link',
};
