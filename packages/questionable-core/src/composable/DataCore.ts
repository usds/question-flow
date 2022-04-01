/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-classes-per-file */
import { merge }   from 'lodash';
import {
  IPageDataCore,
  IQuestionDataCore,
  IStepDataCore,
} from '../survey';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
  TReducerCore,
} from '../util';
import { ComposableCore } from './ComposableCore';
import { stepReducer }    from './FormCore';
import { PageCore }       from './PageCore';
import { QuestionCore }   from './QuestionCore';
import { StepCore }       from './StepCore';

export class StepDataCore extends ComposableCore implements IStepDataCore {
  protected static override _name = getClassName(PREFIX.STEP_DATA);

  protected override instanceOfCheck: TInstanceOf = StepDataCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([StepDataCore._name, ComposableCore._name], obj);
  }

  constructor(data: StepCore) {
    super(data.questionnaire);
    merge(this, data);
    this.dispatchForm = stepReducer;
    this.#step        = data;
  }

  dispatchForm: TReducerCore;

  #step: StepCore;

  get step() {
    return this.#step;
  }

  get stepId() {
    return this.#step.id;
  }
}

export class QuestionDataCore extends StepDataCore implements IQuestionDataCore {
  protected static override _name = getClassName(PREFIX.PAGE_DATA);

  protected override instanceOfCheck: TInstanceOf = QuestionDataCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([QuestionDataCore._name, StepDataCore._name, ComposableCore._name], obj);
  }

  constructor(data: QuestionCore) {
    super(data);
    merge(this, data);
    this.#step = data;
  }

  #step: QuestionCore;

  get step() {
    return this.#step;
  }
}

export class PageDataCore extends StepDataCore implements IPageDataCore {
  protected static override _name = getClassName(PREFIX.PAGE_DATA);

  protected override instanceOfCheck: TInstanceOf = PageDataCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([PageDataCore._name, StepDataCore._name, ComposableCore._name], obj);
  }

  constructor(data: PageCore) {
    super(data);
    merge(this, data);
    this.#step = data;
  }

  #step: PageCore;

  get step() {
    return this.#step;
  }
}
