/* eslint-disable import/no-cycle */
import {
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  TStepType,
} from '../util/enums';
import { TAgeCalcCore, TAgeCore } from '../util/types';
import { IAnswerCore }            from './IAnswerCore';
import { IBranchCore }            from './IBranchCore';
import { IRefCore }               from './IRefCore';

/**
 * Acceptable responses
 */
export interface IResponseCore extends IRefCore {
  answers: IAnswerCore[];
  question?: IQuestionCore;
}

/**
 * Generic step data definition. Applies to all types of steps.
 */
export interface IStepCore extends IRefCore {
  /**
   * Collection of requirements to view/enter this step
   *
   * @title Requirements
   */
  entryRequirements?: IRequirementCore[] | undefined;
  /**
   * Collection of requirements to leave this step
   *
   * @title Exit Requirements
   */
  exitRequirements?: IRequirementCore[] | undefined;
  /**
   * Optional footer text to display at the bottom of the step
   *
   * @title Footer
   */
  footer?: string | undefined;
  /**
   * Contextual content to display below the step contents and above the footer
   *
   * @title Info
   */
  info?: string | undefined;
  /**
   * Private/internal use only notes for documenting this step
   *
   * @title Internal Notes
   */
  internalNotes?: string | undefined;
  /**
   * Display order of the Step. Determined at runtime.
   *
   * @title Order
   * @hidden
   */
  order?: number | undefined;
  /**
   * Section to which this step belongs
   *
   * @title Section
   */
  section?: ISectionCore | undefined;
  /**
   * Text to display below the title
   *
   * @title Subtitle
   */
  subTitle?: string | undefined;
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

export interface IQuestionCore extends IStepCore {
  /**
   * The current answer for this question
   *
   * @title Answer
   * @hidden Not viewable/editable in Design Mode
   */
  answer?: string | undefined;
  /**
   * Collection of allowed answers
   *
   * @title Answers
   */
  answers: IAnswerCore[];
  /**
   * Collection of branches that use this question
   *
   * @title Branch
   * @hidden
   */
  branch?: IBranchCore | undefined;
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

export interface IPageCore extends IStepCore {
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
  display: boolean;
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
export interface IRequirementCore extends IRefCore {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  ageCalc?: TAgeCalcCore | undefined;
  /**
   * User facing description of this requirement
   *
   * @title Exlanation
   */
  explanation: string;
  /**
   * Optional maximum age allowed for this requirement
   *
   * @title Maximum Age
   */
  maxAge?: TAgeCore | undefined;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  minAge?: TAgeCore | undefined;
  /**
   * Map of step id to required answer values
   *
   * @title Answers
   */
  responses: IResponseCore[];
}

/**
 * Defines a survey section, used in progress bar
 */
export interface ISectionCore extends IRefCore {
  /**
   * The last step id that is covered by this section
   *
   * @title Last Step
   * @hidden Not viewable/editable in Design Mode
   */
  lastStep?: number | undefined;
  /**
   * Collection of requirements to enable display of this status
   *
   * @title Requirements
   */
  requirements?: IRequirementCore[] | undefined;
  /**
   * Current display status of this section
   *
   * @title Status
   * @hidden Not viewable/editable in Design Mode
   */
  status?: PROGRESS_BAR_STATUS | undefined;
}
