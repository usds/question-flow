import { ACTION }                     from '../util/enums';
import { IButtonCore }                from './IButtonCore';
import { IRefCore }                   from './IRefCore';
import { EActionCoreProperties as p } from '../metadata/MAction';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IActionCore extends IRefCore {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  [p.buttons]: IButtonCore[];
  /**
   * @title Label
   */
  [p.label]: string;
  /**
   * @title Description
   */
  [p.subTitle]?: string;
  /**
   * @title Type
   * @hidden
   */
  [p.type]: ACTION;
}
