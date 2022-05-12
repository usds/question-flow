export type TProgressBarStatusType = 'complete' | 'current' | 'incomplete';
type TEnmProgressBarStatusType = {
  COMPLETE: TProgressBarStatusType & 'complete';
  CURRENT: TProgressBarStatusType & 'current';
  INCOMPLETE: TProgressBarStatusType & 'incomplete';
};
/**
 * Progress Bar status
 */
export const PROGRESS_BAR_STATUS: TEnmProgressBarStatusType = {
  COMPLETE:   'complete',
  CURRENT:    'current',
  INCOMPLETE: 'incomplete',
};
