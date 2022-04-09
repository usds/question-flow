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
import { QuestionableConfigCore } from './ConfigCore';
import { BaseCore }               from './BaseCore';
import { PagesCore }              from './PagesCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { ResultCore } from './ResultCore';
import { matches }    from '../util/helpers';

type TCollected = QuestionCore | BranchCore | SectionCore | ActionCore | ResultCore;

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

  public static override create(data: Partial<QuestionnaireCore>) {
    if (data instanceof QuestionnaireCore) {
      return data;
    }
    return new QuestionnaireCore(data);
  }

  public static override createOptional(data?: Partial<QuestionnaireCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return QuestionnaireCore.create(data);
  }

  #config!: QuestionableConfigCore;

  #pages!: PagesCore;

  #questions!: QuestionCore[];

  #actions!: ActionCore[];

  #steps!: StepCore[];

  #branches!: BranchCore[];

  #sections!: SectionCore[];

  #flow!: string[];

  #header!: string;

  #results!: ResultCore[];

  constructor(data: Partial<QuestionnaireCore>) {
    super(data);
    this.init(data);
  }

  public init(data: Partial<QuestionnaireCore>) {
    const config    = (data.config instanceof QuestionableConfigCore)
      ? data.config : new QuestionableConfigCore(data.config);
    this.#config    = config;
    this.#pages     = PagesCore.create(data.pages || {});
    this.#questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.#actions   = data.actions?.map((q) => ActionCore.create(q)) || [];
    this.#branches  = data.branches?.map((b) => BranchCore.create(b)) || [];
    this.#sections  = data.sections?.map((s) => SectionCore.create(s)) || [];
    this.#header    = data.header || '';
    this.#results   = data.results?.map((r) => ResultCore.create(r)) || [];
    this.#steps     = this.#questions.map((q) => q) || [];
    this.#flow      = this.#steps.map((q) => q.id);
    return this;
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

  public existsIn(data: TCollected): boolean {
    if (data instanceof QuestionCore) {
      return this.#questions.some((q) => q === data || matches(q.title, data.title));
    }
    if (data instanceof BranchCore) {
      return this.#branches.some((q) => q === data || matches(q.title, data.title));
    }
    if (data instanceof SectionCore) {
      return this.#sections.some((q) => q === data || matches(q.title, data.title));
    }
    if (data instanceof ResultCore) {
      return this.#results.some((q) => q === data || matches(q.title, data.title));
    }
    if (data instanceof ActionCore) {
      return this.#actions.some((q) => q === data || matches(q.title, data.title));
    }
    return false;
  }

  public add(data: TCollected): QuestionnaireCore {
    const exists = this.existsIn(data);
    if (!exists) {
      if (data instanceof QuestionCore) {
        this.#questions.push(data);
      } else if (data instanceof SectionCore) {
        this.#sections.push(data);
      } else if (data instanceof BranchCore) {
        this.#branches.push(data);
      } else if (data instanceof ResultCore) {
        this.#results.push(data);
      } else if (data instanceof ActionCore) {
        this.#actions.push(data);
      }
    }
    return this;
  }
}
