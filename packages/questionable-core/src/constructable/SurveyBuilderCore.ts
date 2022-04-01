import { ActionCore }        from '../composable/ActionCore';
import { Constructor }       from '../util/constructors';
import { QuestionnaireCore } from '../composable/QuestionnaireCore';

export class SurveyBuilder<
  T extends QuestionnaireCore,
  U extends ActionCore,
> {
  #actions: U[] = [];

  constructor(questionnaire: T) {
    this.#questionnaire = questionnaire;
  }

  #questionnaire: T;

  // get #form() {
  //   return this.#questionnaire.form;
  // }

  addAction(data: U): U {
    let action: U;
    if (data instanceof ActionCore) {
      action = data as U;
    } else {
      const ctor = new Constructor();
      action     = ctor.construcT<U>(data, this.#questionnaire);
    }
    this.#actions.push(action);
    return action;
  }
}
