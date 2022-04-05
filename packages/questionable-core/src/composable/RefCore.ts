/* eslint-disable import/no-cycle */
import { noop }     from 'lodash';
import { IRefCore } from '../survey/IRefCore';
import { matches }  from '../util/helpers';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { getGUID }  from '../util/uuid';
import { BaseCore } from './BaseCore';

/**
 * Base class for all objects that should be stored by reference,
 * most commonly because they represent unique rows in a table or
 * distinct, complex structures whose value can be inferred by unique identfiers
 */
export class RefCore extends BaseCore implements IRefCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.ref;
  }

  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.ref], obj);
  }

  // public static isRef(data: any): data is RefCore {
  //   return 'title' in data;
  // }

  // public static is<T>(data: any): data is T {
  //   if (T === RefCore) {

  //   }
  //   return 'title' in data;
  // }

  // public isRef(data: any): data is RefCore {
  //   return RefCore.isRef(this);
  // }

  public static create(data: IRefCore) {
    if (data instanceof RefCore) {
      return data;
    }
    return new RefCore(data);
  }

  public static override createOptional(data?: IRefCore) {
    if (!super.createOptional(data) || !data) {
      return undefined;
    }
    return RefCore.create(data);
  }

  #id: string;

  #label: string;

  #type: string;

  #title: string;

  /**
   * Instantiation will generate a uuid for this object
   * @param data optional data
   */
  public constructor(data: IRefCore) {
    super(data);
    if (data.id && data.id.length > 0) {
      this.#id = data.id;
    } else {
      this.#id = getGUID(true);
    }
    this.#label = data.label || '';
    this.#title = data.title || '';
    this.#type  = data.type || '';
  }

  public get id(): string {
    return this.#id;
  }

  public get label() {
    return this.#label;
  }

  public get title(): string {
    return this.#title;
  }

  public get type(): string {
    return this.#type;
  }

  public set type(val: string) {
    this.#type = val;
  }

  public existsIn(collection: RefCore[], val: RefCore = this) {
    const exists = collection.find((q) => matches(q.title, val.title));
    return (collection.indexOf(val) !== -1 || exists) === true;
  }

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
  public add(data: RefCore) {
    this.noop(data);
  }
}
