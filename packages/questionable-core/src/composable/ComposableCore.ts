/* eslint-disable import/no-cycle */
import { merge }    from 'lodash';
import { IRefCore } from '../survey/IRefCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { BaseCore }          from './BaseCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class ComposableCore extends BaseCore implements IRefCore {
  protected static override _name = getClassName(PREFIX.COMPOSABLE);

  protected override instanceOfCheck: TInstanceOf = ComposableCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([BaseCore._name, ComposableCore._name], obj);
  }

  constructor(questionnaire: QuestionnaireCore, data: Partial<IRefCore> = {}) {
    super(questionnaire.form);
    merge(this, data);
    this.questionnaire = questionnaire;
  }

  questionnaire: QuestionnaireCore;
}
