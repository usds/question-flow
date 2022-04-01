/* eslint-disable import/no-cycle */
import { merge }       from 'lodash';
import { IResultCore } from '../survey/IResultCore';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ActionCore }        from './ActionCore';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';
import { RequirementCore }   from './StepCore';

const resultDefaults = {
  action:       {},
  category:     '',
  label:        '',
  order:        0,
  reason:       '',
  requirements: [],
};

export class ResultCore extends ComposableCore implements IResultCore {
  protected static override _name = getClassName(PREFIX.RESULT);

  protected override instanceOfCheck: TInstanceOf = ResultCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ResultCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IResultCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, resultDefaults);
    merge(this, data);
    if (data.action) {
      this.action = new ActionCore(this.action, questionnaire);
    }
    if (data.match) {
      this.match = new RequirementCore(data.match, questionnaire);
    }
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r, questionnaire));
    }
    if (data.secondaryAction) {
      this.secondaryAction = new ActionCore(data.secondaryAction, questionnaire);
    }
  }

  action!: ActionCore;

  category!: string;

  label!: string;

  match?: RequirementCore | undefined;

  reason!: string;

  requirements!: RequirementCore[];

  secondaryAction?: ActionCore | undefined;

  order?: number;
}
