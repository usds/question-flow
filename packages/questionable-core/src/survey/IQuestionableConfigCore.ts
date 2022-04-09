import { MODE }                                      from '../util/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../util/types';
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
  readonly dev?: boolean;
  /**
   * Event hooks for common form operations
   *
   * @title Events
   * @hidden
   */
  events?: IEventCore | undefined;
  /**
   * Optional method to fetch environment variables or query string parameters
   *
   * @title Get Runtime Config
   * @hidden
   */
  getRuntimeConfig?: TGetDictionaryCore | undefined;
  /**
   * View or edit mode
   *
   * @title Mode
   * @default MODE.VIEW
   */
  mode: MODE | undefined;
  /**
   * Navigation configuration
   *
   * @title Navigation
   */
  nav?: Partial<INavigationConfigCore> | undefined;
  /**
   * Page configuration
   *
   * @title Pages
   */
  pages?: Partial<IPagesConfigCore> | undefined;
  /**
   * Properties produced from `getRuntimeConfig()`
   * @title Params
   * @default {}
   */
  params?: TStringDictionaryCore | undefined;
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  progressBar?: Partial<IProgressBarConfigCore> | undefined;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  questions?: Partial<IQuestionConfigCore> | undefined;

  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: Partial<IStepConfigCore> | undefined;
}

type TConfigBase = {
  __core?: string | undefined;
}

/**
 * Customizations for styling and formatting of the steps
 */
export type IStepConfigCore = TConfigBase;

/**
 * Configuration options for the progress bar
 */
export type IProgressBarConfigCore = TConfigBase;

/**
 * Configuration for question display
 */
export type IQuestionConfigCore  = TConfigBase;

/**
 * Configuration for buttons
 */
export type IButtonConfigCore  = TConfigBase;

/**
 * Configuration for navigation
 */
export type INavigationConfigCore  = TConfigBase;

export interface IPageConfigCore extends TConfigBase {
  visible?: boolean;
}

export type IPagesConfigCore  = TConfigBase;
