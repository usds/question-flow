/* eslint-disable import/no-cycle */
import { merge }               from 'lodash';
import { ISectionCore }        from '../survey';
import { PROGRESS_BAR_STATUS } from '../util';
import {
  checkInstanceOf,
  getClassName,
  PREFIX,
  TInstanceOf,
} from '../util/instanceOf';
import { ComposableCore }    from './ComposableCore';
import { QuestionnaireCore } from './QuestionnaireCore';
import { RequirementCore }   from './RequirementCore';

const sectionDefaults = {
  lastStep:     undefined,
  order:        0,
  requirements: [],
  status:       undefined,
};

export class SectionCore extends ComposableCore implements ISectionCore {
  protected static override _name = getClassName(PREFIX.SECTION);

  protected override instanceOfCheck: TInstanceOf = SectionCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([SectionCore._name, ComposableCore._name], obj);
  }

  constructor(data: Partial<ISectionCore>, questionnaire: QuestionnaireCore) {
    super(questionnaire);
    merge(this, sectionDefaults);
    merge(this, data);
    if (data.requirements) {
      this.requirements = data.requirements.map((r) => new RequirementCore(r, questionnaire));
    }
  }

  lastStep?: number | undefined;

  requirements!: RequirementCore[];

  status?: PROGRESS_BAR_STATUS | undefined;

  order?: number | undefined;
}
