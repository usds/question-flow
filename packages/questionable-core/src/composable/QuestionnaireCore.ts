/* eslint-disable import/no-cycle */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
import {
  isEmpty,
  merge,
} from 'lodash';
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
import { FormCore }               from './FormCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { ResultCore }                   from './ResultCore';
import { fromSet, toSet }               from '../util/set';
import { ComposableCore }               from './ComposableCore';
import {
  EQuestionnaireCoreProperties as p,
  TQuestionnaireCoreProperties as TQ,
} from '../metadata/MQuestionnaire';
import { IPagesCore } from '../survey/IPagesCore';
import { IResultCore } from '../survey/IResultCore';
import { IQuestionableConfigCore } from '../survey/IQuestionableConfigCore';

const className = ClassList.questionnaire;
type TSettable = TQ & typeof p.actions
  | typeof p.branches
  | typeof p.sections
  | typeof p.questions
  | typeof p.flow
  | typeof p.pages
  | typeof p.config
  | typeof p.results
  | typeof p.header;
type TPrivateField = `_${TSettable}`;
/**
 * Utility wrapper for survey state
 */
export class QuestionnaireCore extends BaseCore implements IQuestionnaireCore {
  public static override readonly [p._name] = className;

  public override readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, ClassList.base], obj);
  }

  #sets: Map<TPrivateField, any> = new Map();

  #touch<T>(name: TPrivateField, val: T): T {
    const doInit = !this.#sets.has(name) || isEmpty(this.#sets.get(name));
    if (doInit) {
      this.#sets.set(name, val);
    }
    return this.#sets.get(name);
  }

  public get [p.actions](): ActionCore[] {
    const val = this.#touch(p._actions, new Set<ActionCore>());
    return fromSet(val);
  }

  public get [p.branches](): BranchCore[] {
    const val = this.#touch(p._branches, new Set<BranchCore>());
    return fromSet(val);
  }

  public get [p.config](): QuestionableConfigCore {
    return this.#touch(p._config, new QuestionableConfigCore({}, this.form));
  }

  private set [p.config](data: Partial<IQuestionableConfigCore>) {
    let val: QuestionableConfigCore;
    if (data instanceof QuestionableConfigCore) {
      val = data as QuestionableConfigCore;
    } else {
      const current = this.#touch(p._config, new QuestionableConfigCore(data, this.form));
      merge(current, data);
      val = current;
    }
    this.#sets.set(p._config, val);
  }

  public get [p.flow](): string[] {
    const val = this.#touch(p._flow, new Set<string>());
    return fromSet(val);
  }

  public get [p.header]() {
    return this.#touch(p._header, '');
  }

  public override get [p.results](): ResultCore[] {
    const val = this.#touch(p._results, new Set<ResultCore>());
    return fromSet(val);
  }

  private set [p.results](data: Partial<IResultCore>[]) {
    const val  = this.#touch(p._results, new Set<ResultCore>());
    const list = fromSet(val).concat(data.map((l) => {
      if (l instanceof ResultCore) {
        return l as ResultCore;
      }
      return new ResultCore(l, this);
    }));
    this.#sets.set(p._results, toSet<ResultCore>(list));
  }

  public get pages(): PagesCore {
    return this.#touch(p._pages, new PagesCore({}, this));
  }

  private set pages(data: Partial<IPagesCore>) {
    let val: PagesCore;
    if (data instanceof PagesCore) {
      val = data as PagesCore;
    } else {
      const current = this.#touch(p._pages, new PagesCore({}, this));
      merge(current, data);
      val = current;
    }
    this.#sets.set(p._pages, val);
  }

  public get questions(): QuestionCore[] {
    const val = this.#touch(p._questions, new Set<QuestionCore>());
    return fromSet(val);
  }

  private set questions(data: Partial<QuestionCore>[]) {
    const val  = this.#touch(p._questions, new Set<QuestionCore>());
    const list = fromSet(val).concat(data.map((l) => {
      if (l instanceof QuestionCore) {
        return l as QuestionCore;
      }
      return new QuestionCore(l, this);
    }));
    this.#sets.set(p._results, toSet<QuestionCore>(list));
  }

  public get sections(): SectionCore[] {
    const val = this.#touch(p._sections, new Set<SectionCore>());
    return fromSet(val);
  }

  private set sections(data: Partial<SectionCore>[]) {
    const val  = this.#touch(p._sections, new Set<SectionCore>());
    const list = fromSet(val).concat(data.map((l) => {
      if (l instanceof SectionCore) {
        return l as SectionCore;
      }
      return new SectionCore(l, this);
    }));
    this.#sets.set(p._results, toSet<SectionCore>(list));
  }

  public steps: StepCore[];

  public static override create(data: Partial<QuestionnaireCore> = {}, form: Partial<FormCore> = {}) {
    if (data instanceof QuestionnaireCore) {
      return data;
    }
    return new QuestionnaireCore(data, form);
  }

  constructor(data: Partial<IQuestionnaireCore> = {}, form: Partial<FormCore> = {}) {
    super(data, form);
    const config = (data.config instanceof QuestionableConfigCore)
      ? data.config : new QuestionableConfigCore(data.config, this);

    this.config = data.config;
    this.pages = data.pages;
    this.#questions  = toSet(data.questions?.map((q) => new QuestionCore({
      ...q,
    }, this)) || []);
    this.#actions    = toSet(data.actions?.map((q) => new ActionCore(q, this)) || []);
    this.steps       = this.questions.map((q) => q) || [];
    this[p.branches] = toSet(data.branches?.map((b) => new BranchCore(b, this)) || []);
    this.#sections   = toSet(data.sections?.map((s) => new SectionCore(s, this)) || []);
    // Wizard flow is defined as linear sequence of unique ids
    this[p._flow] = this.#toSet(this.steps.map((q) => q.id));
  }
}
