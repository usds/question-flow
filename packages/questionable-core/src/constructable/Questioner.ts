import { merge, values }                     from 'lodash';
import { DateTime }                          from 'luxon';
import { eventedCore }                       from '../state/pubsub';
import { OP_TYPE, QUESTION_TYPE, STEP_TYPE } from '../util/enums';
import { getDateTime }                       from '../util/date';
import { FormCore }                          from '../composable/FormCore';
import { QuestionCore }                      from '../composable/StepCore';
import { IQuestionCore }                     from '../survey/IStepCore';
import { TDateOfBirthCore }                  from '../util/types';
import { TQForm, TSForm }                    from './types';

const isValid = ({ step, form }: TSForm): boolean => {
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
      ret =          ret
          && (q.exitRequirements?.every(
            (r) => r.minAge && years >= r.minAge.years,
          )
            || true);
      break;
    case STEP_TYPE.MULTIPLE_CHOICE:
      ret =          ret
          && q.answer !== undefined
          && answers?.find((x) => x.title === q.answer) !== undefined;
      break;
    default:
      // ret === true
      break;
  }
  return ret;
};

/**
 * Determines if the answer is valid and selected
 * @param answer
 * @param props
 * @returns
 */
const isSelected = ({ answer, question, form }: TQForm & {answer: string}): boolean | undefined => {
  if (!form) {
    return undefined;
  }
  const q = form.responses.find((a: IQuestionCore) => a.id === question.id);
  if (!q) {
    return undefined;
  }
  return isValid({ form, step: question }) && q.answer === answer;
};

const toString = ({ question }: {question: QuestionCore}): string => {
  if (!question.title || question.title === undefined || question.title?.length <= 0) {
    throw new Error(`Value is required; ${question.id} does not have a title`);
  }
  return question.title;
};

/**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
const getBirthdate = ({ question, form }: TQForm): DateTime | undefined => {
  if (!(question instanceof QuestionCore)) return undefined;

  if (question.answer) {
    return getDateTime(question.answer);
  }
  if (form?.birthdate) {
    return getDateTime(form.birthdate);
  }
  return undefined;
};

/**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
const updateForm = ({ answer, question, form }: TQForm & {answer: string}): void => {
  if (answer?.length > 0) {
    merge(question, { answer });
  }
  // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
  // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
  // There are cleaner ways to do this.
  // eslint-disable-next-line no-param-reassign
  form.responses = form.responses || [];
  const value    = form.responses.find((r) => r.id === question.id);
  if (!value) {
    form.responses.push(question);
  } else {
    merge(value, question);
  }
  eventedCore.publish({
    event: { answer, props: question, question: question.id },
    type:  'answer',
  });
  form.reduce({
    type:  OP_TYPE.UPDATE,
    value: form,
  });
};

/**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
const toBirthdate = ({ question, dob } : {
  dob: TDateOfBirthCore,
  question: QuestionCore
}): string | undefined => {
  if (question.type !== QUESTION_TYPE.DOB) {
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
    return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${
      dob.year
    }`;
  }
  return undefined;
};

class Questioner {
  #question: QuestionCore;

  #form: FormCore;

  constructor({ question, form }: TQForm) {
    this.#question = question;
    this.#form     = form;
  }

  public updateForm({ answer }: {answer: string}): void {
    return updateForm({ answer, form: this.#form, question: this.#question });
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  public isSelected({ answer }: {answer: string}) {
    return isSelected({ answer, form: this.#form, question: this.#question });
  }

  public toString() {
    return toString({ question: this.#question });
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  public getBirthdate() {
    return getBirthdate({ form: this.#form, question: this.#question });
  }

  /**
   * Converts a Date of Birth type into a string
   * @param dob
   * @returns
   */
  public toBirthdate(
    dob: TDateOfBirthCore,
  ): string | undefined {
    return toBirthdate({ dob, question: this.#question });
  }

  public isValid(): boolean {
    return isValid({ form: this.#form, step: this.#question });
  }
}

export {
  getBirthdate,
  isSelected,
  isValid,
  Questioner,
  toBirthdate,
  toString,
  updateForm,
};
