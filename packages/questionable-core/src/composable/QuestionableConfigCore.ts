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

  protected _mode!: MODE;

  protected _nav!: INavigationConfigCore;

  protected _pages!: IPagesConfigCore;

  protected _progressBar!: IProgressBarConfigCore;

  protected _questions!: IQuestionConfigCore;

  protected _steps!: IStepConfigCore;

  protected _events!: EventEmitterCore;

  protected _params!: TStringDictionaryCore;

  readonly getRuntimeConfig?: TGetDictionaryCore;

  constructor(data: IQuestionableConfigCore) {
    super();
    merge(defaults, data);
    merge(this, data);
    this._params = (data.getRuntimeConfig) ? data.getRuntimeConfig(this) : {};
    if (data.params?.dev) {
      this._mode = MODE.DEV;
    }
    this.events = new EventEmitterCore(data.events);
  }

  get dev(): boolean {
    return this._mode === MODE.DEV;
  }

  get events(): EventEmitterCore {
    return this._events;
  }

  private set events(val: EventEmitterCore) {
    this._events = val;
  }

  get mode(): MODE {
    return this._mode;
  }

  set mode(val: MODE | string) {
    if (isString(val)) {
      if (isEnum(MODE, val)) {
        this._mode = val as MODE;
      } else {
        this._mode = MODE.VIEW;
      }
    } else {
      this._mode = val;
    }
  }

  get params(): TStringDictionaryCore {
    if (isEmpty(this._params)) {
      this._params = {};
    }
    return this._params;
  }

  get nav(): INavigationConfigCore {
    if (isEmpty(this._nav)) {
      this._nav = {};
    }
    return { ...this._nav };
  }

  set nav(val: INavigationConfigCore) {
    merge(this._nav, val);
  }

  get pages(): IPagesConfigCore {
    if (isEmpty(this._pages)) {
      this._pages = {};
    }
    return this._pages;
  }

  set pages(val: IPagesConfigCore) {
    merge(this._pages, val);
  }

  get progressBar(): IProgressBarConfigCore {
    if (isEmpty(this._progressBar)) {
      this._progressBar = {};
    }
    return { ...this._progressBar };
  }

  set progressBar(val: IProgressBarConfigCore) {
    merge(this._progressBar, val);
  }

  get questions(): IQuestionConfigCore {
    if (isEmpty(this._questions)) {
      this._questions = {};
    }
    return { ...this._questions };
  }

  set questions(val: IQuestionConfigCore) {
    merge(this._questions, val);
  }

  get steps(): IStepConfigCore {
    if (isEmpty(this._steps)) {
      this._steps = {};
    }
    return { ...this._steps };
  }

  set steps(val: IStepConfigCore) {
    merge(this._steps, val);
  }
}
