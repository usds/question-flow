import {
  QuestionnaireCore,
} from '@usds.gov/questionable-core';
import { IQuestionnaire } from '../survey/IQuestionnaire';
import { IQuestion }      from '../survey/IStep';

export class Questionnaire extends QuestionnaireCore {
  questions: IQuestion[] = [];

  constructor(data: Partial<IQuestionnaire>) {
    super(data);
    if (data.questions) {
      this.questions = data.questions;
    }
  }

  isComplete(stepId: string) {
    return this.flow.indexOf(stepId) === this.flow.length - 1;
  }
}
