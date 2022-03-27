import {
  IButtonConfigCore,
  INavigationConfigCore,
  IPageConfigCore,
  IPagesConfigCore,
  IProgressBarConfigCore,
  IQuestionableConfigCore,
  IQuestionConfigCore,
  IStepConfigCore,
  MODE,
  TButtonModeCore,
  THorizontalPositionCore,
  TProgressBarTypeCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';
import { IButton } from './IButton';
import { IEvent }  from './IEvent';

/**
 * Configuration for customized behavior of Questionable
 */
export interface IQuestionableConfig extends IQuestionableConfigCore {
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
  events?: Partial<IEvent>;
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
  nav: Partial<INavigationConfig>;
  /**
   * Page configuration
   *
   * @title Pages
   */
  pages: Partial<IPagesConfig>,
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  progressBar?: Partial<IProgressBarConfig>;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  questions?: Partial<IQuestionConfig>;

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
export interface IStepConfig extends IStepConfigCore {
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
export interface IProgressBarConfig extends IProgressBarConfigCore {
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
  position: TVerticalPositionCore;
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
  type: TProgressBarTypeCore;
}

/**
 * Configuration for question display
 */
export interface IQuestionConfig extends IQuestionConfigCore {
  /**
   * Determines whether to show border on radios and checkboxes
   *
   * @title Show Answer Border
   * @default true
   */
  showAnswerBorder: boolean;
}

/**
 * Configuration for buttons
 */
export interface IButtonConfig extends IButton, IButtonConfigCore {
  /**
   * Default text to display if none is defined
   */
  defaultLabel: string;
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos: THorizontalPositionCore;
  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type: TButtonModeCore;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos: TVerticalPositionCore;
  /**
   * Toggle whether button is visible
   *
   * @title Visible
   */
  visible: boolean;
}

/**
 * Configuration for navigation
 */
export interface INavigationConfig extends INavigationConfigCore {
  /**
   * Next/Forward button
   */
  next: Partial<IButtonConfig>;
  /**
   * Previous/Go back button
   */
  prev: Partial<IButtonConfig>;
}

export interface IPageConfig extends IPageConfigCore {
  visible: boolean,
}

export interface IPagesConfig extends IPagesConfigCore {
  landing?: Partial<IPageConfig>,
  noresults?: Partial<IPageConfig>,
  results?: Partial<IPageConfig>,
  summary?: Partial<IPageConfig>
}
