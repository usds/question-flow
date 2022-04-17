/* eslint-disable import/no-cycle */
import { IRefCore }         from './IRefCore';
import { IRequirementCore } from './IRequirementCore';
import { ISectionCore }     from './ISectionCore';
import { TStepType }        from './Unions';

/**
 * Generic step data definition. Applies to all types of steps.
 */
export interface IStepCore extends IRefCore {
  /**
   * Collection of requirements to view/enter this step
   *
   * @title Requirements
   */
  entryRequirements?: IRequirementCore[];
  /**
   * Collection of requirements to leave this step
   *
   * @title Exit Requirements
   */
  exitRequirements?: IRequirementCore[];
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
  section?: ISectionCore;
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
