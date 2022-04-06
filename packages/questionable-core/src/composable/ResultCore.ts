/* eslint-disable import/no-cycle */
import { IResultCore }                             from '../survey/IResultCore';
import { matches }                                 from '../util/helpers';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { ActionCore }                              from './ActionCore';
import { RefCore }                                 from './RefCore';
import { RequirementCore }                         from './StepCore';

export class ResultCore extends RefCore implements IResultCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.result, ClassList.ref], obj);
  }

  // public static isResult(data: any): data is ResultCore {
  //   return 'title' in data;
  // }

  // public isRef(data: any): data is RefCore {
  //   return ResultCore.isRef(this);
  // }

  public static override create(data: Partial<ResultCore>) {
    if (data instanceof ResultCore) {
      return data;
    }
    return new ResultCore(data);
  }

  public static override createOptional(data?: Partial<ResultCore>) {
    if (!data || !super.createOptional(data)) {
      return undefined;
    }
    return ResultCore.create(data);
  }

  #action: ActionCore | undefined;

  #category: string;

  #label: string;

  #match: RequirementCore | undefined;

  #order: number;

  #reason: string;

  #requirements: RequirementCore[];

  #secondaryAction: ActionCore | undefined;

  constructor(data: Partial<ResultCore>) {
    super(data);
    this.#action          = ActionCore.createOptional(data.action);
    this.#match           = RequirementCore.createOptional(data.match);
    this.#requirements    = data.requirements?.map((r) => RequirementCore.create(r)) || [];
    this.#secondaryAction = ActionCore.createOptional(data.secondaryAction);
    this.#reason          = data.reason || '';
    this.#label           = data.label || '';
    this.#category        = data.category || '';
    this.#order           = data.order || 0;
  }

  public get action(): ActionCore | undefined {
    return this.#action;
  }

  public get category() {
    return this.#category;
  }

  public get label(): string {
    return this.#label;
  }

  public get match() {
    return this.#match;
  }

  public set match(val: RequirementCore | undefined) {
    this.#match = val;
  }

  public get reason(): string {
    return this.#reason;
  }

  public set reason(val: string) {
    this.#reason = val;
  }

  public get requirements() {
    return this.#requirements;
  }

  public set requirements(val: RequirementCore[]) {
    this.#requirements = val;
  }

  public get secondaryAction() {
    return this.#secondaryAction;
  }

  public get order() {
    return this.#order;
  }

  public existsIn(data: RequirementCore): boolean {
    if (data instanceof RequirementCore) {
      return this.#requirements.some(
        (q) => q === data || matches(q.title, data.title),
      );
    }
    return false;
  }

  public add(data: RequirementCore): ResultCore {
    const exists = this.existsIn(data);
    if (exists) {
      return this;
    }
    if (data instanceof RequirementCore) {
      this.#requirements.push(data);
    }
    return this;
  }
}
