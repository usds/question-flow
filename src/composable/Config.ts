import { isString, merge }                                from 'lodash';
import { isEnum, MODE }                                   from '../lib/enums';
import {
  IProgressBarConfig, IQuestionableConfig, IStepConfig,
} from '../survey/IQuestionableConfig';

export class QuestionableConfig implements IQuestionableConfig {
  #mode = MODE.VIEW;

  #steps: Partial<IStepConfig> = {
    borderClass: 'border-0',
    showStepId:  false,
    titleClass:  '',
  }

  #progressBar: Partial<IProgressBarConfig> = {
    hide:     false,
    position: 'top',
    type:     'progress-bar',
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

  get steps(): Partial<IStepConfig> {
    return { ...this.#steps };
  }

  set steps(val: Partial<IStepConfig>) {
    merge(this.#steps, val);
  }

  get progressBar(): Partial<IProgressBarConfig> {
    return { ...this.#progressBar };
  }

  set progressBar(val: Partial<IProgressBarConfig>) {
    merge(this.#progressBar, val);
  }
}
