/* eslint-disable import/no-cycle */
import {
  IRefCore,
  EComposableCoreProperties as p,
  AnswerCoreClassName as className,
} from '../survey';
import {
  checkInstanceOf,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class AnswerCore extends ComposableCore implements IRefCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ComposableCore[p._name]], obj);
  }

  public static override create(
    data: Partial<AnswerCore>,
    questionnaire: Partial<QuestionnaireCore> = {},
  ): AnswerCore {
    if (data instanceof AnswerCore) {
      return data;
    }
    return new AnswerCore(data, questionnaire);
  }

  constructor(data: Partial<AnswerCore>, questionnaire: Partial<QuestionnaireCore> = {}) {
    super(data, questionnaire);
  }
}
