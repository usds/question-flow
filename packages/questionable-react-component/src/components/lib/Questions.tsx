/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
import { Checkbox, Fieldset, Radio } from '@trussworks/react-uswds';
import { IRefCore }                  from '@usds.gov/questionable-core';
import { QuestionableConfig }        from '../../composable/QuestionableConfig';
import { IQuestionData }             from '../../survey/IStepData';
import { CSS_CLASS }                 from '../../lib/enums';

export class QuestionComposer {
  props: IQuestionData;

  config: QuestionableConfig;

  questionnaire: Questionnaire;

  gate: GateLogicCore;

  constructor(data: { config, gate, props, questionnaire }) {
    this = data;
  }

  /**
   * Generates a radio button given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private getRadio(
    answer: IRefCore,
  ): JSX.Element {
    const title   = this.gate.getString(answer);
    const handler = () => this.gate.updateForm(title, this.props, this.config);
    const id      = this.gate.getDomId(title, this.props);

    return (
      <Radio
        id={id}
        key={id}
        name={this.gate.getFieldSetName(this.props)}
        label={title}
        value={title}
        checked={this.gate.isSelected(title, this.props) === true}
        className={CSS_CLASS.MULTI_CHOICE}
        onChange={handler}
        onClick={handler}
        tile={this.config.questions?.showAnswerBorder === true}
      />
    );
  }

  /**
   * Gets a collection of radio buttons
   * @param props
   * @returns
   */
  public getRadios(): JSX.Element {
    return (
      <Fieldset
        legend={this.props.step.title}
        className={CSS_CLASS.MULTI_CHOICE_GROUP}
        legendStyle="srOnly"
      >
        {this.props.step.answers.map((a) => this.getRadio(a, this.props, this.config))}
      </Fieldset>
    );
  }

  /**
   * Generates a checkbox given a question definition
   * @param answer
   * @param props
   * @returns
   */
  protected getCheckbox(
    answer: IRefCore,
  ): JSX.Element {
    const title   = this.gate.getString(answer);
    const handler = () => this.gate.updateForm(title, this.props, this.config);
    const id      = this.gate.getDomId(title, this.props);

    return (
      <Checkbox
        id={id}
        key={id}
        name={this.gate.getFieldSetName(this.props)}
        label={title}
        value={title}
        checked={this.gate.isSelected(title, this.props) === true}
        className={CSS_CLASS.MULTI_SELECT}
        onChange={handler}
        onClick={handler}
        tile={this.config.questions?.showAnswerBorder === true}
      />
    );
  }

  /**
   * Gets a collection of checkboxes
   * @param props
   * @returns
   */
  public getCheckboxes(): JSX.Element {
    return (
      <Fieldset
        legend={this.props.step.title}
        className={CSS_CLASS.MULTI_SELECT_GROUP}
        legendStyle="srOnly"
      >
        {this.props.step.answers.map((a) => this.getCheckbox(a, this.props, this.config))}
      </Fieldset>
    );
  }
}
