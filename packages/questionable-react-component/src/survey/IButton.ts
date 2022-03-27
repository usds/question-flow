import {
  IButtonCore,
  TButtonModeCore,
  THorizontalPositionCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';

/**
 * Represents a navigation button
 */
export interface IButton extends IButtonCore {
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPositionCore;
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
  type?: TButtonModeCore;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPositionCore;
  /**
   * Visibility status of the button (show/hide)
   *
   * @title Visible
   */
  visible?: boolean;
}
