export interface IQuestionableConfig {
  dev: boolean;
  showSteps: boolean;
}

export class QuestionableConfig implements IQuestionableConfig {
  dev = false;

  showSteps = false;

  constructor(config: Partial<QuestionableConfig>) {
    Object.assign(this, config);
  }
}
