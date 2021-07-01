/* eslint-disable no-param-reassign */
import { Checkbox, Fieldset, Radio } from '@trussworks/react-uswds';
import { merge }                     from 'lodash';
import { DateTime }                  from 'luxon';
import { getDateTime }               from '../../lib/date';
import { ACTION_TYPE, CSS_CLASS }    from '../../lib/enums';
import { TDateOfBirth }              from '../../lib/types';
import { IQuestion }                 from '../../survey';
import { IQuestionableConfig }       from '../../survey/IQuestionableConfig';
import { IQuestionData }             from '../../survey/IQuestionData';
import { IRef }                      from '../../survey/IRef';
import { Steps }                     from './Steps';

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
    // TODO: circle back and fix this logic. The problem is that our reducer is merging by KEY,
    // which in the case of arrays is the index, and the index will always be 0 if we're passing in new arrays
    // There are cleaner ways to do this.
    props.form.responses = props.form.responses || [];
    const value          = props.form.responses.find((r) => r.id === props.step.id);
    if (!value) {
      props.form.responses.push(props.step);
    } else {
      merge(value, props.step);
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
  private static isSelected(
    answer: string,
    props: IQuestionData,
  ): boolean | undefined {
    if (!props?.form) {
      return undefined;
    }
    const q: IQuestion | undefined = props.form.responses.find(
      (a: IQuestion) => a.id === props.step.id,
    );
    if (!q) {
      return undefined;
    }
    return Steps.isValid(props.form, props.step.id) && q.answer === answer;
  }

  /**
   * Generates a radio button given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private static getRadio(
    answer: IRef,
    props: IQuestionData,
    config: IQuestionableConfig,
  ): JSX.Element {
    const title   = Questions.getString(answer);
    const handler = () => Questions.updateForm(title, props);
    const id      = Steps.getDomId(title, props);

    return (
      <Radio
        id={id}
        key={id}
        name={Steps.getFieldSetName(props)}
        label={title}
        value={title}
        checked={Questions.isSelected(title, props) === true}
        className={CSS_CLASS.MULTI_CHOICE}
        onChange={handler}
        onClick={handler}
        tile={config.questions?.showAnswerBorder === true}
      />
    );
  }

  /**
   * Gets a collection of radio buttons
   * @param props
   * @returns
   */
  public static getRadios(
    props: IQuestionData,
    config: IQuestionableConfig,
  ): JSX.Element {
    return (
      <Fieldset
        legend={props.step.title}
        className={CSS_CLASS.MULTI_CHOICE_GROUP}
        legendStyle="srOnly"
      >
        {props.step.answers.map((a) => Questions.getRadio(a, props, config))}
      </Fieldset>
    );
  }

  private static getString(ref: Partial<IRef> = {}): string {
    if (!ref.title || ref.title === undefined || ref.title?.length <= 0) {
      throw new Error(`Value is required; ${ref.id} does not have a title`);
    }
    return ref.title;
  }

  /**
   * Generates a checkbox given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private static getCheckbox(
    answer: IRef,
    props: IQuestionData,
    config: IQuestionableConfig,
  ): JSX.Element {
    const title   = Questions.getString(answer);
    const handler = () => Questions.updateForm(title, props);
    const id      = Steps.getDomId(title, props);

    return (
      <Checkbox
        id={id}
        key={id}
        name={Steps.getFieldSetName(props)}
        label={title}
        value={title}
        checked={Questions.isSelected(title, props) === true}
        className={CSS_CLASS.MULTI_SELECT}
        onChange={handler}
        onClick={handler}
        tile={config.questions?.showAnswerBorder === true}
      />
    );
  }

  /**
   * Gets a collection of checkboxes
   * @param props
   * @returns
   */
  public static getCheckboxes(
    props: IQuestionData,
    config: IQuestionableConfig,
  ): JSX.Element {
    return (
      <Fieldset
        legend={props.step.title}
        className={CSS_CLASS.MULTI_SELECT_GROUP}
        legendStyle="srOnly"
      >
        {props.step.answers.map((a) => Questions.getCheckbox(a, props, config))}
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
