import { MODE } from './enums';

export interface IQuestionableConfig {
  dev: boolean;
  mode: MODE;
  showSteps: boolean;
}

export class QuestionableConfig implements IQuestionableConfig {
  dev = false;

  mode = MODE.VIEW;

  showSteps = false;

  constructor(config: Partial<IQuestionableConfig> = {}) {
    Object.assign(this, config);
  }
}
