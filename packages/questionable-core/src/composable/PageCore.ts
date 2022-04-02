/* eslint-disable import/no-cycle */
import { merge }           from 'lodash';
import { IPageCore }       from '../survey/IStepCore';
import { PAGE_TYPE }       from '../util/enums';
import {
  checkInstanceOf,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { QuestionnaireCore }   from './QuestionnaireCore';
import { StepCore, TStepCtor } from './StepCore';

type ctor = TStepCtor & Partial<PageCore>;

const defaults         = {
  body:          '',
  bodyHeader:    '',
  bodySubheader: '',
  type:          PAGE_TYPE.DEFAULT,
};
const className = getInstanceName(PREFIX.PAGE);
export class PageCore extends StepCore implements IPageCore {
  public static override readonly _name = className;

  public override readonly instanceOfCheck: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, StepCore._name], obj);
  }

  constructor(data: ctor, questionnaire: QuestionnaireCore) {
    super(data, questionnaire);
    merge(this, defaults);
    merge(this, data);
    if (!data.type || `${data.type}` === `${PAGE_TYPE.DEFAULT}`) {
      this.type = PAGE_TYPE.DEFAULT;
    } else {
      this.type = data.type;
    }
  }

  body!: string;

  bodyHeader!: string;

  bodySubHeader!: string;

  type: PAGE_TYPE;
}
