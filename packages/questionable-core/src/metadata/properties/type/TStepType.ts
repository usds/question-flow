import { PAGE_TYPE, TPageType }         from './TPageType';
import { QUESTION_TYPE, TQuestionType } from './TQuestionType';
import { BASE_TYPE, TBaseType }         from './TBaseType';

// type TStepType = TEnmPageType | TEnmQuestionType | TDesignType | TEnmBase;

export type TStepType = TPageType | TQuestionType | TBaseType;
/**
 * Defines the type of step for UI rendering
 */
export const STEP_TYPE = {
  ...PAGE_TYPE,
  ...QUESTION_TYPE,
  ...BASE_TYPE,
};
