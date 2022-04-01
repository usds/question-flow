/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { IBranchCore } from '../survey/IBranchCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionCore }      from './QuestionCore';
import { QuestionnaireCore } from './QuestionnaireCore';

const defaults = {
  questions: [],
};

export class BranchCore extends ComposableCore implements IBranchCore {
  protected static override _name = getClassName(PREFIX.BRANCH);

  protected override instanceOfCheck: TInstanceOf = BranchCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([BranchCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IBranchCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, defaults);
    merge(this, data);

    if (data.questions) {
      this.questions = data.questions.map((q) => questionnaire.getQuestionById(q.id));
    }
    this.questions.forEach((q) => {
      // eslint-disable-next-line no-param-reassign
      q.branch = this;
    });
  }

  public questions!: QuestionCore[];
}
