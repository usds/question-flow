/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
  merge,
  values,
  noop,
} from 'lodash';
import {
  IStepCore,
}              from '../survey/IStepCore';
import {
  DIRECTION,
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  STEP_TYPE,
  BASE,
  TStepType,
} from '../util/enums';
import { QuestionnaireCore }                            from './QuestionnaireCore';
import { ComposableCore }                               from './ComposableCore';
import {
  checkInstanceOf, getClassName, PREFIX, TInstanceOf,
} from '../util/instanceOf';
import { RequirementCore } from './RequirementCore';
import { SectionCore }     from './SectionCore';

export type TStepCtor = Partial<IStepCore>;

const stepDefaults = {
  entryRequirements: [],
  exitRequirements:  [],
  footer:            '',
  info:              '',
  internalNotes:     '',
  order:             0,
  section:           {},
  subTitle:          '',
};

export class StepCore extends ComposableCore implements IStepCore {
  protected static override _name = getClassName(PREFIX.STEP);

  protected override instanceOfCheck: TInstanceOf = StepCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([StepCore._name, ComposableCore._name], obj);
  }

  constructor(data: TStepCtor, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, stepDefaults);
    merge(this, data);
    if (data.entryRequirements) {
      this.entryRequirements = data.entryRequirements.map((r) =>
        new RequirementCore(r, questionnaire));
    }
    if (data.exitRequirements) {
      this.exitRequirements = data.exitRequirements.map((r) =>
        new RequirementCore(r, questionnaire));
    }
    this.#initStep();
  }

  #initStep() {
    if (!this.type || `${this.type}` === `${BASE.DEFAULT}`) {
      this.type = BASE.DEFAULT;
    }
  }

  public toString() {
    return this.id;
  }
  // static create(props: IStepDataCore, questionnaire: QuestionnaireCore) {
  //   return new StepCore({ ...props.step, ...props, questionnaire } as TStepCtor);
  // }

  public entryRequirements!: RequirementCore[];

  public exitRequirements!: RequirementCore[];

  public footer! : string;

  public info!: string;

  public internalNotes!: string;

  public order!: number;

  public section!: SectionCore;

  public subTitle!: string;

  public type!: TStepType;

  public title!: string;

  public goToStep(step: StepCore, cb = noop): void {
    if (cb) {
      cb(step, this);
    }
  }

  public goToNextStep(): void {
    const step = this.questionnaire.getNextStep(this);
    const dir  = DIRECTION.FORWARD;
    this.questionnaire.config.events?.page({
      dir, step,
    });
    this.goToStep(step);
  }

  public goToPrevStep(): void {
    const step = this.questionnaire.getPreviousStep(this);
    const dir  = DIRECTION.BACKWARD;
    this.questionnaire.config.events?.page({ dir, step });
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
