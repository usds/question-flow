/* eslint-disable import/no-cycle */
import {
  IRefCore,
} from '../survey/IRefCore';
import { EAnswerCoreProperties as p } from '../metadata/MAnswer';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { ComposableCore } from './ComposableCore';

export class AnswerCore extends ComposableCore implements IRefCore {
  public override readonly [p.instanceOfCheck]: TInstanceOf = ClassList.answer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.answer, ClassList.composable], obj);
  }

  public static override create(data: Partial<IRefCore>): AnswerCore {
    if (data instanceof AnswerCore) {
      return data;
    }
    return new AnswerCore(data);
  }

  constructor(data: Partial<IRefCore> = {}) {
    super(data);
  }
}
