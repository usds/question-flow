/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { DateTime }    from 'luxon';
import { eventedCore } from '../state';
import {
  IQuestionCore,
  IRefCore,
  IBranchCore,
  ISectionCore,
}        from '../survey';
import {
  QUESTION_TYPE,
  ACTION_TYPE,
  getDateTime,
  TDateOfBirthCore,
} from '../util';
import { stepReducer }         from './FormCore';
import { StepCore, TStepCtor } from './StepCore';

export type TQuestionCoreCtor = TStepCtor & Partial<IQuestionCore>;

export class QuestionCore extends StepCore implements IQuestionCore {
  type: QUESTION_TYPE;

  answers: IRefCore[] = [];

  branch: Partial<IBranchCore> = {};

  section: Partial<ISectionCore> = {};

  constructor(data: TQuestionCoreCtor) {
    super(data);
    merge(this, data);
    this.type = data.type;
    this.id   = data.id;
  }

  #answer = '';

  #answers: string[] = [];

  public get answer() {
    return this.#answer;
  }

  public set answer(val: string) {
    this.#answers.push(val);
    this.#answer = val;
  }

  public getAnswerHistory() {
    return [...this.#answers];
  }

  /**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
  updateForm(
    answer: string,
  ): void {
    if (answer?.length > 0) {
      merge(this, { answer });
    }
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    // eslint-disable-next-line no-param-reassign
    this.form.responses = this.form.responses || [];
    const value         = this.form.responses.find((r) => r.id === this.id);
    if (!value) {
      this.form.responses.push(this);
    } else {
      merge(value, this);
    }
    eventedCore.publish({ event: { answer, props: this, step: this.id }, type: 'answer' });
    stepReducer(this.form, {
      type:  ACTION_TYPE.UPDATE,
      value: { ...this.form },
    });
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  protected isSelected(
    answer: string,
  ): boolean | undefined {
    if (!this?.form) {
      return undefined;
    }
    const q: IQuestionCore | undefined = this.form.responses.find(
      (a: IQuestionCore) => a.id === this.id,
    );
    if (!q) {
      return undefined;
    }
    return this.isValid() && q.answer === answer;
  }

  toString(): string {
    if (!this.title || this.title === undefined || this.title?.length <= 0) {
      throw new Error(`Value is required; ${this.id} does not have a title`);
    }
    return this.title;
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  getBirthdate(): DateTime | undefined {
    if (this.answer) {
      return getDateTime(this.answer);
    }
    if (this.form?.birthdate) {
      return getDateTime(this.form.birthdate);
    }
    return undefined;
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  toBirthdate(dob: TDateOfBirthCore): string | undefined {
    if (this.type !== QUESTION_TYPE.DOB) {
      return undefined;
    }
    if (dob.month && dob.day && dob.year) {
      if (+dob.month < 1 || +dob.month > 12) {
        return undefined;
      }
      if (+dob.day < 1 || +dob.day > 31) {
        return undefined;
      }
      if (+dob.year < 1900 || +dob.year > new Date().getFullYear()) {
        return undefined;
      }
      return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${dob.year}`;
    }
    return undefined;
  }
}
