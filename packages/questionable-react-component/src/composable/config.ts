/* eslint-disable max-classes-per-file */
import { merge }        from 'lodash';
import {
  noop,
  QuestionableConfigCore,
  StepConfigCore,
  EventEmitterCore,
  NavigationConfigCore,
  PagesConfigCore,
  ProgressBarConfigCore,
  QuestionConfigCore,
} from '@usds.gov/questionable-core';
import { getQueryParams } from '../lib/params';

/**
 * Configuration class for customizing the Questionable components
 *
 * The config has opinionated defaults, but is easily modified using Partial updates
 */
export const makeConfig = (data: Partial<QuestionableConfigCore> = {}) => {
  const defaults                                = {
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
    nav: {
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
    },
    pages: {
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
    },
    params:      {},
    progressBar: {
      baseBgColor: '#f0f0f0',
      bgColor:     '#005ea2',
      hide:        false,
      position:    'bottom',
      type:        'progress-bar',
    },
    questions: {
      showAnswerBorder: true,
    },
    steps: {
      borderClass: 'border-0',
      showStepId:  false,
      titleClass:  '',
    },
  };
  const config: Partial<QuestionableConfigCore> = merge(defaults, data);
  merge(config.params, getQueryParams());
  if (data.events) {
    config.events = EventEmitterCore.create(data.events);
  }
  if (data.steps) {
    config.steps = StepConfigCore.create(data.steps);
    if (config.dev || config.params?.showStepId) {
      config.steps.showStepId = true;
    }
  }
  if (data.questions) {
    config.questions = QuestionConfigCore.create(data.questions);
  }
  if (data.nav) {
    config.nav = NavigationConfigCore.create(data.nav);
  }
  if (data.pages) {
    config.pages = PagesConfigCore.create(data.pages);
  }
  if (data.progressBar) {
    config.progressBar = ProgressBarConfigCore.create(data.progressBar);
  }
  return QuestionableConfigCore.create(config);
};
