import { MODE }                                      from '../util/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../util/types';
import { IButtonCore }                               from './IButtonCore';
import { IEventCore }                                from './IEventCore';
import { EConfigCoreProperties as p }                from '../metadata/MConfig';
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
  readonly [p.dev]: boolean;
  /**
   * Event hooks for common form operations
   *
   * @title Events
   * @hidden
   */
  [p.events]?: Partial<IEventCore>;
  /**
   * Optional method to fetch environment variables or query string parameters
   *
   * @title Get Runtime Config
   * @hidden
   */
  [p.getRuntimeConfig]?: TGetDictionaryCore;
  /**
   * View or edit mode
   *
   * @title Mode
   * @default MODE.VIEW
   */
  [p.mode]: MODE;
  /**
  * Navigation configuration
  *
  * @title Navigation
  */
  [p.nav]: Partial<INavigationConfigCore>;
  /**
   * Page configuration
   *
   * @title Pages
   */
  [p.pages]: Partial<IPagesConfigCore>;
  /**
   * Properties produced from `getRuntimeConfig()`
   * @title Params
   * @default {}
   */
  get [p.params](): TStringDictionaryCore;
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  [p.progressBar]?: Partial<IProgressBarConfigCore>;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  [p.questions]?: Partial<IQuestionConfigCore>;

  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  [p.steps]?: Partial<IStepConfigCore>;
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
