import { kebabCase, values }      from 'lodash';
import { StepCore, QuestionCore } from '../composable/StepCore';
import { FormCore }               from '../composable/FormCore';
import { noop }                   from '../util/noop';
import {
  DIRECTION,
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  STEP_TYPE,
} from '../util/enums';

export abstract class StepsCore {
  public static goToStep(step: StepCore, cb = noop): void {
    if (cb) {
      cb(step, this);
    }
  }

  public static goToNextStep(
    props: StepCore,
  ): void {
    const step = props.questionnaire.getNextStep(props);
    const dir  = DIRECTION.FORWARD;
    props.questionnaire.config.events?.page({
      dir, step,
    });
    StepsCore.goToStep(step, step.goToStep);
  }

  public static goToPrevStep(
    props: StepCore,
  ): void {
    const step = props.questionnaire.getPreviousStep(props);
    const dir  = DIRECTION.BACKWARD;
    props.questionnaire.config.events?.page({ dir, step });
    StepsCore.goToStep(step, step.goToStep);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public static isNextEnabled(step: StepCore): boolean {
    if (!step) {
      throw new Error('This survery is not defined');
    }
    if (step.type === STEP_TYPE.LANDING) {
      return true;
    }
    if (step.type === STEP_TYPE.SUMMARY) {
      return true;
    }
    // KLUDGE Alert: this is not an elegant way to solve this
    if (step?.type === QUESTION_TYPE.DOB) {
      const yearsOld = step.form.age?.years || 0;
      return yearsOld > 0;
    }
    if (!step.form) {
      return false;
    }
    return StepsCore.isValid(step.form, step?.id);
  }

  public static isValid(form: FormCore, questionId: string): boolean {
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

  public static getFieldSetName(step: QuestionCore): string {
    return kebabCase(step.title);
  }

  public static getDomId(answer: string, step: QuestionCore): string {
    const name = StepsCore.getFieldSetName(step);
    return `${name}-${kebabCase(answer)}`;
  }

  public static getStepType(step: StepCore) {
    if (isEnum(QUESTION_TYPE, step.type)) {
      return 'question';
    }
    if (isEnum(PAGE_TYPE, step.type)) {
      return 'page';
    }
    return 'unknown';
  }
}
