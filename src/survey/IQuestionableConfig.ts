import { MODE } from '../lib/enums';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfig {
  /**
   * Enables all developer tools (NOT for production use!)
   *
   * @title Developer Mode
   * @hidden
   */
  readonly dev: boolean;
  /**
   * View or edit mode
   *
   * @title Mode
   */
  mode: MODE;
  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: Partial<IStepConfig>;
}

export interface IStepConfig {
  /**
   * Class determines whether cards have borders
   *
   * @title Border Class
   */
  borderClass: 'border-ink' | 'border-0';
  /**
   * Toggles whether to show progress bar
   *
   * @title Show Progress Bar
   */
  showProgress: boolean;
  /**
   * Toggles whether steps' ids are shown next to the question text
   *
   * @title Show Step Id
   */
  showStepId: boolean;
  /**
   * Class to apply to title. Use to add background to question text
   *
   * @title Title Class
   */
  titleClass: 'bg-base-lightest' | '';
}
