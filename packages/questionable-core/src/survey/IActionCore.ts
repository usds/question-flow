import { IButtonCore }                       from './IButtonCore';
import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';

export type TActionType = 'call' | 'hybrid' | 'none' | 'online' | 'shell';
type TEnmActionType = TEnmBaseType & {
  CALL: TActionType & 'call',
  HYBRID: TActionType & 'hybrid',
  NONE: TActionType & 'none',
  ONLINE: TActionType & 'online',
  SHELL: TActionType & 'shell',
}
export const ACTION_TYPE: TEnmActionType = {
  ...BASE_TYPE,
  CALL:   'call',
  HYBRID: 'hybrid',
  NONE:   'none',
  ONLINE: 'online',
  SHELL:  'shell',
};

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
