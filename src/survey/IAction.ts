import { ACTION }  from '../lib/enums';
import { IButton } from './IButton';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IAction {
  /**
   * @title Action
   */
  action: string;
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons: IButton[];
  /**
   * Unique identifier
   *
   * @title Id
   */
  id: string;
  /**
   * @title Description
   */
  subTitle: string;
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Type
   * @hidden
   */
  type: ACTION;
}
