/**
 * Defines the known component types for questions
 */
export enum QUESTION_TYPE {
  DATE_TIME = 'date_time',
  DEFAULT = 'default',
  DOB = 'dob',
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_SELECT = 'multiple_select',
  PATH = 'path',
  TEXT = 'text'
}

/**
 * Defines the known component types for pages
 */
export enum PAGE_TYPE {
  DEFAULT = 'default',
  LANDING = 'Landing',
  NO_RESULTS = 'No Results',
  RESULTS = 'Results',
  SUMMARY = 'Summary'
}

/**
 * Defines the known component types for pages
 */
export enum BASE {
  DEFAULT = 'default',
}

/**
 * Defines the known component types for design
 */
export enum DESIGN_TYPE {
  EDIT = 'Edit',
}

/**
 * Defines the type of step for UI rendering
 */
export const STEP_TYPE = {
  ...PAGE_TYPE, ...QUESTION_TYPE, ...DESIGN_TYPE, ...BASE,
};
export type TStepType = PAGE_TYPE | QUESTION_TYPE | DESIGN_TYPE | BASE;

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
  INCOMPLETE = 'incomplete',
}

export enum ACTION {
  CALL = 'call',
  DEFAULT = 'default',
  HYBRID = 'hybrid',
  NONE = 'none',
  ONLINE = 'online',
  SHELL = 'shell'
}

export enum ACTION_TYPE {
  DEFAULT = 'default',
  RERENDER = 'RERENDER',
  RESET = 'RESET',
  UNDO = 'undo',
  UPDATE = 'UPDATE'
}

export enum DATE_UNIT {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export enum MODE {
  DEV = 'dev',
  EDIT = 'edit',
  VIEW = 'view',
}
// eslint-disable-next-line @typescript-eslint/ban-types
export const isEnum = (enm: object, value: string): boolean =>
  Object.values(enm).includes(value);
