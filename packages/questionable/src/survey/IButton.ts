import {
  TButtonMode,
  THorizontalPosition,
  TVerticalPosition,
} from '../lib/types';
import { IRef } from './IRef';

/**
 * Represents a navigation button
 */
export interface IButton extends IRef {
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPosition;
  /**
   * Link to tie to button click
   *
   * @title Link
   */
  link?: string;
  /**
   * Show an outline
   *
   * @title Outline
   */
  outline?: boolean;
  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type?: TButtonMode;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPosition;
  /**
   * Visibility status of the button (show/hide)
   *
   * @title Visible
   */
  visible?: boolean;
}
