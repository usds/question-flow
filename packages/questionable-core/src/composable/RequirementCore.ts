/* eslint-disable import/no-cycle */
import { merge, noop }            from 'lodash';
import { IRequirementCore }       from '../survey/IStepCore';
import { TAgeCalcCore, TAgeCore } from '../util';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';
import { ResponseCore }      from './ResponseCore';

const requirementDefaults = {
  ageCalc:     noop,
  explanation: '',
  responses:   [],
};

export class RequirementCore extends ComposableCore implements IRequirementCore {
  protected static override _name = getClassName(PREFIX.REQUIREMENT);

  protected override instanceOfCheck: TInstanceOf = RequirementCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([RequirementCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<IRequirementCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, requirementDefaults);
    merge(this, data);

    if (data.responses) {
      this.responses = data.responses.map((q) => new ResponseCore(q, questionnaire));
    }
  }

  ageCalc?: TAgeCalcCore | undefined;

  explanation?: string | undefined;

  maxAge?: TAgeCore | undefined;

  minAge?: TAgeCore | undefined;

  responses!: ResponseCore[];
}
