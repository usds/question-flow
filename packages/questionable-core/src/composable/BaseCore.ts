/* eslint-disable import/no-cycle */
import {
  TInstanceOf,
  checkInstanceOf,
  ClassList,
} from '../util/instanceOf';
import {
  RefCore,
}  from './RefCore';
import { EBaseCoreProperties as p } from '../metadata/MBase';
import { IRefCore }                 from '../survey/IRefCore';

export class BaseCore extends RefCore {
  public override readonly [p.instanceOfCheck]: TInstanceOf = ClassList.base;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.base, ClassList.ref], obj);
  }

  public static override create(data: Partial<IRefCore> = {}): BaseCore {
    return new BaseCore(data);
  }

  public constructor(data: Partial<IRefCore> = {}) {
    super(data);
  }
}
