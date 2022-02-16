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
    if (!props?.step) {
      throw new Error('This survery is not defined');
    }
    if (props.stepId === STEP_TYPE.LANDING) {
      return true;
    }
    if (props.stepId === STEP_TYPE.SUMMARY) {
      return true;
    }
    // KLUDGE Alert: this is not an elegant way to solve this
    if (props.step?.type === QUESTION_TYPE.DOB) {
      const yearsOld = props.form.age?.years || 0;
      return yearsOld > 0;
    }
    if (!props.form) {
      return false;
    }
    return Steps.isValid(props.form, props.step?.id);
  }

  public static isValid(form: IForm, questionId: string): boolean {
    const q = form.responses.find((a) => a?.id === questionId);
    let ret = true;
    if (!q) {
      ret = false;
    }
    const answers = values(q?.answers);
    let years     = 0;
    switch (q?.type) {
      case STEP_TYPE.DOB:
        years = form?.age?.years || 0;
        if (years <= 0) {
          ret = false;
        }
        if (!q?.exitRequirements || q.exitRequirements.length === 0) {
          // ret === true
        }
        ret = ret
          && (q.exitRequirements?.every((r) => r.minAge && years >= r.minAge.years) || true);
        break;
      case STEP_TYPE.MULTIPLE_CHOICE:
        ret = ret && (
          q.answer !== undefined
          && answers?.find((x) => x.title === q.answer) !== undefined
        );
        break;
      default:
        // ret === true
        break;
    }
    return ret;
  }

  public static getFieldSetName(props: IQuestionData): string {
    return kebabCase(props.step.title);
  }

  public static getDomId(answer: string, props: IQuestionData): string {
    const name = Steps.getFieldSetName(props);
    return `${name}-${kebabCase(answer)}`;
  }
}
