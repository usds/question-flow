import { TAge }      from '../lib/types';
import { IForm }     from '../survey/IForm';
import { IQuestion } from '../survey/IQuestion';

export class Answer implements IForm {
  public readonly started: Date;

  finished?: Date;

  public birthdate?: string;

  public age?: TAge;

  public responses: IQuestion[] = [];

  constructor(form: Partial<Answer> = {}) {
    Object.assign(this, form);
    this.started = new Date();
  }
}
