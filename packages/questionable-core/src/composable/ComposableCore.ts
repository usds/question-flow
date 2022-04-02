/* eslint-disable import/no-cycle */
import {
  IRefCore,
  ComposableCoreClassName as className,
  EComposableCoreProperties as p,
} from '../survey/IRefCore';
import {
  checkInstanceOf,
  TInstanceOf,
} from '../util/instanceOf';
import { BaseCore }          from './BaseCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class ComposableCore extends BaseCore implements IRefCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ComposableCore[p._name]], obj);
  }

  public static override create(data: Partial<ComposableCore> = {}, questionnaire: Partial<QuestionnaireCore> = {}) {
    if (data instanceof ComposableCore) {
      return data;
    }
    return new ComposableCore(data, questionnaire);
  }

  public constructor(data: Partial<ComposableCore> = {}, questionnaire: Partial<QuestionnaireCore> = {}) {
    const q = (questionnaire instanceof QuestionnaireCore) ? questionnaire : new QuestionnaireCore(questionnaire);
    super(data, questionnaire.form);
    this[p._questionnaire] = q;
  }

  private [p._questionnaire]: QuestionnaireCore;

  protected get [p.questionnaire](): QuestionnaireCore {
    return this[p._questionnaire];
  }
}
