import { kebabCase, values }                                from 'lodash';
import { QuestionnaireCore }                                from '../composable';
import { noop }                                             from '../util/noop';
import {
  DIRECTION, isEnum, PAGE_TYPE, QUESTION_TYPE, STEP_TYPE,
} from '../util/enums';
import { IFormCore }         from '../survey/IFormCore';
import { IStepDataCore }     from '../survey/IStepDataCore';
import { IQuestionDataCore } from '../survey/IQuestionDataCore';
import { IStepCore }         from '../survey';

export abstract class StepsCore {
  public static goToStep(step: string, props: IStepDataCore, cb = noop): void {
    if (cb) {
      cb(step, props);
    }
  }

  public static goToNextStep(
    props: IStepDataCore,
    questionnaire: QuestionnaireCore,
  ): void {
    const step = questionnaire.getNextStep(props);
    const dir  = DIRECTION.FORWARD;
    questionnaire.config.events.page({ dir, props, step });
    StepsCore.goToStep(step, props);
  }

  public static goToPrevStep(
    props: IStepDataCore,
    questionnaire: QuestionnaireCore,
  ): void {
    const step = questionnaire.getPreviousStep(props);
    const dir  = DIRECTION.BACKWARD;
    questionnaire.config.events.page({ dir, props, step });
    StepsCore.goToStep(step, props);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public static isNextEnabled(props: IStepDataCore): boolean {
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
    return StepsCore.isValid(props.form, props.step?.id);
  }

  public static isValid(form: IFormCore, questionId: string): boolean {
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

  public static getFieldSetName(props: IQuestionDataCore): string {
    return kebabCase(props.step.title);
  }

  public static getDomId(answer: string, props: IQuestionDataCore): string {
    const name = StepsCore.getFieldSetName(props);
    return `${name}-${kebabCase(answer)}`;
  }

  public static getStepType(step: IStepCore) {
    if (isEnum(QUESTION_TYPE, step.type)) {
      return 'question';
    }
    if (isEnum(PAGE_TYPE, step.type)) {
      return 'page';
    }
    return 'unknown';
  }
}
