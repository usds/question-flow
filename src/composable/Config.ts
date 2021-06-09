import { isString, merge }                  from 'lodash';
import { isEnum, MODE }                     from '../lib/enums';
import { IQuestionableConfig, IStepConfig } from '../survey/IQuestionableConfig';

export class QuestionableConfig implements IQuestionableConfig {
  #mode = MODE.VIEW;

  #steps: Partial<IStepConfig> = {
    borderClass:  'border-0',
    showProgress: true,
    showStepId:   false,
    titleClass:   '',
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
}
