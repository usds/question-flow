/* eslint-disable import/no-cycle */
import { IRefCore } from '../survey/IRefCore';
import {
  IActionCore,
} from '../survey/IActionCore';
import { IButtonCore } from '../survey/IButtonCore';
import { ACTION }      from '../util/enums';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { RefCore } from './RefCore';

export class ActionCore extends RefCore implements IActionCore, IRefCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.action;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.action, ClassList.ref], obj);
  }

  public static override create(data: IActionCore) {
    if (data instanceof ActionCore) {
      return data;
    }
    return new ActionCore(data);
  }

  public static override createOptional(data?: IActionCore) {
    if (!data) {
      return undefined;
    }
    return ActionCore.create(data);
  }

  #buttons;

  #label;

  #subTitle;

  #type;

  constructor(data: IActionCore) {
    super(data);
    this.#buttons  = data.buttons || [];
    this.#label    = data.label || '';
    this.#subTitle = data.subTitle || '';
    this.#type     = data.type || ACTION.DEFAULT;
  }

  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  public get buttons(): IButtonCore[] {
    return this.#buttons;
  }

  public set buttons(val: IButtonCore[]) {
    this.#buttons = val;
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
  public override get type(): ACTION {
    return this.#type;
  }

  public override set type(val: ACTION) {
    this.#type = val;
  }
}
