import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';
import { IRequirementCore }                  from './IRequirementCore';

export type TSectionType = 'locked' | 'unlocked';
type TEnmSectionType = TEnmBaseType & {
  LOCKED: TSectionType & 'locked',
  UNLOCKED: TSectionType & 'unlocked',
}
export const SECTION_TYPE: TEnmSectionType = {
  ...BASE_TYPE,
  LOCKED:   'locked',
  UNLOCKED: 'unlocked',
};

export type TProgressBarStatusType = 'complete' | 'current' | 'incomplete';
type TEnmProgressBarStatusType = {
  COMPLETE: TProgressBarStatusType & 'complete',
  CURRENT: TProgressBarStatusType & 'current',
  INCOMPLETE: TProgressBarStatusType & 'incomplete',
}
/**
 * Progress Bar status
 */
export const PROGRESS_BAR_STATUS: TEnmProgressBarStatusType = {
  COMPLETE:   'complete',
  CURRENT:    'current',
  INCOMPLETE: 'incomplete',
};

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
