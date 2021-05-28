/**
 * Special constants for the first, summary and last steps
 */
export enum STEP_TYPE {
  DOB = 'dob',
  MULTIPLE_CHOICE = 'multiple_choice',
}

export enum PAGE_TYPE {
  LANDING_STEP = 'Landing',
  NO_RESULTS_STEP = 'No Results',
  RESULTS_STEP = 'Results',
  SUMMARY_STEP = 'Summary',
}

/**
 * Defines the type of step for UI rendering
 */
export const QUESTION_TYPE = { ...PAGE_TYPE, ...STEP_TYPE };
export type TQuestionType = PAGE_TYPE | STEP_TYPE;

/**
 * Navigation direction for steps by array index (+1 or -1)
 */
export enum DIRECTION {
  forward = 1,
  backward = -1,
}

/**
 * Progress Bar status
 */
export enum PROGRESS_BAR_STATUS {
  complete = 'complete',
  current = 'current',
}

export enum ACTION {
  online = 'online',
  call = 'call',
  hybrid = 'hybrid',
}
