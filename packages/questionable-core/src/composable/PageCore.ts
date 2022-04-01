/* eslint-disable import/no-cycle */
import { merge }                                        from 'lodash';
import { IPageCore }                                    from '../survey/IStepCore';
import { PAGE_TYPE }                                    from '../util/enums';
import {
  checkInstanceOf, getClassName, PREFIX, TInstanceOf,
} from '../util/instanceOf';
import { QuestionnaireCore }   from './QuestionnaireCore';
import { StepCore, TStepCtor } from './StepCore';

type ctor = TStepCtor & Partial<IPageCore>;

const defaults = {
  body:          '',
  bodyHeader:    '',
  bodySubheader: '',
  type:          PAGE_TYPE.DEFAULT,
};

export class PageCore extends StepCore implements IPageCore {
  protected static override _name = getClassName(PREFIX.PAGE);

  protected override instanceOfCheck: TInstanceOf = PageCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([PageCore._name, StepCore._name], obj);
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
