/* eslint-disable import/no-cycle */
import { IRefCore } from '../survey/IRefCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { getGUID }  from '../util/uuid';
import { BaseCore } from './BaseCore';

export class RefCore extends BaseCore implements IRefCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.ref;
  }

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

  #id: string;

  #label: string;

  #type: string;

  #title: string;

  public constructor(data: Partial<IRefCore> = {}) {
    super();
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
}
