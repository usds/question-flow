import { merge }                                       from 'lodash';
import { TVerticalPositionCore, TProgressBarTypeCore } from '../../util/types';
import { IProgressBarConfigCore }                      from '../../survey/IQuestionableConfigCore';
import { BaseCore }                                    from '../BaseCore';
import { ClassList, TInstanceOf, checkInstanceOf }     from '../../util/instanceOf';

/**
 * Configuration options for the progress bar
 */
export class ProgressBarConfigCore  extends BaseCore implements IProgressBarConfigCore {
  get __core() {
    return 'progress';
  }

  public get instanceOfCheck(): TInstanceOf {
    return ClassList.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.config], obj);
  }

  public static override create(data: Partial<ProgressBarConfigCore> = {}) {
    if (data instanceof ProgressBarConfigCore) {
      return data;
    }
    return new ProgressBarConfigCore(data);
  }

  constructor(data: Partial<ProgressBarConfigCore> = {}) {
    super(data);
    merge(this, data);
  }

  /**
   * Color of the non-completed pb
   *
   * @title Base Background Color
   */
  baseBgColor?: string | undefined;

  /**
   * Color of the completed pb
   *
   * @title Background Color
   */
  bgColor?: string | undefined;

  /**
   * Toggles whether to show progress bar
   *
   * @title Show Progress Bar
   * @default false
   */
  hide?: boolean | undefined;

  /**
   * Vertical orientation of the progress bar
   *
   * @title Position
   * @default 'bottom'
   */
  position?: TVerticalPositionCore | undefined;

  /**
   * Component type
   *
   * Can be one of two types:
   * (1) The USWDS Step Indicator @see https://trussworks.github.io/react-uswds/?path=/docs/components-step-indicator
   * (2) React progress bar @see https://katerinalupacheva.github.io/react-progress-bar/
   *
   * @title Type
   * @default 'progress-bar'
   */
  type?: TProgressBarTypeCore | undefined;
}
