import { kebabCase }                from 'lodash';
import { QUESTION_TYPE, STEP_TYPE } from '../../lib/enums';
import { Answer }                   from '../../survey/Answer';
import { IQuestionData, IStepData } from '../../survey/IStepData';
import { Questionnaire }            from '../../survey/Questionnaire';

export abstract class Steps {
  static goToStep(step: string, props: IStepData): void {
    props.wizard.goToStep(step);
  }

  static goToNextStep(props: IStepData, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getNextStep(props), props);
  }

  static goToPrevStep(props: IStepData, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getPreviousStep(props), props);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  static isNextEnabled(props: IStepData): boolean {
    if (!props?.step) throw new Error('This survery is not defined');

    if (props.stepId === STEP_TYPE.LANDING) return true;

    if (props.stepId === STEP_TYPE.SUMMARY) return true;

    if (!props.form) return false;
    // KLUDGE Alert: this is not an elegant way to solve this
    if (props.step?.type === QUESTION_TYPE.DOB) {
      return undefined !== props.form?.age?.years && props.form.age.years >= 0;
    }
    return Answer.isValid(props.form, props.step.id);
  }

  static getFieldSetName(props: IQuestionData): string {
    return kebabCase(props.step.title);
  }

  static getDomId(answer: string, props: IQuestionData): string {
    const name = Steps.getFieldSetName(props);
    return `${name}-${kebabCase(answer)}`;
  }
}
