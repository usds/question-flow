/* eslint-disable import/no-cycle */
import {
  matches,
  QuestionnaireCore,
} from '@usds.gov/questionable-core';
import { Question } from './Question';

export class Questionnaire extends QuestionnaireCore {
  #questions: Question[];

  constructor(data: Partial<Questionnaire>) {
    super(data);
    this.#questions = data.questions?.map((q, i) => Question.create(q, i)) || [];
  }

  public get questions(): Question[] {
    return this.#questions;
  }

  public existsIn(data: Question): boolean {
    if (data instanceof Question) {
      return this.#questions.some((q) => q === data || matches(q.title, data.title));
    }
    return super.existsIn(data);
  }

  public add(data: Question): QuestionnaireCore {
    const exists = this.existsIn(data);
    if (!exists) {
      if (data instanceof Question) {
        this.#questions.push(data);
      } else {
        super.add(data);
      }
    }
    return this;
  }
}
