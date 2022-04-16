import { BaseCore }    from '../BaseCore';
import {
  THorizontalPositionCore,
  TVerticalPositionCore,
  HORIZONTAL_POSITION,
  VERTICAL_POSITION,
} from '../../util/types';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../util/instanceOf';
import { BUTTON_TYPE, TButtonType }                from '../../util/enums';

/**
 * Configuration for buttons
 */
export class ButtonConfigCore extends BaseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<ButtonConfigCore> = {}) {
    if (data instanceof ButtonConfigCore) {
      return data;
    }
    return new ButtonConfigCore(data);
  }

  constructor(data: Partial<ButtonConfigCore> = {}) {
    super(data);
    this.title         = data.title || '';
    this.type          = data.type || BUTTON_TYPE.BUTTON;
    this.horizontalPos = data.horizontalPos || HORIZONTAL_POSITION.LEFT;
    this.verticalPos   = data.verticalPos || VERTICAL_POSITION.BOTTOM;
    this.visible       = data.visible !== false;
    this.defaultLabel  = data.defaultLabel || this.title;
  }

  /**
   * Default text to display if none is defined
   */
  defaultLabel?: string | undefined;

  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPositionCore;

  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type?: TButtonType;

  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPositionCore;

  /**
   * Toggle whether button is visible
   *
   * @title Visible
   */
  visible?: boolean | undefined;

  /**
   * Default link to tie to button click
   *
   * @title Link
   */
  link?: string | undefined;

  /**
   * Default button name
   *
   * @title Title
   */
  title?: string;
}
