import { MODE }                                      from '../lib/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../lib/types';
import { IButtonCore }                               from './IButtonCore';
import { IEventCore }                                from './IEventCore';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfigCore {
  /**
   * Enables all developer tools (NOT for production use!)
   *
   * @title Developer Mode
   * @default false
   * @hidden
   */
  readonly dev: boolean;
  /**
   * Event hooks for common form operations
   *
   * @title Events
   * @hidden
   */
  events?: Partial<IEventCore>;
  /**
   * Optional method to fetch environment variables or query string parameters
   *
   * @title Get Runtime Config
   * @hidden
   */
  getRuntimeConfig?: TGetDictionaryCore;
  /**
   * View or edit mode
   *
   * @title Mode
   * @default MODE.VIEW
   */
  mode: MODE;
  /**
  * Navigation configuration
  *
  * @title Navigation
  */
  nav: Partial<INavigationConfigCore>;
  /**
   * Page configuration
   *
   * @title Pages
   */
  pages: Partial<IPagesConfigCore>;
  /**
   * Properties produced from `getRuntimeConfig()`
   * @title Params
   * @default {}
   */
  get params(): TStringDictionaryCore;
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  progressBar?: Partial<IProgressBarConfigCore>;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  questions?: Partial<IQuestionConfigCore>;

  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: Partial<IStepConfigCore>;
}

/**
 * Customizations for styling and formatting of the steps
 */
export interface IStepConfigCore {
  readonly core?: 'IStepConfig' | 'I';
}

/**
 * Configuration options for the progress bar
 */
export interface IProgressBarConfigCore {
  readonly core?: 'IProgressBarConfig' | 'I';
}

/**
 * Configuration for question display
 */
export interface IQuestionConfigCore {
  readonly core?: 'IQuestionConfig' | 'I';
}

/**
 * Configuration for buttons
 */
export interface IButtonConfigCore extends IButtonCore {
  readonly core?: 'IButtonConfig' | 'I';
}

/**
 * Configuration for navigation
 */
export interface INavigationConfigCore {
  readonly core?: 'INavigationConfig' | 'I';
}

export interface IPageConfigCore {
  readonly core?: 'IPageConfig' | 'I';
  visible?: boolean;
}

export interface IPagesConfigCore {
  readonly core?: 'IPagesConfig' | 'I';
}
