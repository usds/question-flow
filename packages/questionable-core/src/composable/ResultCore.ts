/* eslint-disable import/no-cycle */
import { IResultCore } from '../survey/IResultCore';
import {
  checkInstanceOf,
  TInstanceOf,
  ClassList,
} from '../util/instanceOf';
import { ActionCore }        from './ActionCore';
import { ComposableCore }    from './ComposableCore';
import { RequirementCore }   from './StepCore';

const refCoreClassName = ClassList.result;

export class ResultCore extends ComposableCore implements IResultCore {
  public static override readonly _name = refCoreClassName;

  public override readonly instanceOfCheck: TInstanceOf = refCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([refCoreClassName, ComposableCore._name], obj);
  }

  constructor(data: Partial<ResultCore> = {}) {
    super(data);
    if (data.action) {
      this.action = new ActionCore(this.action);
    }
    if (data.match) {
      this.match = new RequirementCore(data.match);
    }
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r));
    }
    if (data.secondaryAction) {
      this.secondaryAction = new ActionCore(data.secondaryAction);
    }
  }

  public get [p.action](): ActionCore {
    return this.touch()
  }

  category!: string;

  label!: string;

  match?: RequirementCore | undefined;

  reason!: string;

  requirements!: RequirementCore[];

  secondaryAction?: ActionCore | undefined;

  order?: number;
}
