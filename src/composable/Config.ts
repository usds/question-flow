import { MODE }                from '../lib/enums';
import { IQuestionableConfig } from '../survey/IQuestionableConfig';

export class QuestionableConfig implements IQuestionableConfig {
  dev = false;

  mode = MODE.VIEW;

  showSteps = false;

  constructor(config: Partial<IQuestionableConfig> = {}) {
    Object.assign(this, config);
  }
}
