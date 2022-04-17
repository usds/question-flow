// Aggregate types
import { ACTION_TYPE, TActionType }           from './IActionCore';
import { ANSWER_TYPE, TAnswerType }           from './IAnswerCore';
import { BRANCH_TYPE, TBranchType }           from './IBranchCore';
import { BUTTON_TYPE, TButtonType }           from './IButtonCore';
import { PAGE_TYPE, TPageType }               from './IPageCore';
import { QUESTION_TYPE, TQuestionType }       from './IQuestionCore';
import { BASE_TYPE, TBaseType, TEnmBaseType } from './IRefCore';
import { REQUIREMENT_TYPE, TRequirementType } from './IRequirementCore';
import { RESPONSE_TYPE, TResponseType }       from './IResponseCore';
import { RESULT_TYPE, TResultType }           from './IResultCore';
import { SECTION_TYPE, TSectionType }         from './ISectionCore';

/**
 * Defines the known component types for design
 */
export type TDesignType = 'Edit';
type TEnmDesignType = TEnmBaseType & {
  EDIT: TDesignType & 'Edit',
}
export const DESIGN_TYPE: TEnmDesignType = {
  ...BASE_TYPE,
  EDIT: 'Edit',
};

export type TOpType = 'RERENDER' | 'RESET' | 'undo' | 'UPDATE';
type TEnmOpType = TEnmBaseType & {
  RERENDER: TOpType & 'RERENDER',
  RESET: TOpType &  'RESET',
  UNDO: TOpType &  'undo',
  UPDATE: TOpType &  'UPDATE',
}
export const OP_TYPE: TEnmOpType = {
  ...BASE_TYPE,
  RERENDER: 'RERENDER',
  RESET:    'RESET',
  UNDO:     'undo',
  UPDATE:   'UPDATE',
};

/**
 * Defines the type of step for UI rendering
 */
export const STEP_TYPE = {
  ...PAGE_TYPE,
  ...QUESTION_TYPE,
  ...DESIGN_TYPE,
  ...BASE_TYPE,
};
// type TStepType = TEnmPageType | TEnmQuestionType | TDesignType | TEnmBase;
export type TStepType = TPageType | TQuestionType | TDesignType | TBaseType;

export const REF_TYPE = {
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
export type TRefType = TStepType
| TActionType
| TAnswerType
| TBranchType
| TButtonType
| TRequirementType
| TResponseType
| TResultType
| TSectionType
