import { TProgressBarPosition, TProgressBarType } from '../lib/types';
import { MODE }                                   from '../lib/enums';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfig {
  /**
   * Enables all developer tools (NOT for production use!)
   *
   * @title Developer Mode
   * @default false
   * @hidden
   */
  readonly dev: boolean;
  /**
   * View or edit mode
   *
   * @title Mode
   * @default MODE.VIEW
   */
  mode: MODE;
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  progressBar?: Partial<IProgressBarConfig>;
  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: Partial<IStepConfig>;
}

/**
 * Customizations for styling and formatting of the steps
 */
export interface IStepConfig {
  /**
   * Class determines whether cards have borders
   *
   * @title Border Class
   * @default 'border-0'
   */
  borderClass: 'border-ink' | 'border-0';
  /**
   * Toggles whether steps' ids are shown next to the question text
   *
   * @title Show Step Id
   * @default false
   */
  showStepId: boolean;
  /**
   * Class to apply to title. Use to add background to question text
   *
   * @title Title Class
   * @default ''
   */
  titleClass: 'bg-base-lightest' | '';
}

/**
 * Configuration options for the progress bar
 */
export interface IProgressBarConfig {
  /**
   * Color of the non-completed pb
   *
   * @title Base Background Color
   */
  baseBgColor: string;
  /**
   * Color of the completed pb
   *
   * @title Background Color
   */
  bgColor: string;
  /**
   * Toggles whether to show progress bar
   *
   * @title Show Progress Bar
   * @default false
   */
  hide: boolean;
  /**
   * Vertical orientation of the progress bar
   *
   * @title Position
   * @default 'bottom'
   */
  position: TProgressBarPosition;
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
  type: TProgressBarType
}
