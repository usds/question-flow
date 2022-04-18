/* eslint-disable import/no-cycle */
import { IActionCore }                             from '../metadata/IActionCore';
import { ACTION_TYPE, TActionType }                from '../metadata/properties/type/TActionType';
import { ButtonCore }                              from './ButtonCore';
import { checkInstanceOf, ClassList, TInstanceOf } from '../lib/instanceOf';
import { RefCore }                                 from './RefCore';

export class ActionCore extends RefCore implements IActionCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.action;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.action, ClassList.ref], obj);
  }

  public static override create(data: Partial<ActionCore>) {
    if (data instanceof ActionCore) {
      return data;
    }
    return new ActionCore(data);
  }

  public static override createOptional(data?: Partial<ActionCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return ActionCore.create(data);
  }

  #buttons: ButtonCore[];

  #icon: string;

  #label: string;

  #subTitle: string;

  #type: TActionType;

  constructor(data: Partial<ActionCore>) {
    super(data);
    this.#buttons  = data.buttons?.map((b) => ButtonCore.create(b)) || [];
    this.#label    = data.label || '';
    this.#subTitle = data.subTitle || '';
    this.#type     = data.type || ACTION_TYPE.NONE;
    this.#icon     = data.icon || '';
  }

  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  public get buttons(): ButtonCore[] {
    return this.#buttons;
  }

  public set buttons(val: ButtonCore[]) {
    this.#buttons = val;
  }

  public get icon(): string {
    return this.#icon;
  }

  /**
   * @title Description
   */
  public get subTitle(): string {
    return this.#subTitle;
  }

  public set subTitle(val: string) {
    this.#subTitle = val;
  }

  public get label(): string {
    return this.#label;
  }

  /**
   * @title Type
   * @hidden
   */
  public get type(): TActionType {
    return this.#type;
  }

  public set type(val: TActionType) {
    this.#type = val;
  }
}
