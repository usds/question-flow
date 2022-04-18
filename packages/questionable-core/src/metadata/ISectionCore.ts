import { IRefCore }               from './IRefCore';
import { IRequirementCore }       from './IRequirementCore';
import { TProgressBarStatusType } from './types/TProgressBarStatusType';
import { TSectionType }           from './properties/type/TSectionType';

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
  lastStep?: number;
  /**
   * Collection of requirements to enable display of this status
   *
   * @title Requirements
   */
  requirements?: IRequirementCore[];
  /**
   * Current display status of this section
   *
   * @title Status
   * @hidden Not viewable/editable in Design Mode
   */
  status?: TProgressBarStatusType;

  type?: TSectionType;
}
