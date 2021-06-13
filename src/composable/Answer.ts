import { TAge }      from '../lib/types';
import { IAnswer }   from '../survey/IAnswer';
import { IQuestion } from '../survey/IStep';

export class Answer implements IAnswer {
  public readonly started: Date;

  finished?: Date;

  public birthdate?: string;

  public age?: TAge;

  public answers: IQuestion[] = [];

  constructor(form: Partial<Answer> = {}) {
    Object.assign(this, form);
    this.started = new Date();
  }
}
