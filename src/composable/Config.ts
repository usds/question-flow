import { isString, merge }                                from 'lodash';
import { isEnum, MODE }                                   from '../lib/enums';
import {
  IProgressBarConfig, IQuestionableConfig, IStepConfig,
} from '../survey/IQuestionableConfig';

export class QuestionableConfig implements IQuestionableConfig {
  #mode = MODE.VIEW;

  #steps: IStepConfig = {
    borderClass: 'border-0',
    showStepId:  false,
    titleClass:  '',
  }

  #progressBar: IProgressBarConfig = {
    baseBgColor: '#f0f0f0',
    bgColor:     '#005ea2',
    hide:        false,
    position:    'bottom',
    type:        'progress-bar',
  }

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

  get steps(): IStepConfig {
    return { ...this.#steps };
  }

  set steps(val: Partial<IStepConfig>) {
    merge(this.#steps, val);
  }

  get progressBar(): IProgressBarConfig {
    return { ...this.#progressBar };
  }

  set progressBar(val: Partial<IProgressBarConfig>) {
    merge(this.#progressBar, val);
  }
}
