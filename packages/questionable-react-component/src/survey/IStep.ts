/* eslint-disable import/no-cycle */
import {
  IPageCore,
  IQuestionCore,
  IRequirementCore,
  IResponseCore,
  IStepCore,
  TAgeCore,
  TAgeCalcCore,
  TStepType,
  ISectionCore,
  PROGRESS_BAR_STATUS,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';
import { IButton }   from './IButton';

/**
 * Acceptable responses
 */
export interface IResponse extends IResponseCore {
  question: Partial<IQuestion>;
}

/**
 * Generic step data definition. Applies to all types of steps.
 */
export interface IStep extends IStepCore {
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
   * Collection of requirements to view/enter this step
   *
   * @title Requirements
   */
  entryRequirements?: IRequirement[];
  /**
   * Collection of requirements to leave this step
   *
   * @title Exit Requirements
   */
  exitRequirements?: IRequirement[];
  /**
   * Optional footer text to display at the bottom of the step
   *
   * @title Footer
   */
  footer?: string;
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
   * Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}
   *
   * @title Step Type
   */
  type: TStepType;
}

/**
 * Defines step content for Question type
 */

export type IQuestion = IStep & IQuestionCore;

/**
 * Defines step content for Page types
 */

export type IPage = IStep & IPageCore;

// export interface IQuestion extends IStep,
//   Pick<IQuestionCore, 'answer' | 'answers' | 'branch' | 'type'> {
//   /**
//    * The current answer for this question
//    *
//    * @title Answer
//    * @hidden Not viewable/editable in Design Mode
//    */
//   answer?: string;
//   /**
//    * Collection of allowed answers
//    *
//    * @title Answers
//    */
//   answers: IRef[];
//   /**
//    * Collection of branches that use this question
//    *
//    * @title Branch
//    * @hidden
//    */
//   branch?: Partial<IBranch>;
//   /**
//    * Type of question
//    *
//    * @title Question Type
//    */
//   type: QUESTION_TYPE;
// }

// /**
//  * Defines step content for Page types
//  */

// export interface IPage extends IStep,
//   Pick<IPageCore, 'body' | 'bodyHeader' | 'bodySubHeader' | 'type'> {
//   /**
//    * Defines the body content of the page
//    *
//    * @title Body
//    */
//   body?: string;
//   /**
//    * Optional header to display above body
//    *
//    * @title Body Heading
//    */
//   bodyHeader?: string;
//   /**
//    * Optional sub header to display below Body Heading
//    *
//    * @title Body Subheading
//    */
//   bodySubHeader?: string;
//   /**
//    * Type of page
//    *
//    * @title Page Type
//    */
//   type: PAGE_TYPE;
// }

/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirement extends IRequirementCore {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  ageCalc?: TAgeCalcCore;
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
  maxAge?: TAgeCore;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  minAge?: TAgeCore;
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
export interface ISection extends ISectionCore {
  /**
   * The last step id that is covered by this section
   *
   * @title Last Step
   * @hidden Not viewable/editable in Design Mode
   */
  lastStep?: number;
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
