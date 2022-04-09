import {
  IButtonCore,
  THorizontalPositionCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';

/**
 * Represents a navigation button
 */
export type IButton = IButtonCore & {
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPositionCore | undefined;
  /**
   * Show an outline
   *
   * @title Outline
   */
  outline?: boolean | undefined;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPositionCore | undefined;
}
