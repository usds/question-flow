/* eslint-disable import/no-cycle */
import { IFormCore } from '../survey/IFormCore';
import {
  TInstanceOf,
  getClassName,
  PREFIX,
  checkInstanceOf,
} from '../util/instanceOf';
import { FormCore } from './FormCore';
import { RefCore }  from './RefCore';

export class BaseCore extends RefCore {
  protected static override _name = getClassName(PREFIX.BASE);

  protected override instanceOfCheck: TInstanceOf = BaseCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([BaseCore._name, RefCore._name], obj);
  }

  constructor(form: IFormCore) {
    super();
    this.form = (form instanceof FormCore) ? form : new FormCore(form);
  }

  form: FormCore;
}
