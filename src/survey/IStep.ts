import { PAGE_TYPE, QUESTION_TYPE, TStepType } from '../lib/enums';
import { IRequirement }                        from './IRequirement';
import { ISection }                            from './ISection';

/**
 * Defines required pages for the survey flow
 */
export interface IPages {
  /**
   * First step of the survey
   *
   * @title Landing Page
   */
  readonly landingPage: IPage;
  /**
   * Last step of the survey if there are 0 results
   *
   * @title No Results Page
   */
  readonly noResultsPage: IPage;
  /**
   * Last step of the survey if there are 1 or more results
   *
   * @title Results Page
   */
  readonly resultsPage: IPage;
  /**
   * Preview of survery before submitting to receive results
   *
   * @title Summary Page
   */
  readonly summaryPage: IPage;
}

/**
 * Defines step content for Page types
 */
export interface IPage extends IStep {
  /**
   * Defines the body content of the page
   *
   * @title Body
   */
  body?: string;
  /**
   * Optional header to display above body
   *
   * @title Body Heading
   */
  bodyHeader?: string;
  /**
   * Optional sub header to display below Body Heading
   *
   * @title Body Subheading
   */
  bodySubHeader?: string;
  /**
   * Type of page
   *
   * @title Page Type
   */
  type: PAGE_TYPE;
}

/**
 * Definition for answers to questions
 */
export interface IQuestionAnswer {
  id: string;
  order?: number;
  title: string;
}

/**
 * Defines step content for Question type
 */
export interface IQuestion extends IStep {
  /**
   * The current answer for this question
   *
   * @title Answer
   * @hidden Not viewable/editable in Design Mode
   */
  answer?: string;
  /**
   * Collection of allowed answers
   *
   * @title Answers
   */
  answers: IQuestionAnswer[];
  /**
   * Type of question
   *
   * @title Question Type
   */
  type: QUESTION_TYPE;
}

/**
 * Represents a navigation button
 */
export interface INavButton {
  /**
   * Text to display on button (e.g. 'Prev' or 'Next')
   */
  label: string;
}

/**
 * Generic step data definition. Applies to all types of steps.
 */
export interface IStep {
  /**
   * Collection of navigation buttons
   *
   * @title Buttons
   */
  buttons?: {
    /**
     * Next button
     *
     * @title Next Button
     * @default { label: 'Next' }
     */
    next?: INavButton;
    /**
     * Previous / Back button
     *
     * @title Prev Button
     * @default { label: 'Prev' }
     */
    prev?: INavButton;
  };
  /**
   * Optional footer text to display at the bottom of the step
   *
   * @title Footer
   */
  footer?: string;
  /**
   * Unique identifier
   *
   * @title Id
   * @hidden Not viewable/editable in Design Mode
   */
  id: string;
  /**
   * Contextual content to display below the step contents and above the footer
   *
   * @title Info
   */
  info?: string;
  /**
   * Private/internal use only notes for documenting this step
   *
   * @title Internal Notes
   */
  internalNotes?: string;
  /**
   * Collection of requirements to view this step
   *
   * @title Requirements
   */
  requirements?: IRequirement[];
  /**
   * Section to which this step belongs
   *
   * @title Section
   */
  section: Partial<ISection>;
  /**
   * Text to display below the title
   *
   * @title Subtitle
   */
  subTitle?: string;
  /**
   * Display name of the step
   *
   * @title Title
   */
  title: string;
  /**
   * Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}
   *
   * @title Step Type
   */
  type: TStepType;
}
