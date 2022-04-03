/* eslint-disable import/no-cycle */
import {
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  TStepType,
} from '../util/enums';
import {
  TAgeCore,
  TAgeCalcCore,
} from '../util/types';
import { IBranchCore } from './IBranchCore';
import {
  IRefCore,
} from './IRefCore';
import { EResponseCoreProperties as rp }     from '../metadata/MResponse';
import { EStepCoreProperties as sp }         from '../metadata/MStep';
import { EQuestionCoreProperties as qp }     from '../metadata/MQuestion';
import { EPageCoreProperties as pp }         from '../metadata/MPage';
import { ERequirementCoreProperties as rqp } from '../metadata/MRequirement';
import { ESectionCoreProperties as scp }     from '../metadata/MSection';

/**
 * Acceptable responses
 */
export interface IResponseCore {
  [rp.answers]: Partial<IRefCore>[];
  [rp.question]: Partial<IQuestionCore>;
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
  [sp.entryRequirements]?: IRequirementCore[];
  /**
   * Collection of requirements to leave this step
   *
   * @title Exit Requirements
   */
  [sp.exitRequirements]?: IRequirementCore[];
  /**
   * Optional footer text to display at the bottom of the step
   *
   * @title Footer
   */
  [sp.footer]?: string;
  /**
   * Contextual content to display below the step contents and above the footer
   *
   * @title Info
   */
  [sp.info]?: string;
  /**
   * Private/internal use only notes for documenting this step
   *
   * @title Internal Notes
   */
  [sp.internalNotes]?: string;
  /**
   * Display order of the Step. Determined at runtime.
   *
   * @title Order
   * @hidden
   */
  [sp.order]?: number;
  /**
   * Section to which this step belongs
   *
   * @title Section
   */
  [sp.section]: Partial<ISectionCore>;
  /**
   * Text to display below the title
   *
   * @title Subtitle
   */
  [sp.subTitle]?: string;
  /**
   * Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}
   *
   * @title Step Type
   */
  [sp.type]: TStepType;
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
  [qp.answer]?: string;
  /**
   * Collection of allowed answers
   *
   * @title Answers
   */
  [qp.answers]: IRefCore[];
  /**
   * Collection of branches that use this question
   *
   * @title Branch
   * @hidden
   */
  [qp.branch]?: Partial<IBranchCore>;
  /**
   * Type of question
   *
   * @title Question Type
   */
  [qp.type]: QUESTION_TYPE;
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
  [pp.body]?: string;
  /**
   * Optional header to display above body
   *
   * @title Body Heading
   */
  [pp.bodyHeader]?: string;
  /**
   * Optional sub header to display below Body Heading
   *
   * @title Body Subheading
   */
  [pp.bodySubHeader]?: string;
  /**
   * Type of page
   *
   * @title Page Type
   */
  [pp.type]: PAGE_TYPE;
}

/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirementCore extends IRefCore {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  [rqp.ageCalc]?: TAgeCalcCore;
  /**
   * User facing description of this requirement
   *
   * @title Exlanation
   */
  [rqp.explanation]?: string;
  /**
   * Optional maximum age allowed for this requirement
   *
   * @title Maximum Age
   */
  [rqp.maxAge]?: TAgeCore;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  [rqp.minAge]?: TAgeCore;
  /**
   * Map of step id to required answer values
   *
   * @title Answers
   */
  [rqp.responses]: IResponseCore[];
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
  [scp.lastStep]?: number;
  /**
   * Collection of requirements to enable display of this status
   *
   * @title Requirements
   */
  [scp.requirements]: IRequirementCore[];
  /**
   * Current display status of this section
   *
   * @title Status
   * @hidden Not viewable/editable in Design Mode
   */
  [scp.status]?: PROGRESS_BAR_STATUS;
}
