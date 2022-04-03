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
import { ResultCore }                  from './ResultCore';
import {
  EQuestionnaireCoreProperties as p,
} from '../metadata/MQuestionnaire';

/**
 * Utility wrapper for survey state
 */
export class QuestionnaireCore extends BaseCore implements IQuestionnaireCore {
  public override readonly [p.instanceOfCheck]: TInstanceOf = ClassList.questionnaire;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.questionnaire, ClassList.base], obj);
  }

  // #sets: Map<TPrivateField, any> = new Map();

  // #touch<T>(name: TPrivateField, val: T): T {
  //   const doInit = !this.#sets.has(name) || isEmpty(this.#sets.get(name));
  //   if (doInit) {
  //     this.#sets.set(name, val);
  //   }
  //   return this.#sets.get(name);
  // }

  // public get [p.actions](): ActionCore[] {
  //   const val = this.#touch(p._actions, new Set<ActionCore>());
  //   return fromSet(val);
  // }

  // public get [p.branches](): BranchCore[] {
  //   const val = this.#touch(p._branches, new Set<BranchCore>());
  //   return fromSet(val);
  // }

  // public get [p.config](): QuestionableConfigCore {
  //   return this.#touch(p._config, new QuestionableConfigCore({}));
  // }

  // private set [p.config](data: Partial<IQuestionableConfigCore>) {
  //   let val: QuestionableConfigCore;
  //   if (data instanceof QuestionableConfigCore) {
  //     val = data as QuestionableConfigCore;
  //   } else {
  //     const current = this.#touch(p._config, new QuestionableConfigCore(data));
  //     merge(current, data);
  //     val = current;
  //   }
  //   this.#sets.set(p._config, val);
  // }

  // public get [p.flow](): string[] {
  //   const val = this.#touch(p._flow, new Set<string>());
  //   return fromSet(val);
  // }

  // public get [p.header]() {
  //   return this.#touch(p._header, '');
  // }

  // public get [p.results](): ResultCore[] {
  //   const val = this.#touch(p._results, new Set<ResultCore>());
  //   return fromSet(val);
  // }

  // private set [p.results](data: Partial<IResultCore>[]) {
  //   const val  = this.#touch(p._results, new Set<ResultCore>());
  //   const list = fromSet(val).concat(data.map((l) => ResultCore.create(l)));
  //   this.#sets.set(p._results, toSet<ResultCore>(list));
  // }

  // public get pages(): PagesCore {
  //   return this.#touch(p._pages, new PagesCore());
  // }

  // private set pages(data: Partial<IPagesCore>) {
  //   let val: PagesCore;
  //   if (data instanceof PagesCore) {
  //     val = data as PagesCore;
  //   } else {
  //     const current = this.#touch(p._pages, new PagesCore({}, this));
  //     merge(current, data);
  //     val = current;
  //   }
  //   this.#sets.set(p._pages, val);
  // }

  // public get questions(): QuestionCore[] {
  //   const val = this.#touch(p._questions, new Set<QuestionCore>());
  //   return fromSet(val);
  // }

  // private set questions(data: Partial<QuestionCore>[]) {
  //   const val  = this.#touch(p._questions, new Set<QuestionCore>());
  //   const list = fromSet(val).concat(data.map((l) => {
  //     if (l instanceof QuestionCore) {
  //       return l as QuestionCore;
  //     }
  //     return new QuestionCore(l);
  //   }));
  //   this.#sets.set(p._results, toSet<QuestionCore>(list));
  // }

  // public get sections(): SectionCore[] {
  //   const val = this.#touch(p._sections, new Set<SectionCore>());
  //   return fromSet(val);
  // }

  // private set sections(data: Partial<SectionCore>[]) {
  //   const val  = this.#touch(p._sections, new Set<SectionCore>());
  //   const list = fromSet(val).concat(data.map((l) => {
  //     if (l instanceof SectionCore) {
  //       return l as SectionCore;
  //     }
  //     return new SectionCore(l);
  //   }));
  //   this.#sets.set(p._results, toSet<SectionCore>(list));
  // }

  public static override create(data: Partial<IQuestionnaireCore> = {}) {
    if (data instanceof QuestionnaireCore) {
      return data;
    }
    return new QuestionnaireCore(data);
  }

  constructor(data: Partial<IQuestionnaireCore> = {}) {
    super();
    const config = (data.config instanceof QuestionableConfigCore)
      ? data.config : new QuestionableConfigCore(data.config || {});

    this.config    = config;
    this.pages     = PagesCore.create(data.pages);
    this.questions = data.questions?.map((q) => QuestionCore.create(q)) || [];
    this.actions   = data.actions?.map((q) => ActionCore.create(q)) || [];
    this.steps     = this.questions.map((q) => q) || [];
    this.branches  = data.branches?.map((b) => BranchCore.create(b)) || [];
    this.sections  = data.sections?.map((s) => SectionCore.create(s)) || [];
    // Wizard flow is defined as linear sequence of unique ids
    this.flow = this.steps.map((q) => q.id);
  }

  [p.actions]: ActionCore[];

  [p.branches]: BranchCore[];

  [p.config]: QuestionableConfigCore;

  [p.flow]: string[];

  [p.header]: string;

  [p.questions]: QuestionCore[];

  steps: StepCore[];

  sections: SectionCore[];

  [p.results]: ResultCore[];

  [p.pages]: PagesCore;
}
