/* eslint-disable import/no-cycle */
import {
  ERefCoreProperties as P,
  IRefCore,
  RefCoreClassName,
} from '../survey/IRefCore';
import {
  checkInstanceOf, TInstanceOf,
} from '../util/instanceOf';
import { getGUID } from '../util/uuid';

export class RefCore implements IRefCore {
  public static readonly [P._name] = RefCoreClassName;

  public readonly [P.instanceOfCheck]: TInstanceOf = RefCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([RefCoreClassName], obj);
  }

  public constructor(data: Partial<RefCore> = {}) {
    if (data.id && data.id.length > 0) {
      this[P._id] = data.id;
    } else {
      this[P._id] = getGUID(true);
    }
    this[P._label] = data.label || '';
    this[P._title] = data.title || '';
    this[P._type]  = data.type || '';
  }

  public static create(data: Partial<RefCore> = {}) {
    if (data instanceof RefCore) {
      return data;
    }
    return new RefCore(data);
  }

  protected readonly [P._id]: string;

  public get [P.id]() {
    return this[P._id];
  }

  protected [P._label]: string;

  public get [P.label]() {
    return this[P._label];
  }

  protected [P._title]: string;

  public get [P.title]() {
    return this[P._title];
  }

  protected [P._type]: string;

  public get [P.type]() {
    return this[P._type];
  }
}
