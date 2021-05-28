import { PROGRESS_BAR_STATUS } from '../lib/enums';
import { IRequirement } from './IRequirement';

/**
 * Defines a survey section
 */
export interface ISection {
  id: string;
  name: string;
  requirements: IRequirement[];
  lastStep?: number;
  status?: PROGRESS_BAR_STATUS;
}
