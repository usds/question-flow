import { merge }                                   from 'lodash';
import { BaseCore }                                from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf } from '../../util/instanceOf';

/**
 * Customizations for styling and formatting of the steps
 */
export class StepConfigCore extends BaseCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<StepConfigCore> = {}) {
    if (data instanceof StepConfigCore) {
      return data;
    }
    return new StepConfigCore(data);
  }

  constructor(data: Partial<StepConfigCore> = {}) {
    super(data);
    merge(this, data);
  }

  /**
   * Class determines whether cards have borders
   *
   * @title Border Class
   * @default 'border-0'
   */
  borderClass?: 'border-ink' | 'border-0';

  /**
   * Toggles whether steps' ids are shown next to the question text
   *
   * @title Show Step Id
   * @default false
   */
  showStepId?: boolean | undefined;

  /**
   * Class to apply to title. Use to add background to question text
   *
   * @title Title Class
   * @default ''
   */
  titleClass?: 'bg-base-lightest' | '';

  visible?: boolean | undefined;
}
