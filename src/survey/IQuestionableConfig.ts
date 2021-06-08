import { MODE } from '../lib/enums';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfig {
  /**
   * Enables all developer tools (NOT for production use!)
   */
  dev: boolean;
  /**
   * View or edit mode
   *
   * @title Mode
   */
  mode: MODE;
  /**
   * Toggles whether steps' ids are show in the UI
   */
  showSteps: boolean;
}
