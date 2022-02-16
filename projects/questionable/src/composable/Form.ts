import { IForm }         from '../survey/IForm';
import { IQuestion }     from '../survey/IStep';
import { Questionnaire } from './Questionnaire';
import { TAge }          from '../lib/types';

interface IFormConstructor {
  form?: Partial<Form>;
  questionnaire?: Questionnaire;
}

export class Form implements IForm {
  public readonly started: Date;

  #finished?: Date;

  public birthdate?: string;

  public age?: TAge;

  public get finish(): Date | undefined {
    return this.#finished;
  }

  public set finish(date: Date | undefined) {
    if (date) {
      this.#finished = date;
    }
  }

  public responses: IQuestion[] = [];

  constructor(data: IFormConstructor = { form: {} }) {
    const { form, questionnaire } = data;
    Object.assign(this, form);
    this.started = new Date();
    if (questionnaire?.config.events.onInit) {
      questionnaire.config.events.onInit(this);
    }
  }
}
