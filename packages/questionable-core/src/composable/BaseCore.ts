/* eslint-disable import/no-cycle */
import {
  TInstanceOf,
  checkInstanceOf,
  ClassList,
} from '../util/instanceOf';

export class BaseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.base;
  }

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
