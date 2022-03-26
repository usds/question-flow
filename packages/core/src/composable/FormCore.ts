import { IFormCore }         from '../survey/IFormCore';
import { IQuestionCore }     from '../survey/IStepCore';
import { QuestionnaireCore } from './QuestionnaireCore';
import { TAgeCore }          from '../lib/types';

export interface IFormConstructorCore {
  form?: Partial<IFormCore>;
  questionnaire?: QuestionnaireCore;
}

export class FormCore implements IFormCore {
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

  public responses: IQuestionCore[] = [];

  constructor(data: IFormConstructorCore = { form: {} }) {
    const { form, questionnaire } = data;
    Object.assign(this, form);
    this.started = new Date();
    if (questionnaire?.config.events.onInit) {
      questionnaire.config.events.onInit(this);
    }
  }
}
