import { PROGRESS_BAR_STATUS } from '../lib/enums';
import { IRequirement }        from './IRequirement';

/**
 * Defines a survey section
 */
export interface ISection {
  id: string;
  lastStep?: number;
  name: string;
  requirements: IRequirement[];
  status?: PROGRESS_BAR_STATUS;
}
