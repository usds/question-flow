/* eslint-disable no-param-reassign */
import { Radio }                  from '@trussworks/react-uswds';
import { DateTime }               from 'luxon';
import { ReactNode }              from 'react';
import { DATE_UNIT, ACTION_TYPE } from '../../lib/enums';
import { Answer }                 from '../../survey/Answer';
import { IQuestionData }          from '../../survey/IStepData';
import { Steps }                  from './Steps';
import { getDateTime }            from '../../lib/date';

/**
 * Static utility methods for question components
 */
export abstract class Questions {
  /**
   * Updates the form with the current selected answer(s)
   * @param answer
   * @param props
   * @returns
   */
  static updateForm(answer: string, props: IQuestionData): void {
    Object.assign(props.step, { answer });
    const value = {
      answers: {
        [props.step.id]: props.step,
      },
    };
    return props.dispatchForm({
      type: ACTION_TYPE.UPDATE,
      value,
    });
  }

  /**
   * Generates a radio button given a question definition
   * @param answer
   * @param props
   * @returns
   */
  static getRadio(answer: string, props: IQuestionData): ReactNode {
    const handler = () => Questions.updateForm(answer, props);
    const id      = Steps.getDomId(answer, props);

    return (
      <Radio
        id={id}
        key={id}
        name={Steps.getFieldSetName(props)}
        label={answer}
        value={answer}
        checked={Questions.isSelected(answer, props) === true}
        className={'multipleChoice'}
        onChange={handler}
        onClick={handler}
      />
    );
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  static isSelected(answer: string, props: IQuestionData): boolean | undefined {
    if (!props || !props.form) return undefined;
    const q = props.form.answers[props.step.id];
    return Answer.isValid(props.form, props.step.id) && q.answer === answer;
  }

  /**
   * Gets a collection of radio buttons
   * @param props
   * @returns
   */
  static getRadios(props: IQuestionData): ReactNode {
    const ret: ReactNode[] = [];
    Object.keys(props.step.answers).forEach((a) => {
      ret.push(Questions.getRadio(props.step.answers[+a], props));
    });
    return ret;
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  static getBirthdate(props: IQuestionData): DateTime | undefined {
    if (props.form?.birthdate) {
      return getDateTime(props.form.birthdate);
    }
    return undefined;
  }

  /**
   * Gets the default value for a unit of time
   * @param props
   * @param unit
   * @returns
   */
  static getDateUnitDefaultValue(props: IQuestionData, unit: DATE_UNIT): string | undefined {
    const dt = Questions.getBirthdate(props);
    if (!dt) {
      return undefined;
    }
    switch (unit) {
      case DATE_UNIT.month:
        return `${dt.month}`.padStart(2, '0');
      case DATE_UNIT.day:
        return `${dt.day}`.padStart(2, '0');
      case DATE_UNIT.year:
        return `${dt.year}`;
      default:
        throw new Error(`Unit ${unit} is not valid`);
    }
  }
}
