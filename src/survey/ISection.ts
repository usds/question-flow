import { PROGRESS_BAR_STATUS } from '../lib/enums';
import { IRequirement }        from './IRequirement';

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
