import { IButtonCore } from './IButtonCore';
import { IRefCore }    from './IRefCore';
import { TActionType } from './properties/type/TActionType';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IActionCore extends IRefCore {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons?: IButtonCore[];
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Description
   */
  subTitle?: string;
  /**
   * @title Type
   * @hidden
   */
  type: TActionType;
}
