import { TAgeCore, FormCore } from '@usds.gov/questionable-core';
import { IForm }              from '../survey/IForm';
import { IQuestion }          from '../survey/IStep';
import { Questionnaire }      from './Questionnaire';

interface IFormConstructor {
  form?: Partial<Form>;
  questionnaire?: Questionnaire;
}

export class Form extends FormCore implements IForm {
  public readonly started: Date;

  #finished?: Date;

  public birthdate?: string;

  public age?: TAgeCore;

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
    super(data);
    const { form, questionnaire } = data;
    Object.assign(this, form);
    this.started = new Date();
    if (questionnaire?.config.events.onInit) {
      questionnaire.config.events.onInit(this);
    }
  }
}
