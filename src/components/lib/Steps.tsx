import { kebabCase, values }        from 'lodash';
import { QuestionableConfig }       from '../../composable/Config';
import { QUESTION_TYPE, STEP_TYPE } from '../../lib/enums';
import { Questionnaire }            from '../../composable/Questionnaire';
import { IAnswer }                  from '../../survey/IAnswer';
import { IQuestionData, IStepData } from '../../survey/IStepData';

export abstract class Steps {
  public static goToStep(step: string, props: IStepData): void {
    props.wizard.goToStep(step);
  }

  public static goToNextStep(
    props: IStepData,
    questionnaire: Questionnaire,
    config: QuestionableConfig,
  ): void {
    Steps.goToStep(questionnaire.getNextStep(props, config), props);
  }

  public static goToPrevStep(
    props: IStepData,
    questionnaire: Questionnaire,
    config: QuestionableConfig,
  ): void {
    Steps.goToStep(questionnaire.getPreviousStep(props, config), props);
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

  public static isValid(form: IAnswer, questionId: string): boolean {
    const q = form.answers.find((a) => a.id === questionId);
    if (!q) return false;
    const answers = values(q.answers);
    switch (q.type) {
      case STEP_TYPE.DOB:
        return undefined !== form?.age?.years && form.age.years > 0;
      case STEP_TYPE.MULTIPLE_CHOICE:
        return q.answer !== undefined && answers?.indexOf(q.answer) !== -1;
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
