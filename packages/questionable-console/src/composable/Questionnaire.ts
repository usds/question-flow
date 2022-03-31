/* eslint-disable import/no-cycle */
import {
  FormCore,
  IQuestionnaireCore,
  QuestionnaireCore,
} from '@usds.gov/questionable-core';
import { Question } from './Question';

type ctor = IQuestionnaireCore & {
  form: FormCore
};

export class Questionnaire extends QuestionnaireCore implements IQuestionnaireCore {
  questions: Question[];

  constructor(data: ctor) {
    super(data);
    this.questions = data.questions.map((q, i) => new Question({
      order: i,
      ...q,
    }, this));
  }

  isComplete(stepId: string) {
    return this.getProgressPercent(stepId) === 100
      || this.flow.indexOf(stepId) === this.flow.length - 1;
  }
}
