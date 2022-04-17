import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';

export type TButtonType = 'button' | 'link';
type TEnmBranchType = TEnmBaseType & {
  BUTTON: TButtonType & 'button',
  LINK: TButtonType & 'link'
};
export const BUTTON_TYPE: TEnmBranchType = {
  ...BASE_TYPE,
  BUTTON: 'button',
  LINK:   'link',
};

/**
 * Represents a navigation button
 */
export interface IButtonCore extends IRefCore {
  /**
   * Link to tie to button click
   *
   * @title Link
   */
  link?: string;
  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type?: TButtonType;
  /**
   * Visibility status of the button (show/hide)
   *
   * @title Visible
   */
  visible?: boolean;
}
