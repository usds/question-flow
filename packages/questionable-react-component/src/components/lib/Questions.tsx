/* eslint-disable no-param-reassign */
import { Checkbox, Fieldset, Radio } from '@trussworks/react-uswds';
import { QuestionsCore }             from '@usds.gov/questionable-core';
import { QuestionableConfig }        from '../../composable/QuestionableConfig';
import { IQuestionData }             from '../../survey/IQuestionData';
import { IRef }                      from '../../survey/IRef';
import { Steps }                     from './Steps';
import { CSS_CLASS }                 from '../../lib/enums';

/**
 * Static utility methods for question components
 */
export abstract class Questions extends QuestionsCore {
  /**
   * Generates a radio button given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private static getRadio(
    answer: IRef,
    props: IQuestionData,
    config: QuestionableConfig,
  ): JSX.Element {
    const title   = Questions.getString(answer);
    const handler = () => Questions.updateForm(title, props, config);
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
    config: QuestionableConfig,
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

  /**
   * Generates a checkbox given a question definition
   * @param answer
   * @param props
   * @returns
   */
  protected static getCheckbox(
    answer: IRef,
    props: IQuestionData,
    config: QuestionableConfig,
  ): JSX.Element {
    const title   = Questions.getString(answer);
    const handler = () => Questions.updateForm(title, props, config);
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
    config: QuestionableConfig,
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
}
