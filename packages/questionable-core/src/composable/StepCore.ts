/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import {
  kebabCase,
} from 'lodash';
import {
  IQuestionCore,
  IRequirementCore,
  IResponseCore,
  ISectionCore,
  IStepCore,
}              from '../survey/IStepCore';
import {
  isEnum,
  PAGE_TYPE,
  QUESTION_TYPE,
  BASE,
  TStepType,
  PROGRESS_BAR_STATUS,
} from '../util/enums';
import { ComposableCore } from './ComposableCore';
import {
  checkInstanceOf,
  ClassList,
  TInstanceOf,
} from '../util/instanceOf';
import { TAgeCalcCore, TAgeCore } from '../util/types';
import { AnswerCore }             from './AnswerCore';
import { IBranchCore }            from '../survey/IBranchCore';
import { BaseCore }               from './BaseCore';

export class StepCore extends ComposableCore implements IStepCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.step;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.step, ClassList.composable], obj);
  }

  public static override create(data: Partial<IStepCore> = {}) {
    if (data instanceof StepCore) {
      return data;
    }
    return new StepCore(data);
  }

  constructor(data: Partial<IStepCore> = {}) {
    super(data);

    if (data.entryRequirements) {
      this.entryRequirements = data.entryRequirements.map((r) =>
        new RequirementCore(r));
    }
    if (data.exitRequirements) {
      this.exitRequirements = data.exitRequirements.map((r) =>
        new RequirementCore(r));
    }
    if (!data.type || `${data.type}` === `${BASE.DEFAULT}`) {
      this.#type = BASE.DEFAULT;
    } else {
      this.#type = data.type;
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

  #type: TStepType;

  public get type(): TStepType {
    return this.#type;
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

export class SectionCore extends ComposableCore implements ISectionCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.section;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.section, ClassList.composable,
    ], obj);
  }

  public static create(data: Partial<ISectionCore> = {}) {
    if (data instanceof SectionCore) {
      return data;
    }
    return new SectionCore(data);
  }

  constructor(data: Partial<ISectionCore> = {}) {
    super(data);
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r));
    }
  }

  lastStep?: number | undefined;

  requirements!: RequirementCore[];

  status?: PROGRESS_BAR_STATUS | undefined;

  order?: number | undefined;
}

export class QuestionCore extends StepCore implements IQuestionCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.question;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.question, ClassList.step], obj);
  }

  #type: QUESTION_TYPE;

  public get type(): QUESTION_TYPE {
    return this.#type;
  }

  answers!: AnswerCore[];

  branch!: BranchCore;

  section!: SectionCore;

  public static override create(data: Partial<IQuestionCore> = {}) {
    if (data instanceof QuestionCore) {
      return data;
    }
    return new QuestionCore(data);
  }

  constructor(data: Partial<IQuestionCore> = {}) {
    super(data);
    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a));
    } else {
      this.answers = [];
    }
    if (data.branch) {
      this.branch = new BranchCore(data.branch);
    }
    if (data.section) {
      this.section = new SectionCore(data.section);
    }
    if (!data.type || `${data.type}` === `${QUESTION_TYPE.DEFAULT}`) {
      this.#type = QUESTION_TYPE.DEFAULT;
    } else {
      this.#type = data.type;
    }
  }

  #answer = '';

  #answers: string[] = [];

  public get answer() {
    return this.#answer;
  }

  public set answer(val: string) {
    this.#answers.push(val);
    this.#answer = val;
  }

  public getAnswerHistory() {
    return [...this.#answers];
  }
}

export class ResponseCore extends BaseCore implements IResponseCore {
  public readonly instanceOfCheck: TInstanceOf = ClassList.response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.response], obj);
  }

  public static override create(data: Partial<IResponseCore> = {}) {
    if (data instanceof ResponseCore) {
      return data;
    }
    return new ResponseCore(data);
  }

  constructor(data: Partial<IResponseCore>) {
    super();
    if (data.answers) {
      this.answers = data.answers.map((a) => new AnswerCore(a));
    }
    if (data.question) {
      this.question = new QuestionCore(data.question);
    }
  }

  answers!: AnswerCore[];

  question!: QuestionCore;
}

export class RequirementCore extends ComposableCore implements IRequirementCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.requirement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.requirement, ClassList.composable], obj);
  }

  public static create(data: Partial<IRequirementCore> = {}) {
    if (data instanceof RequirementCore) {
      return data;
    }
    return new RequirementCore(data);
  }

  constructor(data: Partial<IRequirementCore>) {
    super(data);

    if (data.responses) {
      this.responses = data.responses.map((q) => new ResponseCore(q));
    }
  }

  ageCalc?: TAgeCalcCore | undefined;

  explanation?: string | undefined;

  maxAge?: TAgeCore | undefined;

  minAge?: TAgeCore | undefined;

  responses!: ResponseCore[];
}

export class BranchCore extends ComposableCore implements IBranchCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.branch;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.branch, ClassList.composable], obj);
  }

  public static create(data: Partial<IBranchCore> = {}) {
    if (data instanceof BranchCore) {
      return data;
    }
    return new BranchCore(data);
  }

  constructor(data: Partial<IBranchCore> = {}) {
    super(data);
  }

  public questions!: QuestionCore[];
}
