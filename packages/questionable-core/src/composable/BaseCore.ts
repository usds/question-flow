/* eslint-disable import/no-cycle */
import { cloneDeep, merge } from 'lodash';
import {
  TInstanceOf,
  checkInstanceOf,
  ClassList,
} from '../util/instanceOf';

/**
 * Generic class from which all others are derived
 */
export class BaseCore {
  /**
   * Stash a copy of the original object for future inspection,
   * primarily to aid debugging when classes are instantiated with
   * undeclared properties
   */
  #source: { [key: string]: unknown } = {};

  /**
   * NOTE: we don't want this accidentally serializing; hence,
   * `getSource()` and not `get source()`
   * @returns Deep clone of the object used to instantiate this instance
   */
  getSource() {
    return cloneDeep(this.#source);
  }

  /**
   * Instance comparator
   */
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.base;
  }

  /**
   * Implement our own compator for eval using `instanceof`
   * @param obj any object to compare at runtime
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.base, ClassList.ref], obj);
  }

  /**
   * Unambiguously cast or construct an object to target type
   * @param data any object (or lack thereof) to be evaled as a ref
   * @returns
   */
  public static create(data: unknown = {}) {
    if (data instanceof BaseCore) {
      return data;
    }
    return new BaseCore();
  }

  /**
   * At some point, we might care to know what undeclared properties OR
   * original values for declared properties have been passed in; therefore,
   * these will be stashed by value internally
   * @param data original object
   */
  constructor(data: unknown = {}) {
    merge(this.#source, cloneDeep(data));
  }
}
