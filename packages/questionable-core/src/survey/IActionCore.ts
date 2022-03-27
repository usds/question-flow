import { ACTION }      from '../lib/enums';
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
  buttons: IButtonCore[];
  /**
   * @title Label
   */
  label: string;
  /**
   * @title Description
   */
  subTitle?: string;
  /**
   * @title Type
   * @hidden
   */
  type: ACTION;
}
