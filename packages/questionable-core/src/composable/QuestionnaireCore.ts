/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
import { ActionCore } from './ActionCore';
import {
  BranchCore,
  QuestionCore,
  SectionCore,
  StepCore,
}         from './StepCore';
import { IQuestionnaireCore }     from '../survey/IQuestionnaireCore';
import { QuestionableConfigCore } from './QuestionableConfigCore';
import { BaseCore }               from './BaseCore';
import { PagesCore }              from './PagesCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { ResultCore } from './ResultCore';

/**
 * Utility wrapper for survey state
 */
export class QuestionnaireCore extends BaseCore implements IQuestionnaireCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.questionnaire;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.questionnaire, ClassList.base], obj);
  }

  public static override create(data: IQuestionnaireCore) {
    if (data instanceof QuestionnaireCore) {
      return data;
    }
    return new QuestionnaireCore(data);
  }

  #config: QuestionableConfigCore;

  #pages: PagesCore;

  #questions: QuestionCore[];

  #actions: ActionCore[];

  #steps!: StepCore[];

  #branches: BranchCore[];

  #sections: SectionCore[];

  #flow!: string[];

  #header: string;

  #results: ResultCore[];

  constructor(data: IQuestionnaireCore) {
    super();
    const config = (data.config instanceof QuestionableConfigCore)
      ? data.config : new QuestionableConfigCore(data.config);

    this.#config    = config;
    this.#pages     = PagesCore.create(data.pages);
    this.#questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.#actions   = data.actions?.map((q) => ActionCore.create(q)) || [];
    this.#branches  = data.branches?.map((b) => BranchCore.create(b)) || [];
    this.#sections  = data.sections?.map((s) => SectionCore.create(s)) || [];
    this.#header    = data.header || '';
    this.#results   = data.results?.map((r) => ResultCore.create(r)) || [];
    this.init();
  }

  public init() {
    this.#steps = this.#questions.map((q) => q) || [];
    this.#flow  = this.#steps.map((q) => q.id);
  }

  public set<T extends QuestionableConfigCore | string>(obj: T) {
    if (obj instanceof QuestionableConfigCore) {
      this.#config = obj;
    }
  }

  public get actions(): ActionCore[] {
    return this.#actions;
  }

  public get branches(): BranchCore[] {
    return this.#branches;
  }

  public get config(): QuestionableConfigCore {
    return this.#config;
  }

  public get flow(): string[] {
    return this.#flow;
  }

  public get header(): string {
    return this.#header;
  }

  public get questions(): QuestionCore[] {
    return this.#questions;
  }

  public get steps(): StepCore[] {
    return this.#steps;
  }

  public get sections(): SectionCore[] {
    return this.#sections;
  }

  public get results(): ResultCore[] {
    return this.#results;
  }

  public get pages(): PagesCore {
    return this.#pages;
  }
}
