import { ACTION }      from '../util/enums';
import { IButtonCore } from './IButtonCore';
import { IRefCore }    from './IRefCore';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IActionCore extends IRefCore {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons?: IButtonCore[] | undefined;
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Description
   */
  subTitle?: string | undefined;
  /**
   * @title Type
   * @hidden
   */
  type: ACTION;
}
