import {
  IButtonConfigCore,
  INavigationConfigCore,
  IProgressBarConfigCore,
  QuestionableConfigCore,
  IQuestionConfigCore,
  IStepConfigCore,
  TButtonModeCore,
  THorizontalPositionCore,
  TProgressBarTypeCore,
  TVerticalPositionCore,
} from '@usds.gov/questionable-core';
import { IButton } from './IButton';

/**
 * Configuration for customized behavior of Questionable
 */
export type IQuestionableConfig = QuestionableConfigCore & {
  /**
   * Navigation configuration
   *
   * @title Navigation
   */
  nav?: Partial<INavigationConfig> | undefined;
  /**
   * Page configuration
   *
   * @title Pages
   */
  pages?: Partial<IPagesConfig>| undefined,
  /**
   * Progress Bar configuration
   *
   * @title Progress Bar
   */
  progressBar?: Partial<IProgressBarConfig>| undefined;
  /**
   * Question configuration
   *
   * @title Question Configuration
   */
  questions?: Partial<IQuestionConfig>| undefined;

  /**
   * Step configuration
   *
   * @title Step Configuration
   */
  steps?: Partial<IStepConfig>| undefined;
}

/**
 * Customizations for styling and formatting of the steps
 */
export type IStepConfig = IStepConfigCore & {
  /**
   * Class determines whether cards have borders
   *
   * @title Border Class
   * @default 'border-0'
   */
  borderClass?: 'border-ink' | 'border-0';
  /**
   * Toggles whether steps' ids are shown next to the question text
   *
   * @title Show Step Id
   * @default false
   */
  showStepId?: boolean | undefined;
  /**
   * Class to apply to title. Use to add background to question text
   *
   * @title Title Class
   * @default ''
   */
  titleClass?: 'bg-base-lightest' | '';
}

/**
 * Configuration options for the progress bar
 */
export type IProgressBarConfig = IProgressBarConfigCore & {
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

/**
 * Configuration for question display
 */
export type IQuestionConfig = IQuestionConfigCore & {
  /**
   * Determines whether to show border on radios and checkboxes
   *
   * @title Show Answer Border
   * @default true
   */
  showAnswerBorder?: boolean | undefined;
}

/**
 * Configuration for buttons
 */
export type IButtonConfig = IButton & IButtonConfigCore & {
  /**
   * Default text to display if none is defined
   */
  defaultLabel?: string | undefined;
  /**
   * Horizontal orientation (left or right)
   *
   * @title Horizontal Position
   * @default left
   */
  horizontalPos?: THorizontalPositionCore | undefined;
  /**
   * Render mode (link or button)
   *
   * @title Mode
   */
  type?: TButtonModeCore | undefined;
  /**
   * Vertical orientation (top or bottom)
   *
   * @title Vertical Position
   */
  verticalPos?: TVerticalPositionCore | undefined;
  /**
   * Toggle whether button is visible
   *
   * @title Visible
   */
  visible?: boolean | undefined;
}

/**
 * Configuration for navigation
 */
export type INavigationConfig = INavigationConfigCore & {
  /**
   * Next/Forward button
   */
  next?: Partial<IButtonConfig> | undefined;
  /**
   * Previous/Go back button
   */
  prev?: Partial<IButtonConfig> | undefined;
}
