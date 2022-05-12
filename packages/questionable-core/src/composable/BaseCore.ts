/* eslint-disable import/no-cycle */
import { cloneDeep, merge, noop }                  from 'lodash';
import { TInstanceOf, checkInstanceOf, ClassList } from '../lib/instanceOf';

export interface TBaseSource {
  [key: string]: unknown;
}
/**
 * Generic class from which all others are derived
 */
export abstract class BaseCore implements TBaseSource {
  [key: string]: unknown;

  /**
   * Stash a copy of the original object for future inspection,
   * primarily to aid debugging when classes are instantiated with
   * undeclared properties
   */
  #source: TBaseSource = {};

  /**
   * NOTE: we don't want this accidentally serializing; hence,
   * `getSource()` and not `get source()`
   * @returns Deep clone of the object used to instantiate this instance
   */
  getSource(): TBaseSource {
    return cloneDeep(this.#source);
  }

  /**
   * Instance comparator
   */
  public abstract get instanceOfCheck(): TInstanceOf;

  /**
   * Implement our own compator for eval using `instanceof`
   * @param obj any object to compare at runtime
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf({ names: [ClassList.base, ClassList.ref], obj });
  }

  /**
   * Unambiguously cast or construct an object to target type
   * @param data any object (or lack thereof) to be evaled as a ref
   * @returns
   */
  public static create(data: unknown): BaseCore {
    if (data instanceof BaseCore) {
      return data;
    }
    return data as BaseCore;
  }

  /**
   * For use when the property is not required
   */
  public static createOptional(data?: unknown): BaseCore | undefined {
    if (!data) {
      return undefined;
    }
    return BaseCore.create(data);
  }

  /**
   * At some point, we might care to know what undeclared properties OR
   * original values for declared properties have been passed in; therefore,
   * these will be stashed by value internally
   * @param data original object
   */
  constructor(data: unknown) {
    merge(this.#source, cloneDeep(data));
  }

  // public abstract existsIn(val: TBaseSource): boolean;

  /** KLUDGE:
   * allow interface/abstract/base classes to implement a property so that
   * the code will compile (fixes "class member does not use `this`" and
   * "unused parameter" errors), for use when the primary purpose
   * of the property is to setup inheritance
   */
  protected noop = noop;

  /**
   * This does nothing but establish the pattern for all other classes to build from;
   * @param data any questionable object
   */
  // public abstract add(data: TBaseSource): TBaseSource;
}
