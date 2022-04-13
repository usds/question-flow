/* eslint-disable import/no-cycle */
import {
  isEmpty, isString, merge, noop,
}            from 'lodash';
import { EventEmitterCore }                          from './EventEmitterCore';
import { isEnum, MODE }                              from '../util/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../util/types';
import {
  NavigationConfigCore,
  PagesConfigCore,
  ProgressBarConfigCore,
  QuestionConfigCore,
  StepConfigCore,
} from './config';
import { IQuestionableConfigCore }                 from '../survey/IConfigCore';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { BaseCore }                                from './BaseCore';

const defaults = {
  events: {
    onActionClick: noop,
    onAnswer:      noop,
    onAnyEvent:    noop,
    onBranch:      noop,
    onError:       noop,
    onGateSwitch:  noop,
    onInit:        noop,
    onNoResults:   noop,
    onPage:        noop,
    onResults:     noop,
  },
  mode:        MODE.VIEW,
  nav:         {},
  pages:       {},
  params:      { dev: false },
  progressBar: {},
  questions:   {},
};

/**
 * Configuration class for customizing the Questionable components
 *
 * The config has opinionated defaults, but is easily modified using Partial updates
 */
export class QuestionableConfigCore
  extends BaseCore
  implements IQuestionableConfigCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<QuestionableConfigCore>) {
    if (data instanceof QuestionableConfigCore) {
      return data;
    }
    return new QuestionableConfigCore(data);
  }

  public static override createOptional(data?: Partial<QuestionableConfigCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return QuestionableConfigCore.create(data);
  }

  #mode!: MODE;

  #nav!: NavigationConfigCore;

  #pages!: PagesConfigCore;

  #progressBar!: ProgressBarConfigCore;

  #questions!: QuestionConfigCore;

  #steps!: StepConfigCore;

  #events!: EventEmitterCore;

  #params!: TStringDictionaryCore;

  readonly getRuntimeConfig?: TGetDictionaryCore;

  constructor(data: Partial<QuestionableConfigCore> = {}) {
    super(data);
    merge(this, defaults, data);
    this.#params = data.getRuntimeConfig ? data.getRuntimeConfig(this) : {};
    if (data.params?.dev) {
      this.#mode = MODE.DEV;
    }
    this.#events      = EventEmitterCore.create(data.events);
    this.#steps       = StepConfigCore.create(data.steps);
    this.#questions   = QuestionConfigCore.create(data.questions);
    this.#progressBar = ProgressBarConfigCore.create(data.progressBar);
    this.#pages       = PagesConfigCore.create(data.pages);
    this.#nav         = NavigationConfigCore.create(data.nav);
  }

  get dev(): boolean {
    return this.#mode === MODE.DEV;
  }

  get events(): EventEmitterCore {
    return this.#events;
  }

  private set events(val: EventEmitterCore) {
    this.#events = val;
  }

  get mode(): MODE {
    return this.#mode;
  }

  set mode(val: MODE | string) {
    if (isString(val)) {
      if (isEnum(MODE, val)) {
        this.#mode = val as MODE;
      } else {
        this.#mode = MODE.VIEW;
      }
    } else {
      this.#mode = val;
    }
  }

  get params(): TStringDictionaryCore {
    if (isEmpty(this.#params)) {
      this.#params = {};
    }
    return this.#params;
  }

  get nav(): NavigationConfigCore {
    if (isEmpty(this.#nav)) {
      this.#nav = new NavigationConfigCore();
    }
    return this.#nav;
  }

  set nav(val: NavigationConfigCore) {
    merge(this.#nav, val);
  }

  get pages(): PagesConfigCore {
    if (isEmpty(this.#pages)) {
      this.#pages = new PagesConfigCore();
    }
    return this.#pages;
  }

  set pages(val: PagesConfigCore) {
    merge(this.#pages, val);
  }

  get progressBar(): ProgressBarConfigCore {
    if (isEmpty(this.#progressBar)) {
      this.#progressBar = new ProgressBarConfigCore();
    }
    return this.#progressBar;
  }

  set progressBar(val: ProgressBarConfigCore) {
    merge(this.#progressBar, val);
  }

  get questions(): QuestionConfigCore {
    if (isEmpty(this.#questions)) {
      this.#questions = new QuestionConfigCore();
    }
    return this.#questions;
  }

  set questions(val: QuestionConfigCore) {
    merge(this.#questions, val);
  }

  get steps(): StepConfigCore {
    if (isEmpty(this.#steps)) {
      this.#steps = new StepConfigCore();
    }
    return this.#steps;
  }

  set steps(val: StepConfigCore) {
    merge(this.#steps, val);
  }
}
