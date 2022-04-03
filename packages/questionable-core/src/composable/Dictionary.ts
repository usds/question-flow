import { isEmpty }  from 'lodash';
import { BaseCore } from './BaseCore';

export class Dictionary<K, V> extends BaseCore {
  #hash: Map<K, V>;

  #init: unknown;

  constructor() {
    super();
    this.#hash = new Map<K, V>();
  }

  public init<I>(data: I): I {
    if (!this.#init) {
      this.#init = data;
    }
    return this.#init as I;
  }

  public touch<T extends V>(name: K, val: V): T {
    if (!this.isSet<T>(name)) {
      this.#hash.set(name, val);
    }
    return this.#hash.get(name) as T;
  }

  public set<T extends V>(name: K, val: V, readonly = false) {
    if (readonly && this.isSet<T>(name)) return;
    this.#hash.set(name, val);
  }

  public isSet<T extends V>(name: K): boolean {
    if (!this.#hash.has(name)) {
      return false;
    }
    const val: T = this.#hash.get(name) as T;
    return isEmpty(val);
  }

  public get<T extends V>(name: K): T {
    return this.#hash.get(name) as T;
  }
}
