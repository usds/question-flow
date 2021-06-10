/**
 * Defines the known component types for questions
 */
export enum QUESTION_TYPE {
  DOB = 'dob',
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_SELECT = 'multiple_select',
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
 * Defines the known component types for design
 */
export enum DESIGN_TYPE {
  EDIT = 'Edit',
}

/**
 * Defines the type of step for UI rendering
 */
export const STEP_TYPE = { ...PAGE_TYPE, ...QUESTION_TYPE, ...DESIGN_TYPE };
export type TStepType = PAGE_TYPE | QUESTION_TYPE | DESIGN_TYPE;

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
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export enum MODE {
  DEV = 'dev',
  EDIT = 'edit',
  VIEW = 'view'
}

export enum CSS_CLASS {
  BASE = 'usds-q',
  DEV_PANEL_SECTION = 'usds-q-dev-panel',
  DOB = 'usds-q-dob',
  MULTI_CHOICE = 'usds-q-multi-choice',
  MULTI_CHOICE_GROUP = 'usds-q-multi-choice-group',
  MULTI_SELECT = 'usds-q-multi-select',
  MULTI_SELECT_GROUP = 'usds-q-multi-select-group',
  NAVBAR = 'usds-q-navbar',
  PROGRESS_BAR = 'usds-q-progress-bar',
  PROGRESS_BAR_BOTTOM_SECTION = 'usds-q-progress-bar-bottom-section',
  PROGRESS_BAR_TOP_SECTION = 'usds-q-progress-bar-top-section',
  RESULTS_SUMMARY_BOX = 'usds-q-results-summary-box',
  RESULTS_SUMMARY_HEADER = 'usds-q-results-summary-header',
  STEP_LAYOUT = 'usds-q-step-layout',
  STEP_LAYOUT_SECTION = 'usds-q-step-layout-section'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isEnum = (enm: object, value: string): boolean =>
  Object.values(enm).includes(value);
