/* eslint-disable import/no-cycle */
import { TStepType }    from '../lib/enums';
import { INavButton }   from './INavButton';
import { IRequirement } from './IRequirement';
import { ISection }     from './ISection';

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
