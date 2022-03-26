import { isString, merge }                     from 'lodash';
import { EventEmitterCore }                    from './EventEmitterCore';
import {
  isEnum, MODE, noop, TStringDictionaryCore,
} from '../lib';
import {
  INavigationConfigCore,
  IPagesConfigCore,
  IProgressBarConfigCore,
  IQuestionableConfigCore,
  IQuestionConfigCore,
  IStepConfigCore,
} from '../survey/IQuestionableConfigCore';

/**
 * Configuration class for customizing the Questionable components
 *
 * The config has opinionated defaults, but is easily modified using Partial updates
 */
export class QuestionableConfigCore implements IQuestionableConfigCore {
  protected _mode = MODE.VIEW;

  protected _nav: INavigationConfigCore = {};

  protected _pages: IPagesConfigCore = {};

  protected _progressBar: IProgressBarConfigCore = {};

  protected _questions: IQuestionConfigCore = {};

  protected _steps: IStepConfigCore = {};

  protected _events: EventEmitterCore = new EventEmitterCore({
    onActionClick: noop,
    onAnswer:      noop,
    onAnyEvent:    noop,
    onError:       noop,
    onInit:        noop,
    onNoResults:   noop,
    onPage:        noop,
    onResults:     noop,
  });

  protected _params: TStringDictionaryCore = {};

  constructor(config: Partial<IQuestionableConfigCore> = {}) {
    merge(this, config);
    if (config.getRuntimeConfig) {
      this._params = config.getRuntimeConfig();
    }
    if (this._params.dev) {
      this._mode = MODE.DEV;
    }
  }

  get dev(): boolean {
    return this._mode === MODE.DEV;
  }

  get events(): EventEmitterCore {
    return this._events;
  }

  set events(val: Partial<EventEmitterCore>) {
    merge(this._events, val);
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
    return this._params || {};
  }

  get nav(): INavigationConfigCore {
    return { ...this._nav };
  }

  set nav(val: Partial<INavigationConfigCore>) {
    merge(this._nav, val);
  }

  get pages(): IPagesConfigCore {
    return this._pages;
  }

  set pages(val: Partial<IPagesConfigCore>) {
    merge(this._pages, val);
  }

  get progressBar(): IProgressBarConfigCore {
    return { ...this._progressBar };
  }

  set progressBar(val: Partial<IProgressBarConfigCore>) {
    merge(this._progressBar, val);
  }

  get questions(): IQuestionConfigCore {
    return { ...this._questions };
  }

  set questions(val: Partial<IQuestionConfigCore>) {
    merge(this._questions, val);
  }

  get steps(): IStepConfigCore {
    return { ...this._steps };
  }

  set steps(val: Partial<IStepConfigCore>) {
    merge(this._steps, val);
  }
}
