/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
  merge,
  values,
} from 'lodash';
import {
  IRequirementCore,
  ISectionCore,
  IStepCore,
}              from '../survey/IStepCore';
import { IStepDataCore } from '../survey/IStepDataCore';
import {
  DIRECTION,
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  STEP_TYPE,
  TStepType,
} from '../util/enums';
import { noop }              from '../util/noop';
import { stepReducer }       from './FormCore';
import { QuestionnaireCore } from './QuestionnaireCore';
import { StepBaseCore }      from './StepBaseCore';

export type TStepCtor = Partial<IStepCore> &
  Pick<IStepCore, 'type' | 'id'>;

export class StepCore extends StepBaseCore implements IStepCore {
  constructor(data: TStepCtor, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, data);
  }

  // static create(props: IStepDataCore, questionnaire: QuestionnaireCore) {
  //   return new StepCore({ ...props.step, ...props, questionnaire } as TStepCtor);
  // }

  get dataCore(): IStepDataCore {
    return ({
      dispatchForm: stepReducer,
      form:         this.form,
      step:         this,
      stepId:       this.id,
    });
  }

  public entryRequirements: IRequirementCore[] = [];

  public exitRequirements: IRequirementCore[] = [];

  public footer = '';

  public info = '';

  public internalNotes = '';

  public order?: number = 0;

  section: Partial<ISectionCore> = {};

  subTitle = '';

  type!: TStepType;

  id!: string;

  title!: string;

  public goToStep(step: string, cb = noop): void {
    if (cb) {
      cb(step, this);
    }
  }

  public goToNextStep(): void {
    const step = this.questionnaire.getNextStep(this.dataCore);
    const dir  = DIRECTION.FORWARD;
    this.questionnaire.config.events.page({ dir, props: this.dataCore, step });
    this.goToStep(step);
  }

  public goToPrevStep(): void {
    const step = this.questionnaire.getPreviousStep(this.dataCore);
    const dir  = DIRECTION.BACKWARD;
    this.questionnaire.config.events.page({ dir, props: this.dataCore, step });
    this.goToStep(step);
  }

  /**
   * Determines whether the user should be allowed to continue
   * @param props
   * @returns
   */
  public isNextEnabled(): boolean {
    if (!this.id) {
      throw new Error('This survery is not defined');
    }
    if (this.id === STEP_TYPE.LANDING) {
      return true;
    }
    if (this.id === STEP_TYPE.SUMMARY) {
      return true;
    }
    // KLUDGE Alert: this is not an elegant way to solve this
    if (this.type === QUESTION_TYPE.DOB) {
      const yearsOld = this.form.age?.years || 0;
      return yearsOld > 0;
    }
    if (!this.form) {
      return false;
    }
    return this.isValid();
  }

  public isValid(): boolean {
    const q = this.form.responses.find((a) => a?.id === this.id);
    let ret = true;
    if (!q) {
      ret = false;
    }
    const answers = values(q?.answers);
    let years     = 0;
    switch (q?.type) {
      case STEP_TYPE.DOB:
        years = this.form?.age?.years || 0;
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

  public getFieldSetName(): string {
    return kebabCase(this.title);
  }

  public getDomId(answer: string): string {
    const name = this.getFieldSetName();
    return `${name}-${kebabCase(answer)}`;
  }

  public getStepType() {
    if (isEnum(QUESTION_TYPE, this.type)) {
      return 'question';
    }
    if (isEnum(PAGE_TYPE, this.type)) {
      return 'page';
    }
    return 'unknown';
  }
}
