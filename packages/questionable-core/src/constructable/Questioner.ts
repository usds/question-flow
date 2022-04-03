import { merge, values } from 'lodash';
import { DateTime }      from 'luxon';
import { eventedCore }   from '../state/pubsub';
import {
  ACTION_TYPE,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../util/enums';
import { getDateTime }            from '../util/date';
import { FormCore }               from '../composable/FormCore';
import { QuestionCore, StepCore } from '../composable/StepCore';
import { IQuestionCore }          from '../survey/IStepCore';
import { TDateOfBirthCore }       from '../util/types';

export class Questioner {
  /**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
  public static updateForm(
    answer: string,
    step: QuestionCore,
    form: FormCore,
  ): void {
    if (answer?.length > 0) {
      merge(step, { answer });
    }
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    // eslint-disable-next-line no-param-reassign
    form.responses = form.responses || [];
    const value    = form.responses.find((r) => r.id === step.id);
    if (!value) {
      form.responses.push(step);
    } else {
      merge(value, step);
    }
    eventedCore.publish({ event: { answer, props: step, step: step.id }, type: 'answer' });
    Questioner.stepReducer(form, {
      type:  ACTION_TYPE.UPDATE,
      value: { ...form },
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
    step: QuestionCore,
    form: FormCore,
  ): boolean | undefined {
    if (!form) {
      return undefined;
    }
    const q = form.responses.find(
      (a: IQuestionCore) => a.id === step.id,
    );
    if (!q) {
      return undefined;
    }
    return Questioner.isValid(step, form) && q.answer === answer;
  }

  public static toString(step: QuestionCore): string {
    if (!step.title || step.title === undefined || step.title?.length <= 0) {
      throw new Error(`Value is required; ${step.id} does not have a title`);
    }
    return step.title;
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  public static getBirthdate(
    step: QuestionCore,
    form: FormCore,
  ): DateTime | undefined {
    if (!(step instanceof QuestionCore)) return undefined;

    if (step.answer) {
      return getDateTime(step.answer);
    }
    if (form?.birthdate) {
      return getDateTime(form.birthdate);
    }
    return undefined;
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  public static toBirthdate(step: QuestionCore, dob: TDateOfBirthCore): string | undefined {
    if (step.type !== QUESTION_TYPE.DOB) {
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

  public static isValid(step: StepCore, form: FormCore): boolean {
    const q = form.responses.find((a) => a?.id === step.id);
    let ret = true;
    if (!q) {
      ret = false;
    }
    const answers = values(q?.answers);
    let years     = 0;
    switch (q?.type) {
      case STEP_TYPE.DOB:
        years = form?.age?.years || 0;
        if (years <= 0) {
          ret = false;
        }
        if (!q?.exitRequirements || q.exitRequirements.length === 0) {
          // ret === true
        }
        ret = ret
          && (q.exitRequirements?.every((r) => r.minAge && years >= r.minAge.years) || true);
        break;
      case STEP_TYPE.MULTIPLE_CHOICE:
        ret = ret && (
          q.answer !== undefined
          && answers?.find((x) => x.title === q.answer) !== undefined
        );
        break;
      default:
        // ret === true
        break;
    }
    return ret;
  }

  /**
   * Merges the form's answer state as the user progresses through the survey
   * @param previousState
   * @param action
   * @returns
   */
  public static dispatch(
    previousState: FormCore,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: { type: ACTION_TYPE; value: any },
  ) {
  // Action should never be null,
  // except when we attempt to storybook/test individual components in isolation
    switch (action?.type) {
      case ACTION_TYPE.RESET:
        return new FormCore();

      case ACTION_TYPE.UPDATE:
        return new FormCore(merge(
          {
            ...previousState,
          },
          {
            ...action.value,
          },
        ));

        // Effectively a noop that triggers a re-render of the page
      case ACTION_TYPE.RERENDER:
        return new FormCore({
          ...previousState,
        });

      default:
        return previousState;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static stepReducer(form: FormCore, action: { type: ACTION_TYPE; value: any }) {
    return Questioner.dispatch(form, action);
  }
}

export const {
  stepReducer,
  isValid,
  dispatch,
  getBirthdate,
  toBirthdate,
  toString,
  updateForm,
} = Questioner;
