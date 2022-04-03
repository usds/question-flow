/* eslint-disable import/no-cycle */
import { IResultCore } from '../survey/IResultCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { ActionCore }      from './ActionCore';
import { ComposableCore }  from './ComposableCore';
import { RequirementCore } from './StepCore';

export class ResultCore extends ComposableCore implements IResultCore {
  public override readonly instanceOfCheck: TInstanceOf = ClassList.result;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.result, ClassList.composable], obj);
  }

  public static create(data: Partial<IResultCore> = {}) {
    if (data instanceof ResultCore) {
      return data;
    }
    return new ResultCore(data);
  }

  constructor(data: Partial<IResultCore> = {}) {
    super(data);
    this.#action = (data.action instanceof ActionCore) ? data.action : new ActionCore(data.action);
    if (data.match) {
      this.#match = (data.match instanceof RequirementCore) ? data.match : new RequirementCore(data.match);
    }
    this.#requirements = data.requirements?.map((r) => {
      if (r instanceof RequirementCore) return r;
      return new RequirementCore(r);
    }) || [];

    if (data.secondaryAction) {
      this.#secondaryAction = (data.secondaryAction instanceof ActionCore)
        ? data.secondaryAction : new ActionCore(data.secondaryAction);
    }
    this.#reason = data.reason || '';
  }

  #action: ActionCore;

  public get action(): ActionCore {
    return this.#action;
  }

  #category!: string;

  public get category() {
    return this.#category;
  }

  #label!: string;

  public get label(): string {
    return this.#label;
  }

  #match?: RequirementCore | undefined;

  public get match() {
    return this.#match;
  }

  public set match(val: RequirementCore | undefined) {
    this.#match = val;
  }

  #reason: string;

  public get reason(): string {
    return this.#reason;
  }

  public set reason(val: string) {
    this.#reason = val;
  }

  #requirements!: RequirementCore[];

  public get requirements() {
    return this.#requirements;
  }

  public set requirements(val: RequirementCore[]) {
    this.#requirements = val;
  }

  #secondaryAction?: ActionCore | undefined;

  public get secondaryAction() {
    return this.#secondaryAction;
  }

  #order?: number;

  public get order() {
    return this.#order;
  }
}
