/* eslint-disable import/no-cycle */
import {
  ERefCoreProperties as p, TRefCorePrivateProps,
} from '../metadata/MRef';
import { IRefCore } from '../survey/IRefCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { getGUID }    from '../util/uuid';
import { Dictionary } from './Dictionary';

export class RefCore implements IRefCore {
  public readonly [p.instanceOfCheck]: TInstanceOf = ClassList.ref;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.ref], obj);
  }

  public static create(data: Partial<IRefCore> = {}) {
    if (data instanceof RefCore) {
      return data;
    }
    return new RefCore(data);
  }

  public constructor(data: Partial<IRefCore> = {}) {
    this.#hash = new Dictionary<TRefCorePrivateProps, string>();
    if (data.id && data.id.length > 0) {
      this[p.id] = data.id;
    } else {
      this[p.id] = getGUID(true);
    }
    this[p.label] = data.label || '';
    this[p.title] = data.title || '';
    this[p.type]  = data.type || '';
  }

  public get [p.id](): string {
    return this.#hash.touch(p._id, getGUID());
  }

  public set [p.id](val: string) {
    this.#hash.set(p._id, val, true);
  }

  public get [p.label]() {
    return this.#hash.touch(p._label, '');
  }

  public set [p.label](val: string) {
    this.#hash.set(p._label, val);
  }

  public get [p.title](): string {
    return this.#hash.touch(p._title, '');
  }

  public set [p.title](val: string) {
    this.#hash.set(p._title, val);
  }

  public get [p.type](): string {
    return this.#hash.touch(p._type, '');
  }

  public set [p.type](val: string) {
    this.#hash.set(p._type, val);
  }

  #hash: Dictionary<TRefCorePrivateProps, string>;
}
