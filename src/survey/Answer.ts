import { TAge }                 from '../lib/types';
import { IAnswer, IAnswerList } from './IAnswer';

export class Answer implements IAnswer {
  public readonly started: Date;

  finished?: Date;

  public birthdate?: string;

  public age?: TAge;

  public answers: IAnswerList = {};

  constructor(form: Partial<Answer> = {}) {
    Object.assign(this, form);
    this.started = new Date();
  }
}
