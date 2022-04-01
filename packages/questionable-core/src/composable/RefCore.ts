/* eslint-disable import/no-cycle */
import { merge, isEmpty }                               from 'lodash';
import { IRefCore }                                     from '../survey/IRefCore';
import {
  checkInstanceOf, getClassName, PREFIX, TInstanceOf,
} from '../util/instanceOf';
import { getGUID } from '../util/uuid';

const defaults = {
  label: '',
  title: '',
  type:  'ref',
};

export abstract class RefCore implements IRefCore {
  protected static _name = getClassName(PREFIX.REF);

  protected instanceOfCheck: TInstanceOf = RefCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([RefCore._name], obj);
  }

  constructor(data: Partial<IRefCore> = {}) {
    merge(this, defaults);
    merge(this, data);
    this.#init();
  }

  #init() {
    this.#idCheck();
  }

  #idCheck() {
    if (isEmpty(this.#id) || this.#id.length === 0) {
      this.#id = getGUID(true);
    }
  }

  #id!: string;

  get id() {
    this.#idCheck();
    return this.#id;
  }

  label?: string | undefined;

  title?: string | undefined;

  type?: string | undefined;
}
