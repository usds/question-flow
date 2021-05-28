/* eslint-disable react-hooks/rules-of-hooks */
import { Radio } from '@trussworks/react-uswds';
import { kebabCase } from 'lodash';
import { ReactNode } from 'react';
import { Answer } from '../../survey/Answer';
import { IStep } from '../../survey/IStep';
import { Questionnaire } from '../../survey/Questionnaire';

export class Steps {
  static goToStep(step: string, props: IStep): void {
    props.wizard.goToStep(step);
  }

  static goToNextStep(props: IStep, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getNextStep(props), props);
  }

  static goToPrevStep(props: IStep, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getPreviousStep(props), props);
  }

  static isNextDisabled(props: IStep): boolean {
    return !Questionnaire.isNextEnabled(props);
  }

  static updateForm(answer: string, props: IStep): void {
    Object.assign(props.question, { answer });
    const value = {
      answers: {
        [props.question.id]: props.question,
      },
    };
    return props.dispatchForm({
      type: 'UPDATE',
      value,
    });
  }

  static getSelected(answer: string, props: IStep): boolean | undefined {
    if (!props || !props.form) return undefined;
    return Answer.isSelected(props.form, props.question.id, answer);
  }

  static getFieldSetName(props: IStep): string {
    return kebabCase(props.question.questionText);
  }

  static getDomId(answer: string, props: IStep): string {
    const name = Steps.getFieldSetName(props);
    return `${name}-${kebabCase(answer)}`;
  }

  static getRadio(answer: string, props: IStep): ReactNode {
    const handler = () => Steps.updateForm(answer, props);
    const id = Steps.getDomId(answer, props);

    return (
      <Radio
        id={id}
        key={id}
        name={Steps.getFieldSetName(props)}
        label={answer}
        value={answer}
        checked={Steps.getSelected(answer, props) === true}
        className={'multipleChoice'}
        onChange={handler}
        onClick={handler}
      />
    );
  }

  static getRadios(props: IStep): ReactNode {
    const ret: ReactNode[] = [];
    Object.keys(props.question.answers).forEach((a) => {
      ret.push(Steps.getRadio(props.question.answers[+a], props));
    });
    return ret;
  }
}
