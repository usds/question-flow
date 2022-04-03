import {
  ActionCore,
  BranchCore,
  PageCore,
  QuestionableConfigCore,
  QuestionCore,
  RefCore,
  ResultCore,
  SectionCore,
} from '../composable';
import { QuestionnaireCore }  from '../composable/QuestionnaireCore';
import { IQuestionnaireCore } from '../survey/IQuestionnaireCore';

export class SurveyBuilder {
  #questionnaire: QuestionnaireCore;

  #parts: RefCore[];

  constructor(data: Partial<IQuestionnaireCore> = {}) {
    this.#questionnaire = QuestionnaireCore.create(data);
    this.#parts         = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add<T extends RefCore>(TCtor: new (...args: any[]) => T, data: Partial<T>) {
    const nu = new TCtor(data);
    if (nu instanceof ActionCore) {
      this.#questionnaire.actions.push(nu);
    } else if (nu instanceof SectionCore) {
      this.#questionnaire.sections.push(nu);
    } else if (nu instanceof QuestionCore) {
      this.#questionnaire.questions.push(nu);
    } else if (nu instanceof PageCore) {
      this.#questionnaire.pages.set(nu);
    } else if (nu instanceof BranchCore) {
      this.#questionnaire.branches.push(nu);
    } else if (nu instanceof ResultCore) {
      this.#questionnaire.results.push(nu);
    } else if (nu instanceof QuestionableConfigCore) {
      this.#questionnaire.set(nu);
    }
    this.#parts.push(nu);
    return nu;
  }

  init() {
    this.#questionnaire.init();
  }
}
