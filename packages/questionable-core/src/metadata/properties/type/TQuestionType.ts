import { BASE_TYPE, TEnmBaseType } from './TBaseType';

/**
 * Defines the known component types for questions
 */

export type TQuestionType = 'date_time' | 'dob' | 'multiple_choice' | 'multiple_select' | 'path' | 'text';
type TEnmQuestionType = TEnmBaseType & {
  DATE_TIME: TQuestionType & 'date_time';
  DOB: TQuestionType & 'dob';
  MULTIPLE_CHOICE: TQuestionType & 'multiple_choice';
  MULTIPLE_SELECT: TQuestionType & 'multiple_select';
  PATH: TQuestionType & 'path';
  TEXT: TQuestionType & 'text';
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
