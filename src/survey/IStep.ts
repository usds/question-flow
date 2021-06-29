/* eslint-disable import/no-cycle */
import { ReactNode } from 'react';
import {
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  TStepType,
} from '../lib/enums';
import { TAge, TAgeCalc }  from '../lib/types';
import { IButton }      from './IButton';
import { IQuestionAnswer } from './IQuestionAnswer';

/**
 * Acceptable responses
 */
export interface IResponse {
  answers: Partial<IQuestionAnswer>[];
  question: Partial<IQuestion>;
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
    next?: IButton;
    /**
     * Previous / Back button
     *
     * @title Prev Button
     * @default { label: 'Prev' }
     */
    prev?: IButton;
  };
  /**
   * React children to append to the title area
   *
   * @hidden
   */
  children?: ReactNode;
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
   * Display order of the Step. Determined at runtime.
   *
   * @title Order
   * @hidden
   */
  order?: number;
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
 * Defines an individual requirement for accessing a step
 */
export interface IRequirement {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  ageCalc?: TAgeCalc;
  /**
   * User facing description of this requirement
   *
   * @title Exlanation
   */
  explanation?: string;
  /**
   * Optional maximum age allowed for this requirement
   *
   * @title Maximum Age
   */
  maxAge?: TAge;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  minAge?: TAge;
  /**
   * Map of step id to required answer values
   *
   * @title Answers
   */
  responses: IResponse[];
}

/**
 * Defines a survey section, used in progress bar
 */
export interface ISection {
  /**
   * Unique identifier
   *
   * @title Id
   * @hidden Not viewable/editable in Design Mode
   */
  id: string;
  /**
   * The last step id that is covered by this section
   *
   * @title Last Step
   * @hidden Not viewable/editable in Design Mode
   */
  lastStep?: number;
  /**
   * The display name of this section
   *
   * @title Name
   */
  name: string;
  /**
   * Collection of requirements to enable display of this status
   *
   * @title Requirements
   */
  requirements: IRequirement[];
  /**
   * Current display status of this section
   *
   * @title Status
   * @hidden Not viewable/editable in Design Mode
   */
  status?: PROGRESS_BAR_STATUS;
}
