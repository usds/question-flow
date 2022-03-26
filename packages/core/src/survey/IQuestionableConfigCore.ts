import { MODE }                                      from '../lib/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../lib/types';
import { IButtonCore }                               from './IButtonCore';
import { ICore }                                     from './ICore';
import { IEventCore }                                from './IEventCore';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfigCore extends ICore {
  readonly core?: 'IQuestionableConfig';
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
export interface IStepConfigCore extends ICore {
  readonly core?: 'IStepConfig';
}

/**
 * Configuration options for the progress bar
 */
export interface IProgressBarConfigCore extends ICore {
  readonly core?: 'IProgressBarConfig';
}

/**
 * Configuration for question display
 */
export interface IQuestionConfigCore extends ICore {
  readonly core?: 'IQuestionConfig';
}

/**
 * Configuration for buttons
 */
export interface IButtonConfigCore extends IButtonCore {
  readonly core?: 'IButtonConfig';
}

/**
 * Configuration for navigation
 */
export interface INavigationConfigCore extends ICore {
  readonly core?: 'INavigationConfig';
}

export interface IPageConfigCore extends ICore {
  readonly core?: 'IPageConfig';
  visible?: boolean;
}

export interface IPagesConfigCore extends ICore {
  readonly core?: 'IPagesConfig';
}
