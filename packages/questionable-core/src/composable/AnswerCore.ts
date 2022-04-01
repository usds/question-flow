/* eslint-disable import/no-cycle */
import { merge }    from 'lodash';
import { IRefCore } from '../survey';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';

const defaults = {
};

export class AnswerCore extends ComposableCore implements IRefCore {
  protected static override _name = getClassName(PREFIX.ANSWER);

  protected override instanceOfCheck: TInstanceOf = AnswerCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([AnswerCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IRefCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, defaults);
    merge(this, data);
  }
}
