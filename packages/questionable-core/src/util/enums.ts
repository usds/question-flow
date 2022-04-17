/* eslint-disable import/no-cycle */
type TBaseTypeDefaultName = 'default';
const DEFAULT: TBaseTypeDefaultName = 'default';
type TBaseType = { DEFAULT: TBaseTypeDefaultName };
const BASE_TYPE: TBaseType = { DEFAULT };

/**
 * Defines the known component types for questions
 */
type TQuestionTypeNames = 'date_time' | 'dob' | 'multiple_choice' | 'multiple_select' | 'path' | 'text';
type TQuestionType = TBaseType & {
  DATE_TIME: TQuestionTypeNames & 'date_time',
  DOB: TQuestionTypeNames & 'dob',
  MULTIPLE_CHOICE: TQuestionTypeNames & 'multiple_choice',
  MULTIPLE_SELECT: TQuestionTypeNames & 'multiple_select',
  PATH: TQuestionTypeNames & 'path',
  TEXT: TQuestionTypeNames & 'text',
};
const QUESTION_TYPE: TQuestionType = {
  ...BASE_TYPE,
  DATE_TIME:       'date_time',
  DOB:             'dob',
  MULTIPLE_CHOICE: 'multiple_choice',
  MULTIPLE_SELECT: 'multiple_select',
  PATH:            'path',
  TEXT:            'text',
};

/**
 * Defines the known component types for pages
 */
type TPageTypeNames = 'Landing' | 'No Results' | 'Results' | 'Summary';
type TPageType = TBaseType & {
  LANDING: TPageTypeNames & 'Landing',
  NO_RESULTS: TPageTypeNames & 'No Results',
  RESULTS: TPageTypeNames & 'Results',
  SUMMARY: TPageTypeNames & 'Summary',
}
const PAGE_TYPE: TPageType = {
  ...BASE_TYPE,
  LANDING:    'Landing',
  NO_RESULTS: 'No Results',
  RESULTS:    'Results',
  SUMMARY:    'Summary',
};

/**
 * Defines the known component types for design
 */
type TDesignTypeNames = 'Edit';
type TDesignType = TBaseType & {
  EDIT: TDesignTypeNames & 'Edit',
}
const DESIGN_TYPE: TDesignType = {
  ...BASE_TYPE,
  EDIT: 'Edit',
};

type TActionTypeNames = 'call' | 'hybrid' | 'none' | 'online' | 'shell';
type TActionType = TBaseType & {
  CALL: TActionTypeNames & 'call',
  HYBRID: TActionTypeNames & 'hybrid',
  NONE: TActionTypeNames & 'none',
  ONLINE: TActionTypeNames & 'online',
  SHELL: TActionTypeNames & 'shell',
}
const ACTION_TYPE: TActionType = {
  ...BASE_TYPE,
  CALL:   'call',
  HYBRID: 'hybrid',
  NONE:   'none',
  ONLINE: 'online',
  SHELL:  'shell',
};

type TOpTypeNames = 'RERENDER' | 'RESET' | 'undo' | 'UPDATE';
type TOpType = TBaseType & {
  RERENDER: TOpTypeNames & 'RERENDER',
  RESET: TOpTypeNames &  'RESET',
  UNDO: TOpTypeNames &  'undo',
  UPDATE: TOpTypeNames &  'UPDATE',
}
const OP_TYPE: TOpType = {
  ...BASE_TYPE,
  RERENDER: 'RERENDER',
  RESET:    'RESET',
  UNDO:     'undo',
  UPDATE:   'UPDATE',
};

type TBranchTypeNames = 'linear' | 'non-linear';
type TBranchType = TBaseType & {
  LINEAR: TBranchTypeNames & 'linear',
  NON_LINEAR: TBranchTypeNames & 'non-linear',
}
const BRANCH_TYPE: TBranchType = {
  ...BASE_TYPE,
  LINEAR:     'linear',
  NON_LINEAR: 'non-linear',
};

type TButtonTypeNames = 'button' | 'link';
type TButtonType = TBaseType & {
  BUTTON: TButtonTypeNames & 'button',
  LINK: TButtonTypeNames & 'link'
};
const BUTTON_TYPE: TButtonType = {
  ...BASE_TYPE,
  BUTTON: 'button',
  LINK:   'link',
};

type TResultTypeNames = 'match' | 'non-match';
type TResultType = TBaseType & {
  MATCH: TResultTypeNames & 'match',
  NON_MATCH: TResultTypeNames & 'non-match';
}
const RESULT_TYPE: TResultType = {
  ...BASE_TYPE,
  MATCH:     'match',
  NON_MATCH: 'non-match',
};

type TResponseTypeNames = 'complete' | 'incomplete';
type TResponseType = TBaseType & {
  COMPLETE: TResponseTypeNames & 'complete',
  INCOMPLETE: TResponseTypeNames & 'incomplete'
}
const RESPONSE_TYPE: TResponseType = {
  ...BASE_TYPE,
  COMPLETE:   'complete',
  INCOMPLETE: 'incomplete',
};

type TRequirementTypeNames = 'required' | 'non-required';
type TRequirementType = TBaseType & {
  NON_REQUIRED: TRequirementTypeNames & 'non-required',
  REQUIRED: TRequirementTypeNames & 'required'
}
const REQUIREMENT_TYPE: TRequirementType = {
  ...BASE_TYPE,
  NON_REQUIRED: 'non-required',
  REQUIRED:     'required',
};

type TAnswerTypeNames = 'fixed' | 'variable';
type TAnswerType = TBaseType & {
  FIXED: TAnswerTypeNames & 'fixed',
  VARIABLE: TAnswerTypeNames & 'variable',
}
const ANSWER_TYPE: TAnswerType = {
  ...BASE_TYPE,
  FIXED:    'fixed',
  VARIABLE: 'variable',
};

type TSectionTypeNames = 'locked' | 'unlocked';
type TSectionType = TBaseType & {
  LOCKED: TSectionTypeNames & 'locked',
  UNLOCKED: TSectionTypeNames & 'unlocked',
}
const SECTION_TYPE: TSectionType = {
  ...BASE_TYPE,
  LOCKED:   'locked',
  UNLOCKED: 'unlocked',
};

// Aggregate types

/**
 * Defines the type of step for UI rendering
 */
const STEP_TYPE = {
  ...PAGE_TYPE,
  ...QUESTION_TYPE,
  ...DESIGN_TYPE,
  ...BASE_TYPE,
};
// type TStepType = TPageType | TQuestionType | TDesignType | TBaseType;
type TStepTypeNames = TPageTypeNames | TQuestionTypeNames | TDesignTypeNames | TBaseTypeDefaultName;

const REF_TYPE = {
  ...STEP_TYPE,
  ...ACTION_TYPE,
  ...ANSWER_TYPE,
  ...BRANCH_TYPE,
  ...BUTTON_TYPE,
  ...OP_TYPE,
  ...RESULT_TYPE,
  ...REQUIREMENT_TYPE,
  ...RESPONSE_TYPE,
  ...SECTION_TYPE,
};

// type TRefType = TStepType | TActionType
//   | TButtonType | TRequirementType
//   | TResponseType | TResultType
//   | TAnswerType | TBranchType;
type TRefTypeNames = TStepTypeNames | TActionTypeNames
| TButtonTypeNames | TRequirementTypeNames
| TResponseTypeNames | TResultTypeNames
| TAnswerTypeNames | TBranchTypeNames
| TSectionTypeNames;

// eslint-disable-next-line @typescript-eslint/ban-types
const isEnum = (enm: object, value: string): boolean =>
  Object.values(enm).includes(value);

// Traditional enums

 enum DATE_UNIT {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

 enum MODE {
  DEV = 'dev',
  EDIT = 'edit',
  VIEW = 'view',
}

/**
 * Navigation direction for steps by array index (+1 or -1)
 */
 enum DIRECTION {
  FORWARD = 1,
  BACKWARD = -1,
}

type TProgressBarStatusTypeNames = 'complete' | 'current' | 'incomplete';
type TProgressBarStatusType = {
  COMPLETE: TProgressBarStatusTypeNames & 'complete',
  CURRENT: TProgressBarStatusTypeNames & 'current',
  INCOMPLETE: TProgressBarStatusTypeNames & 'incomplete',
}

/**
 * Progress Bar status
 */
const PROGRESS_BAR_STATUS: TProgressBarStatusType = {
  COMPLETE:   'complete',
  CURRENT:    'current',
  INCOMPLETE: 'incomplete',
};

export {
  ACTION_TYPE,
  ANSWER_TYPE,
  BASE_TYPE,
  BRANCH_TYPE,
  BUTTON_TYPE,
  DATE_UNIT,
  DESIGN_TYPE,
  DIRECTION,
  isEnum,
  MODE,
  OP_TYPE,
  PAGE_TYPE,
  PROGRESS_BAR_STATUS,
  QUESTION_TYPE,
  REF_TYPE,
  REQUIREMENT_TYPE,
  RESPONSE_TYPE,
  RESULT_TYPE,
  SECTION_TYPE,
  STEP_TYPE,
  type TActionTypeNames as TActionType,
  type TAnswerTypeNames as TAnswerType,
  type TBranchTypeNames as TBranchType,
  type TButtonTypeNames as TButtonType,
  type TOpTypeNames as TOpType,
  type TPageTypeNames as TPageType,
  type TProgressBarStatusTypeNames as TProgressBarStatusType,
  type TQuestionTypeNames as TQuestionType,
  type TRefTypeNames as TRefType,
  type TRequirementTypeNames as TRequirementType,
  type TResponseTypeNames as TResponseType,
  type TResultTypeNames as TResultType,
  type TStepTypeNames as TStepType,
  type TSectionTypeNames as TSectionType,
};
