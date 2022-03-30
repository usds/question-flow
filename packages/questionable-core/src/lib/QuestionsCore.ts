import { merge }                  from 'lodash';
import { DateTime }               from 'luxon';
import { QuestionableConfigCore } from '../composable/QuestionableConfigCore';
import { IQuestionCore }          from '../survey';
import { IQuestionDataCore }      from '../survey/IQuestionDataCore';
import { IRefCore }               from '../survey/IRefCore';
import { getDateTime }            from '../util/date';
import { ACTION_TYPE }            from '../util/enums';
import { TDateOfBirthCore }       from '../util/types';
import { StepsCore }              from './StepsCore';

/**
 * Static utility methods for question components
 */
export abstract class QuestionsCore {
  /**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
  public static updateForm(
    answer: string,
    props: IQuestionDataCore,
    config: QuestionableConfigCore = new QuestionableConfigCore(),
  ): void {
    if (answer?.length > 0) {
      Object.assign(props.step, { answer });
    }
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    // eslint-disable-next-line no-param-reassign
    props.form.responses = props.form.responses || [];
    const value          = props.form.responses.find((r) => r.id === props.step.id);
    if (!value) {
      props.form.responses.push(props.step);
    } else {
      merge(value, props.step);
    }
    if (config.events?.answer) {
      config.events.answer({ answer, props, step: props.step.id });
    }
    return props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: { ...props.form },
    });
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  protected static isSelected(
    answer: string,
    props: IQuestionDataCore,
  ): boolean | undefined {
    if (!props?.form) {
      return undefined;
    }
    const q: IQuestionCore | undefined = props.form.responses.find(
      (a: IQuestionCore) => a.id === props.step.id,
    );
    if (!q) {
      return undefined;
    }
    return StepsCore.isValid(props.form, props.step.id) && q.answer === answer;
  }

  protected static getString(ref: Partial<IRefCore> = {}): string {
    if (!ref.title || ref.title === undefined || ref.title?.length <= 0) {
      throw new Error(`Value is required; ${ref.id} does not have a title`);
    }
    return ref.title;
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  public static getBirthdate(props: IQuestionDataCore): DateTime | undefined {
    if (props.step?.answer) {
      return getDateTime(props.step.answer);
    }
    if (props.form?.birthdate) {
      return getDateTime(props.form.birthdate);
    }
    return undefined;
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  public static toBirthdate(dob: TDateOfBirthCore): string | undefined {
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
