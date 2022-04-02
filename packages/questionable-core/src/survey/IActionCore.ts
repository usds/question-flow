import { ClassProperties }                                  from '../util';
import { ACTION }                                           from '../util/enums';
import { getInstanceName, PREFIX }                          from '../util/instanceOf';
import { IButtonCore }                                      from './IButtonCore';
import { IRefCore, ERefCoreProperties, TRefCoreProperties } from './IRefCore';

export const ActionCoreClassName = getInstanceName(PREFIX.ACTION);
export type TEActionCoreProperties = {
  _buttons: '_buttons',
  _label: '_label',
  _subTitle: '_subTitle',
  _type: '_type',
  buttons: 'buttons',
  subTitle: 'subTitle',
} & typeof ERefCoreProperties;
export const EActionCoreProperties: TEActionCoreProperties = {
  ...ERefCoreProperties,
  _buttons:  '_buttons' as const,
  _label:    '_label' as const,
  _subTitle: '_subTitle' as const,
  _type:     '_type'as const,
  buttons:   'buttons' as const,
  subTitle:  'subTitle' as const,
};

export type ActionCoreProperties = ClassProperties<typeof EActionCoreProperties> | TRefCoreProperties;
// For (a little) brevity in interface members
const P = EActionCoreProperties;
/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IActionCore extends IRefCore {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  [P.buttons]: IButtonCore[];
  /**
   * @title Label
   */
  [P.label]: string;
  /**
   * @title Description
   */
  [P.subTitle]?: string;
  /**
   * @title Type
   * @hidden
   */
  [P.type]: ACTION;
}
