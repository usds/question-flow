import { AnswerCore } from '@usds.gov/questionable-core';

export class Answer extends AnswerCore {
  public static override create(data: Partial<Answer>) {
    if (data instanceof Answer) {
      return data;
    }
    return new Answer(data);
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(data: Partial<Answer>) {
    super(data);
  }
}
