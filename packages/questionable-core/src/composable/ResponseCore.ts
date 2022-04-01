/* eslint-disable import/no-cycle */
import { merge }         from 'lodash';
import { IResponseCore } from '../survey/IStepCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { AnswerCore }        from './AnswerCore';
import { ComposableCore }    from './ComposableCore';
import { QuestionCore }      from './QuestionCore';
import { QuestionnaireCore } from './QuestionnaireCore';

const responseDefaults = {
  answers:  [],
  question: {},
};

export class ResponseCore extends ComposableCore implements IResponseCore {
  protected static override _name = getClassName(PREFIX.RESPONSE);

  protected override instanceOfCheck: TInstanceOf = ResponseCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ResponseCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IResponseCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, responseDefaults);
    merge(this, data);

    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a, questionnaire));
    }
    if (data.question) {
      this.question = new QuestionCore(data.question, questionnaire);
    }
  }

  answers!: AnswerCore[];

  question!: QuestionCore;
}
