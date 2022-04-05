/* eslint-disable */
import { EventEmitter } from 'stream';
import {
  ActionCore,
  AnswerCore,
  BaseCore,
  BranchCore,
  FormCore,
  PageCore,
  PagesCore,
  QuestionableConfigCore,
  QuestionCore,
  RefCore,
  RequirementCore,
  ResponseCore,
  ResultCore,
  SectionCore,
} from '../composable';
import { IRefCore }           from '../survey';
import { IQuestionnaireCore } from '../survey/IQuestionnaireCore';
import { log }                from '../util/logger';

export class SurveyBuilder {
  //  #questionnaire: QuestionnaireCore;

  #parts: RefCore[];

  #actions: ActionCore[] = [];

  #answers: AnswerCore[] = [];

  #braches: BranchCore[] = [];

  #bases: BaseCore[] = [];

  #config?: QuestionableConfigCore;

  #events?: EventEmitter;

  #forms?: FormCore;

  #page: PageCore[] = [];

  #pages: PagesCore = new PagesCore();

  #results: ResultCore[] = [];

  #requirements: RequirementCore[] = [];

  #responses: ResponseCore[] = [];

  #questions: QuestionCore[] = [];

  #sections: SectionCore[] = [];

  constructor(data: Partial<IQuestionnaireCore> = {}) {
    // this.#questionnaire = QuestionnaireCore.create(data);
    this.#parts = [];
    log(data);
    // const map = new ()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add<T extends IRefCore, C extends T & RefCore>(TCtor: new (...args: any[]) => C, data: Partial<T>) {
    const nu = new TCtor(data);
    if (nu instanceof ActionCore) {
      // this.#questionnaire.actions.push(nu);
      this.#actions.push(nu);
    } else if (nu instanceof SectionCore) {
      // this.#questionnaire.sections.push(nu);
      this.#sections.push(nu);
    } else if (nu instanceof QuestionCore) {
      // this.#questionnaire.questions.push(nu);
      this.#questions.push(nu);
    } else if (nu instanceof PageCore) {
      // this.#questionnaire.pages.set(nu);
      this.#page.push(nu);
    } else if (nu instanceof BranchCore) {
      // this.#questionnaire.branches.push(nu);
      this.#braches.push(nu);
    } else if (nu instanceof ResultCore) {
      // this.#questionnaire.results.push(nu);
      this.#results.push(nu);
    } else if (nu instanceof QuestionableConfigCore) {
      // this.#questionnaire.set(nu);
      this.#config = nu;
    } else if (nu instanceof ResponseCore) {
      this.#responses.push(nu);
    } else if (nu instanceof RequirementCore) {
      this.#requirements.push(nu);
    } else if (nu instanceof PagesCore) {
      this.#pages = (nu);
    } else if (nu instanceof AnswerCore) {
      this.#answers.push(nu);
    } else if (nu instanceof RefCore) {
      this.#parts.push(nu);
    } else {
      this.#parts.push(nu);
    }
    return nu;
  }

  init() {
    // this.#questionnaire.init();
    log(this.#pages, this.#forms, this.#events, this.#config, this.#bases)
  }
}
