/* eslint-disable no-param-reassign */
import { Checkbox, Fieldset, Radio } from '@trussworks/react-uswds';
import { DateTime }                  from 'luxon';
import { ACTION_TYPE, CSS_CLASS }               from '../../lib/enums';
import { IQuestionData }             from '../../survey/IStepData';
import { Steps }                     from './Steps';
import { getDateTime }               from '../../lib/date';
import { TDateOfBirth }              from '../../lib/types';

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
  private static updateForm(answer: string, props: IQuestionData): void {
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
  private static getRadio(answer: string, props: IQuestionData): JSX.Element {
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
        className={CSS_CLASS.MULTI_CHOICE}
        onChange={handler}
        onClick={handler}
        tile={true}
      />
    );
  }

  /**
   * Determines if the answer is valid and selected
   * @param answer
   * @param props
   * @returns
   */
  private static isSelected(answer: string, props: IQuestionData): boolean | undefined {
    if (!props?.form) {
      return undefined;
    }
    const q = props.form.answers[props.step.id];
    return Steps.isValid(props.form, props.step.id) && q.answer === answer;
  }

  /**
   * Gets a collection of radio buttons
   * @param props
   * @returns
   */
  public static getRadios(props: IQuestionData): JSX.Element {
    return (<Fieldset
      legend={props.step.title}
      className={CSS_CLASS.MULTI_CHOICE_GROUP}
      legendStyle="srOnly"
    >
      {
        Object.keys(props.step.answers).map((a) =>
          Questions.getRadio(props.step.answers[+a], props))
      }
    </Fieldset>);
  }

  /**
   * Generates a checkbox given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private static getCheckbox(answer: string, props: IQuestionData): JSX.Element {
    const handler = () => Questions.updateForm(answer, props);
    const id      = Steps.getDomId(answer, props);

    return (
      <Checkbox
        id={id}
        key={id}
        name={Steps.getFieldSetName(props)}
        label={answer}
        value={answer}
        checked={Questions.isSelected(answer, props) === true}
        className={CSS_CLASS.MULTI_SELECT}
        onChange={handler}
        onClick={handler}
      />
    );
  }

  /**
 * Gets a collection of checkboxes
 * @param props
 * @returns
 */
  public static getCheckboxes(props: IQuestionData): JSX.Element {
    return (
      <Fieldset
        legend={props.step.title}
        className={CSS_CLASS.MULTI_SELECT_GROUP}
        legendStyle="srOnly"
      >
      {
        Object.keys(props.step.answers).map((a) =>
          Questions.getCheckbox(props.step.answers[+a], props))
      }
      </Fieldset>
    );
  }

  /**
   * Gets a birthdate's DateTime from a form
   * @param props
   * @returns
   */
  public static getBirthdate(props: IQuestionData): DateTime | undefined {
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
  public static toBirthdate(dob: TDateOfBirth): string | undefined {
    if (dob.month && dob.day && dob.year) {
      return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${
        dob.year
      }`;
    }
    return undefined;
  }
}
