import { kebabCase, values }                   from 'lodash';
import { Questionnaire }                       from '../../composable/Questionnaire';
import { DIRECTION, QUESTION_TYPE, STEP_TYPE } from '../../lib/enums';
import { IForm }                               from '../../survey/IForm';
import { IQuestionData }                       from '../../survey/IQuestionData';
import { IStepData }                           from '../../survey/IStepData';

export abstract class Steps {
  public static goToStep(step: string, props: IStepData): void {
    props.wizard.goToStep(step);
  }

  public static goToNextStep(
    props: IStepData,
    questionnaire: Questionnaire,
  ): void {
    const step = questionnaire.getNextStep(props);
    const dir  = DIRECTION.FORWARD;
    questionnaire.config.events.page({ dir, props, step });
    Steps.goToStep(step, props);
  }

  public static goToPrevStep(
    props: IStepData,
    questionnaire: Questionnaire,
  ): void {
    const step = questionnaire.getPreviousStep(props);
    const dir  = DIRECTION.BACKWARD;
    questionnaire.config.events.page({ dir, props, step });
    Steps.goToStep(step, props);
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
    return Steps.isValid(props.form, props.step?.id);
  }

  public static isValid(form: IForm, questionId: string): boolean {
    const q = form.responses.find((a) => a?.id === questionId);
    if (!q) return false;
    const answers = values(q.answers);
    switch (q.type) {
      case STEP_TYPE.DOB:
        return undefined !== form?.age?.years && form.age.years > 0;
      case STEP_TYPE.MULTIPLE_CHOICE:
        return (
          q.answer !== undefined
          && answers?.find((x) => x.title === q.answer) !== undefined
        );
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
