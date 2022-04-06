/* eslint-disable import/no-cycle */
import {
  isEmpty,
  isString,
  merge,
  noop,
} from 'lodash';
import { EventEmitterCore } from './EventEmitterCore';
import {
  isEnum,
  MODE,
} from '../util/enums';
import {
  TGetDictionaryCore,
  TStringDictionaryCore,
} from '../util/types';
import {
  INavigationConfigCore,
  IPagesConfigCore,
  IProgressBarConfigCore,
  IQuestionableConfigCore,
  IQuestionConfigCore,
  IStepConfigCore,
} from '../survey/IQuestionableConfigCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { BaseCore } from './BaseCore';

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
export class QuestionableConfigCore extends BaseCore implements IQuestionableConfigCore {
  public get instanceOfCheck(): TInstanceOf {
    return  ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  #mode!: MODE;

  #nav!: INavigationConfigCore;

  #pages!: IPagesConfigCore;

  #progressBar!: IProgressBarConfigCore;

  #questions!: IQuestionConfigCore;

  #steps!: IStepConfigCore;

  #events!: EventEmitterCore;

  #params!: TStringDictionaryCore;

  readonly getRuntimeConfig?: TGetDictionaryCore;

  constructor(data: Partial<QuestionableConfigCore> = {}) {
    super(data);
    merge(this, defaults, data);
    this.#params = (data.getRuntimeConfig) ? data.getRuntimeConfig(this) : {};
    if (data.params?.dev) {
      this.#mode = MODE.DEV;
    }
    this.events = new EventEmitterCore(data.events);
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

  get nav(): INavigationConfigCore {
    if (isEmpty(this.#nav)) {
      this.#nav = {};
    }
    return { ...this.#nav };
  }

  set nav(val: INavigationConfigCore) {
    merge(this.#nav, val);
  }

  get pages(): IPagesConfigCore {
    if (isEmpty(this.#pages)) {
      this.#pages = {};
    }
    return this.#pages;
  }

  set pages(val: IPagesConfigCore) {
    merge(this.#pages, val);
  }

  get progressBar(): IProgressBarConfigCore {
    if (isEmpty(this.#progressBar)) {
      this.#progressBar = {};
    }
    return { ...this.#progressBar };
  }

  set progressBar(val: IProgressBarConfigCore) {
    merge(this.#progressBar, val);
  }

  get questions(): IQuestionConfigCore {
    if (isEmpty(this.#questions)) {
      this.#questions = {};
    }
    return { ...this.#questions };
  }

  set questions(val: IQuestionConfigCore) {
    merge(this.#questions, val);
  }

  get steps(): IStepConfigCore {
    if (isEmpty(this.#steps)) {
      this.#steps = {};
    }
    return { ...this.#steps };
  }

  set steps(val: IStepConfigCore) {
    merge(this.#steps, val);
  }
}
