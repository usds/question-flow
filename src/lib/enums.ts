/**
 * Defines the known component types for questions
 */
export enum QUESTION_TYPE {
  DOB = 'dob',
  MULTIPLE_CHOICE = 'multiple_choice',
}

/**
 * Defines the known component types for pages
 */
export enum PAGE_TYPE {
  LANDING = 'Landing',
  NO_RESULTS = 'No Results',
  RESULTS = 'Results',
  SUMMARY = 'Summary',
}

/**
 * Defines the type of step for UI rendering
 */
export const STEP_TYPE = { ...PAGE_TYPE, ...QUESTION_TYPE };
export type TStepType = PAGE_TYPE | QUESTION_TYPE;

/**
 * Navigation direction for steps by array index (+1 or -1)
 */
export enum DIRECTION {
  FORWARD = 1,
  BACKWARD = -1,
}

/**
 * Progress Bar status
 */
export enum PROGRESS_BAR_STATUS {
  COMPLETE = 'complete',
  CURRENT = 'current',
}

export enum ACTION {
  CALL = 'call',
  HYBRID = 'hybrid',
  ONLINE = 'online',
}

export enum ACTION_TYPE {
  RESET = 'RESET',
  UPDATE = 'UPDATE',
}

export enum DATE_UNIT {
  day = 'day',
  month = 'month',
  year = 'year',
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEnum = (enm: object, value: string): boolean =>
  Object.values(enm).includes(value);
