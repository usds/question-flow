import {
  IButtonCore,
  THorizontalPositionCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';

/**
 * Represents a navigation button
 */
export class Button implements IButtonCore {
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  #horizontalPos?: THorizontalPositionCore | undefined;

  get horizontalPos() {
    return this.#horizontalPos;
  }

  set horizontalPos(val: THorizontalPositionCore) {
    this.#horizontalPos = val;
  }

  /**
   * Show an outline
   *
   * @title Outline
   */
  #outline?: boolean | undefined;

  get outline() {
    return this.#outline === true;
  }

  set outline(val: boolean) {
    this.outline = val;
  }

  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  #verticalPos?: TVerticalPositionCore | undefined;

  get verticalPos() {
    return this.#verticalPos;
  }

  set verticalPos(val: THorizontalPositionCore) {
    this.#verticalPos = val;
  }
}
