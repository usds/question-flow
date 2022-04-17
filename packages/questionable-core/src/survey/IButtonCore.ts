import { TButtonType } from '../util/enums';
import { IRefCore }    from './IRefCore';

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
