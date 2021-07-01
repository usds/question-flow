import { ACTION }  from '../lib/enums';
import { IButton } from './IButton';
import { IRef }    from './IRef';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IAction extends IRef {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons: IButton[];
  /**
   * Optional icon for the action
   *
   * @title Icon
   */
  icon?: string;
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
