/* eslint-disable import/no-cycle */
import {
  IRefCore,
} from '../survey/IRefCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { BaseCore }                       from './BaseCore';
import { EComposableCoreProperties as p } from '../metadata/MComposable';

export class ComposableCore extends BaseCore implements IRefCore {
  public override readonly [p.instanceOfCheck]: TInstanceOf = ClassList.composable;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.composable, ClassList.base], obj);
  }

  public static override create(data: Partial<IRefCore> = {}) {
    if (data instanceof ComposableCore) {
      return data;
    }
    return new ComposableCore(data);
  }

  public constructor(data: Partial<IRefCore> = {}) {
    super(data);
  }
}
