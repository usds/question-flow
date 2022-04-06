/* eslint-disable import/no-cycle */
import {
  IQuestionnaireCore,
  QuestionnaireCore,
} from '@usds.gov/questionable-core';
import { Question } from './Question';

export class Questionnaire extends QuestionnaireCore implements IQuestionnaireCore {
  #questions: Question[];

  constructor(data: Partial<Questionnaire>) {
    super(data);
    this.#questions = data.questions?.map((q, i) => Question.create(q, i)) || [];
  }

  public get questions(): Question[] {
    return this.#questions;
  }

  // isComplete(stepId: string) {
  //   return this.getProgressPercent(stepId) === 100
  //     || this.flow.indexOf(stepId) === this.flow.length - 1;
  // }
}
