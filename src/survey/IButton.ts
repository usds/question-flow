import { THorizontalPosition, TButtonMode, TVerticalPosition } from '../lib/types';

/**
 * Represents a navigation button
 */
export interface IButton {
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPosition;
  /**
   * Text to display on button (e.g. 'Prev' or 'Next')
   *
   * @title Label
   */
  label: string;
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
  mode?: TButtonMode;
  /**
   * Show an outline
   *
   * @title Outline
   */
  outline?: boolean;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPosition;
}
