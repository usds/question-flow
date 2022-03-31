/* eslint-disable import/no-cycle */
import { IFormCore } from '../survey/IFormCore';
import { FormCore }  from './FormCore';

export class BaseCore {
  constructor(form: IFormCore) {
    this.form = (form instanceof FormCore) ? form : new FormCore(form);
  }

  form: FormCore;
}
