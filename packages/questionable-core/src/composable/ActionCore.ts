/* eslint-disable import/no-cycle */
import { IRefCore } from '../survey/IRefCore';
import {
  IActionCore,
} from '../survey/IActionCore';
import { EActionCoreProperties as p, TActionPrivateProps } from '../metadata/MAction';
import { IButtonCore }                                     from '../survey/IButtonCore';
import { fromSet, toSet }                                  from '../util/set';
import { ACTION }                                          from '../util/enums';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { ComposableCore } from './ComposableCore';
import { Dictionary }     from './Dictionary';

export class ActionCore extends ComposableCore implements IActionCore, IRefCore {
  public override readonly [p.instanceOfCheck]: TInstanceOf = ClassList.action;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.action, ClassList.composable], obj);
  }

  public static override create(data: Partial<IActionCore> = {}) {
    if (data instanceof ActionCore) {
      return data;
    }
    return new ActionCore(data);
  }

  constructor(data: Partial<IActionCore> = {}) {
    super(data);
    this.#hash       = new Dictionary<TActionPrivateProps, string | typeof ACTION | Set<IButtonCore>>();
    this[p.buttons]  = data.buttons || [];
    this[p.label]    = data.label || '';
    this[p.subTitle] = data.subTitle || '';
    this[p.type]     = data.type || ACTION.DEFAULT;
  }

  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  public get [p.buttons](): IButtonCore[] {
    const val = this.#hash.touch<Set<IButtonCore>>(p._buttons, new Set<IButtonCore>());
    return fromSet(val);
  }

  public set [p.buttons](val: IButtonCore[]) {
    this.#hash.set<Set<IButtonCore>>(p._buttons, toSet(val), true);
  }

  public add(data: IButtonCore) {
    const set = this.#hash.get<Set<IButtonCore>>(p._buttons);
    set.add(data);
    return data;
  }

  /**
   * @title Description
   */
  public get [p.subTitle](): string {
    return this.#hash.touch<string>(p._subTitle, '');
  }

  public set [p.subTitle](val: string) {
    this.#hash.set<string>(p._subTitle, val, true);
  }

  /**
   * @title Type
   * @hidden
   */
  public override get [p.type](): ACTION {
    return this.#hash.touch(p._type, ACTION.DEFAULT);
  }

  public override set [p.type](val: ACTION) {
    this.#hash.set(p._type, val, true);
  }

  #hash: Dictionary<TActionPrivateProps, string | typeof ACTION | Set<IButtonCore>>;
}
