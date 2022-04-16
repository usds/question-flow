/* eslint-disable import/no-cycle */
import { IButtonCore }                             from '../survey/IButtonCore';
import { BUTTON_TYPE, TButtonType }                from '../util/enums';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { RefCore }                                 from './RefCore';

export class ButtonCore extends RefCore implements IButtonCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.button;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.button, ClassList.ref], obj);
  }

  public static override create(data: Partial<ButtonCore>) {
    if (data instanceof ButtonCore) {
      return data;
    }
    return new ButtonCore(data);
  }

  public static override createOptional(data?: Partial<ButtonCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return ButtonCore.create(data);
  }

  /**
   * Link to tie to button click
   *
   * @title Link
   */
  #link?: string | undefined;

  #type: TButtonType;

  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  get type(): TButtonType {
    return this.#type;
  }

  /**
   * Visibility status of the button (show/hide)
   *
   * @title Visible
   */
  #visible?: boolean | undefined;

  constructor(data: Partial<ButtonCore>) {
    super(data);
    this.#link    = data.link || '';
    this.#visible = data.visible !== false;
    this.#type    = data.type || BUTTON_TYPE.BUTTON;
  }

  public get link(): string {
    return this.#link || '';
  }

  public set link(val: string) {
    this.#link = val;
  }

  public get visible(): boolean {
    return this.#visible !== false;
  }

  public set visible(val: boolean) {
    this.#visible = val;
  }

  public pointer?: 'back' | 'next' | undefined;
}
