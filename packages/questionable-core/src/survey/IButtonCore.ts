import {
  TButtonModeCore,
} from '../util/types';
import { IRefCore } from './IRefCore';

/**
 * Represents a navigation button
 */
export interface IButtonCore extends IRefCore {
  /**
   * Link to tie to button click
   *
   * @title Link
   */
  link: string | undefined;
  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type: TButtonModeCore | undefined;
  /**
   * Visibility status of the button (show/hide)
   *
   * @title Visible
   */
  visible: boolean | undefined;
}
