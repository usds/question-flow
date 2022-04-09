/* eslint-disable max-classes-per-file */
import { merge }            from 'lodash';
import {
  noop,
  QuestionableConfigCore,
} from '@usds.gov/questionable-core';
import { EventEmitter }   from './EventEmitter';
import { getQueryParams } from '../lib/params';
import {
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
export class QuestionableConfig extends QuestionableConfigCore {
  #nav: NavigationConfig = new NavigationConfig({
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
  });

  #pages: PagesConfig = new PagesConfig({
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
  });

  #progressBar: ProgressBarConfig = new ProgressBarConfig({
    baseBgColor: '#f0f0f0',
    bgColor:     '#005ea2',
    hide:        false,
    position:    'bottom',
    type:        'progress-bar',
  });

  #questions: QuestionConfig = new QuestionConfig({
    showAnswerBorder: true,
  });

  #steps: StepConfig = new StepConfig({
    borderClass: 'border-0',
    showStepId:  false,
    titleClass:  '',
  });

  #events: EventEmitter = new EventEmitter({
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

  constructor(data: Partial<QuestionableConfig> = {}) {
    super(data);
    merge(this.params, getQueryParams());
    if (this.dev || this.params.showStepId) {
      this.#steps.showStepId = true;
    }
    if (data.events) {
      this.#events = EventEmitter.create(data.events);
    }
    if (data.step) {
      this.#step = StepConfig.create(data.step);
    }
    if (data.events) {
      this.#events = EventEmitter.create(data.events);
    }
    if (data.events) {
      this.#events = EventEmitter.create(data.events);
    }
    if (data.events) {
      this.#events = EventEmitter.create(data.events);
    }
    if (data.events) {
      this.#events = EventEmitter.create(data.events);
    }
  }

  get events(): EventEmitter {
    return this.#events;
  }

  set events(val: Partial<EventEmitter>) {
    merge(this.#events, val);
  }

  get nav(): NavigationConfig {
    return this.#nav;
  }

  set nav(val: Partial<NavigationConfig>) {
    merge(this.#nav, val);
  }

  get pages(): IPagesConfig {
    return this.#pages;
  }

  set pages(val: Partial<IPagesConfig>) {
    merge(this.#pages, val);
  }

  get progressBar(): IProgressBarConfig {
    return { ...this.#progressBar };
  }

  set progressBar(val: Partial<IProgressBarConfig>) {
    merge(this.#progressBar, val);
  }

  get questions(): IQuestionConfig {
    return { ...this.#questions };
  }

  set questions(val: Partial<IQuestionConfig>) {
    merge(this.#questions, val);
  }

  get steps(): IStepConfig {
    return { ...this.#steps };
  }

  set steps(val: Partial<IStepConfig>) {
    merge(this.#steps, val);
  }
}
