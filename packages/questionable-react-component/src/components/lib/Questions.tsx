/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
import {
  Checkbox,
  Fieldset,
  Radio,
} from '@trussworks/react-uswds';
import {
  GateLogicCore,
  QuestionableConfigCore,
  QuestionnaireCore,
  TStepReducerAction,
  TDateOfBirthCore,
  FormCore,
  updateForm,
  isSelected,
  getBirthdate,
  toBirthdate,
} from '@usds.gov/questionable-core';
import { Question }  from '../../composable';
import { CSS_CLASS } from '../../lib/enums';

export class QuestionComposer {
  question!: Question;

  config!: QuestionableConfigCore;

  questionnaire!: QuestionnaireCore;

  gate!: GateLogicCore;

  constructor({
    question, gate,
  }: {
    gate: GateLogicCore, question: Question,
  }) {
    this.question      = question;
    this.gate          = gate;
    this.questionnaire = gate.questionnaire;
    this.config        = gate.config;
  }

  public updateForm(title: string) {
    return updateForm({ answer: title, form: this.gate.form, question: this.question });
  }

  public isSelected(title: string) {
    return isSelected({ answer: title, form: this.gate.form, question: this.question }) === true;
  }

  /**
   * Generates a radio button given a question definition
   * @param answer
   * @param props
   * @returns
   */
  private getRadio(
    { answer }: {answer: {title: string}},
  ): JSX.Element {
    const { title } = answer;
    const handler   = () => this.updateForm(title);
    const id        = this.question.getDomId(title);

    return (
      <Radio
        id={id}
        key={id}
        name={this.question.getFieldSetName()}
        label={title}
        value={title}
        checked={this.isSelected(title)}
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
        legend={this.question.title}
        className={CSS_CLASS.MULTI_CHOICE_GROUP}
        legendStyle="srOnly"
      >
        {this.question.answers.map((answer) => this.getRadio({ answer }))}
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
    { answer }: {answer: {title: string}},
  ): JSX.Element {
    const { title } = answer;
    const handler   = () => this.updateForm(title);
    const id        = this.question.getDomId(title);

    return (
      <Checkbox
        id={id}
        key={id}
        name={this.question.getFieldSetName()}
        label={title}
        value={title}
        checked={this.isSelected(title)}
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
        legend={this.question.title}
        className={CSS_CLASS.MULTI_SELECT_GROUP}
        legendStyle="srOnly"
      >
        {this.question.answers.map((answer) => this.getCheckbox({ answer }))}
      </Fieldset>
    );
  }

  public getBirthdate() {
    return getBirthdate({ form: this.gate.form, question: this.question });
  }

  public toBirthdate(dob: TDateOfBirthCore) {
    return toBirthdate({ dob, question: this.question });
  }

  public dispatchForm(action: TStepReducerAction) {
    return FormCore.reducer(this.gate.form, action);
  }
}
