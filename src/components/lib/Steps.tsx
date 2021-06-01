import { kebabCase, values }        from 'lodash';
import { QUESTION_TYPE, STEP_TYPE } from '../../lib/enums';
import { IAnswer }                  from '../../survey/IAnswer';
import { IQuestionData, IStepData } from '../../survey/IStepData';
import { Questionnaire }            from '../../survey/Questionnaire';

export abstract class Steps {
  public static goToStep(step: string, props: IStepData): void {
    props.wizard.goToStep(step);
  }

  public static goToNextStep(props: IStepData, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getNextStep(props), props);
  }

  public static goToPrevStep(props: IStepData, questionnaire: Questionnaire): void {
    Steps.goToStep(questionnaire.getPreviousStep(props), props);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public static isNextEnabled(props: IStepData): boolean {
    if (!props?.step) throw new Error('This survery is not defined');

    if (props.stepId === STEP_TYPE.LANDING) return true;

    if (props.stepId === STEP_TYPE.SUMMARY) return true;

    if (!props.form) return false;
    // KLUDGE Alert: this is not an elegant way to solve this
    if (props.step?.type === QUESTION_TYPE.DOB) {
      return undefined !== props.form?.age?.years && props.form.age.years >= 0;
    }
    return Steps.isValid(props.form, props.step.id);
  }

  public static isValid(form: IAnswer, question: string): boolean {
    if (!form.answers[question]) return false;
    const q       = form.answers[question];
    const answers = values(q.answers);
    switch (q.type) {
      case STEP_TYPE.DOB:
        return undefined !== form?.age?.years && form.age.years > 0;
      case STEP_TYPE.MULTIPLE_CHOICE:
        return q.answer !== undefined && answers?.indexOf(q.answer) !== -1;
      // case STEP_TYPE.LANDING || STEP_TYPE.RESULTS || STEP_TYPE.SUMMARY:
      //   return true;
      default:
        return true;
    }
  }

  public static getFieldSetName(props: IQuestionData): string {
    return kebabCase(props.step.title);
  }

  public static getDomId(answer: string, props: IQuestionData): string {
    const name = Steps.getFieldSetName(props);
    return `${name}-${kebabCase(answer)}`;
  }
}
