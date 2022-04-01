import { merge }            from 'lodash';
import { DateTime }         from 'luxon';
import { QuestionDataCore } from '../composable/DataCore';
import { QuestionCore }     from '../composable/QuestionCore';
import { RefCore }          from '../composable/RefCore';
import { getDateTime }      from '../util/date';
import { ACTION_TYPE }      from '../util/enums';
import { TDateOfBirthCore } from '../util/types';
import { StepsCore }        from './HelpersStepsCore';

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
    step: QuestionCore,
  ): void {
    if (answer?.length > 0) {
      Object.assign(step, { answer });
    }
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    // eslint-disable-next-line no-param-reassign
    step.form.responses = step.form.responses || [];
    const value         = step.form.responses.find((r) => r.id === step.id);
    if (!value) {
      step.form.responses.push(step);
    } else {
      merge(value, step);
    }
    step.questionnaire.config.events?.answer({ answer, responses: step.form.responses, step });
    step.form.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: { ...step.form },
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
    props: QuestionDataCore,
  ): boolean | undefined {
    if (!props?.form) {
      return undefined;
    }
    const q: QuestionCore | undefined = props.form.responses.find(
      (a: QuestionCore) => a.id === props.step.id,
    );
    if (!q) {
      return undefined;
    }
    return StepsCore.isValid(props.form, props.step.id) && q.answer === answer;
  }

  protected static getString(ref: Partial<RefCore> = {}): string {
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
  public static getBirthdate(props: QuestionDataCore): DateTime | undefined {
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
