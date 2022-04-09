import { MODE }                                      from '../util/enums';
import { TGetDictionaryCore, TStringDictionaryCore } from '../util/types';
import { IEventCore }                                from './IEventCore';

type TVisible = {
  visible?: boolean | undefined,
};

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
  nav?: TVisible | undefined;
  /**
   * Page configuration
   *
   * @title Pages
   */
  pages?: TVisible | undefined;
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
  progressBar?: TVisible | undefined;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  questions?: TVisible | undefined;

  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: TVisible | undefined;
}
