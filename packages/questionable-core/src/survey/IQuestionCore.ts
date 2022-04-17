/**
 * Defines step content for Question type
 */

import { IAnswerCore }             from './IAnswerCore';
import { IBranchCore }             from './IBranchCore';
import { BASE_TYPE, TEnmBaseType } from './IRefCore';
import { IStepCore }               from './IStepCore';

/**
 * Defines the known component types for questions
 */
export type TQuestionType = 'date_time' | 'dob' | 'multiple_choice' | 'multiple_select' | 'path' | 'text';
type TEnmQuestionType = TEnmBaseType & {
  DATE_TIME: TQuestionType & 'date_time',
  DOB: TQuestionType & 'dob',
  MULTIPLE_CHOICE: TQuestionType & 'multiple_choice',
  MULTIPLE_SELECT: TQuestionType & 'multiple_select',
  PATH: TQuestionType & 'path',
  TEXT: TQuestionType & 'text',
};
export const QUESTION_TYPE: TEnmQuestionType = {
  ...BASE_TYPE,
  DATE_TIME:       'date_time',
  DOB:             'dob',
  MULTIPLE_CHOICE: 'multiple_choice',
  MULTIPLE_SELECT: 'multiple_select',
  PATH:            'path',
  TEXT:            'text',
};

export interface IQuestionCore extends IStepCore {
  /**
   * The current answer for this question
   *
   * @title Answer
   * @hidden Not viewable/editable in Design Mode
   */
  answer?: string;
  /**
   * Collection of allowed answers
   *
   * @title Answers
   */
  answers: IAnswerCore[];
  /**
   * Collection of branches that use this question
   *
   * @title Branch
   * @hidden
   */
  branch?: IBranchCore;
  /**
   * Type of question
   *
   * @title Question Type
   */
  type: TQuestionType;
}
