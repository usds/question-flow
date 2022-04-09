import { merge }                                                           from 'lodash';
import { IButtonCore }                                                     from '../../survey/IButtonCore';
import { IButtonConfigCore }                                               from '../../survey/IQuestionableConfigCore';
import { BaseCore }                                                        from '../BaseCore';
import { THorizontalPositionCore, TVerticalPositionCore, TButtonModeCore } from '../../util/types';
import { ClassList, TInstanceOf, checkInstanceOf }                         from '../../util/instanceOf';

/**
 * Configuration for buttons
 */
export class ButtonConfigCore extends BaseCore implements IButtonConfigCore, IButtonCore {
  get __core() {
    return 'button';
  }

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
    merge(this, data);
    this.title = data.title || '';
    this.type  = data.type || '';
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
  horizontalPos?: THorizontalPositionCore | undefined;

  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type?: TButtonModeCore | undefined;

  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPositionCore | undefined;

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
