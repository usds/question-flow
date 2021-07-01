import { isString, merge } from 'lodash';
import { isEnum, MODE }    from '../lib/enums';
import {
  INavigationConfig,
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
export class QuestionableConfig implements IQuestionableConfig {
  #mode = MODE.VIEW;

  #nav: INavigationConfig = {
    next: {
      defaultLabel:  'Next',
      horizontalPos: 'left',
      type:          'button',
      verticalPos:   'bottom',
    },
    prev: {
      defaultLabel:  'Go back',
      horizontalPos: 'left',
      type:          'link',
      verticalPos:   'top',
    },
  };

  #progressBar: IProgressBarConfig = {
    baseBgColor: '#f0f0f0',
    bgColor:     '#005ea2',
    hide:        false,
    position:    'bottom',
    type:        'progress-bar',
  };

  #questions: IQuestionConfig = {
    showAnswerBorder: true,
  };

  #steps: IStepConfig = {
    borderClass: 'border-0',
    showStepId:  false,
    titleClass:  '',
  };

  constructor(config: Partial<IQuestionableConfig> = {}) {
    merge(this, config);
    if (this.dev) {
      this.#steps.showStepId = true;
    }
  }

  get dev(): boolean {
    return this.#mode === MODE.DEV;
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

  get nav(): INavigationConfig {
    return { ...this.#nav };
  }

  set nav(val: Partial<INavigationConfig>) {
    merge(this.#nav, val);
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
