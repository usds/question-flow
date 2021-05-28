import { values }               from 'lodash';
import { STEP_TYPE }            from '../lib/enums';
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

  public static isValid(form: IAnswer, question: string): boolean {
    if (!form.answers[question]) return false;
    const q       = form.answers[question];
    const answers = values(q.answers);
    switch (q.type) {
      case STEP_TYPE.DOB:
        return undefined !== form?.age?.years && form.age.years > 0;
      case STEP_TYPE.MULTIPLE_CHOICE:
        return q.answer !== undefined && answers?.indexOf(q.answer) !== -1;
      // case STEP_TYPE.LANDING || STEP_TYPE.RESULTS || STEP_TYPE.SUMMARY:
      //   return true;
      default:
        return true;
    }
  }
}
