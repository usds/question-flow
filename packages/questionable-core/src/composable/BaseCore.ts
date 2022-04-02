/* eslint-disable import/no-cycle */
import {
  TInstanceOf,
  checkInstanceOf,
} from '../util/instanceOf';
import { FormCore } from './FormCore';
import {
  RefCore,
}  from './RefCore';
import {
  EBaseCoreProperties as p,
  BaseCoreClassName as className,
} from '../survey/IRefCore';

export class BaseCore extends RefCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, RefCore[p._name]], obj);
  }

  public static override create(data: Partial<BaseCore> = {}, form: Partial<FormCore> = {}) {
    if (data instanceof BaseCore) {
      return data;
    }
    return new BaseCore(data, form);
  }

  public constructor(data: Partial<BaseCore> = {}, form: Partial<FormCore> = {}) {
    super(data);
    this[p._form] = (form instanceof FormCore) ? form : new FormCore(form);
  }

  protected [p._form]: FormCore;

  public get [p.form](): FormCore {
    return this[p._form];
  }
}
