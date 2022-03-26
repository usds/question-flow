import { isString, merge } from 'lodash';
import {
  isEnum,
  MODE,
  noop,
  QuestionableConfigCore,
  TStringDictionaryCore,
} from '@usds.gov/questionable-core';
import { EventEmitter }   from './EventEmitter';
import { getQueryParams } from '../lib/params';
import {
  INavigationConfig,
  IPagesConfig,
  IProgressBarConfig,
  IQuestionableConfig,
  IQuestionConfig,
  IStepConfig,
} from '../survey/IQuestionableConfig';

/**
 * Configuration class for customizing the Questionable components
 *
 * The config has opinionated defaults, but is easily modified using Partial updates
 */
export class QuestionableConfig extends QuestionableConfigCore implements IQuestionableConfig {
  protected _mode = MODE.VIEW;

  protected _nav: INavigationConfig = {
    next: {
      defaultLabel:  'Next',
      horizontalPos: 'left',
      type:          'button',
      verticalPos:   'bottom',
      visible:       true,
    },
    prev: {
      defaultLabel:  'Go back',
      horizontalPos: 'left',
      type:          'link',
      verticalPos:   'top',
      visible:       true,
    },
  };

  protected _pages: IPagesConfig = {
    landing: {
      visible: true,
    },
    noresults: {
      visible: true,
    },
    results: {
      visible: true,
    },
    summary: {
      visible: true,
    },
  };

  protected _progressBar: IProgressBarConfig = {
    baseBgColor: '#f0f0f0',
    bgColor:     '#005ea2',
    hide:        false,
    position:    'bottom',
    type:        'progress-bar',
  };

  protected _questions: IQuestionConfig = {
    showAnswerBorder: true,
  };

  protected _steps: IStepConfig = {
    borderClass: 'border-0',
    showStepId:  false,
    titleClass:  '',
  };

  protected _events: EventEmitter = new EventEmitter({
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
  });

  protected _params: TStringDictionaryCore = {};

  constructor(config: Partial<IQuestionableConfig> = {}) {
    super(config);
    merge(this, config);
    const params = getQueryParams();
    if (params.dev) {
      this._mode = MODE.DEV;
    }
    if (this.dev || params.showStepId) {
      this._steps.showStepId = true;
    }
  }

  get dev(): boolean {
    return this._mode === MODE.DEV;
  }

  get events(): EventEmitter {
    return this._events;
  }

  set events(val: Partial<EventEmitter>) {
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

  get nav(): INavigationConfig {
    return { ...this._nav };
  }

  set nav(val: Partial<INavigationConfig>) {
    merge(this._nav, val);
  }

  get pages(): IPagesConfig {
    return this._pages;
  }

  set pages(val: Partial<IPagesConfig>) {
    merge(this._pages, val);
  }

  get params(): TStringDictionaryCore {
    return this._params;
  }

  set params(val: TStringDictionaryCore) {
    merge(this._pages, val);
  }

  get progressBar(): IProgressBarConfig {
    return { ...this._progressBar };
  }

  set progressBar(val: Partial<IProgressBarConfig>) {
    merge(this._progressBar, val);
  }

  get questions(): IQuestionConfig {
    return { ...this._questions };
  }

  set questions(val: Partial<IQuestionConfig>) {
    merge(this._questions, val);
  }

  get steps(): IStepConfig {
    return { ...this._steps };
  }

  set steps(val: Partial<IStepConfig>) {
    merge(this._steps, val);
  }
}
