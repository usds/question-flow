/* eslint-disable import/no-cycle */
import {
  TInstanceOf,
  checkInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { EBaseCoreProperties as p } from '../metadata/MBase';

export class BaseCore {
  public readonly [p.instanceOfCheck]: TInstanceOf = ClassList.base;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.base, ClassList.ref], obj);
  }

  public static create(data: unknown = {}) {
    if (data instanceof BaseCore) {
      return data;
    }
    return new BaseCore();
  }
}
