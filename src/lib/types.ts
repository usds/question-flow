/*
 * Defines an age relative to a date
 */
export type TAge = {
  years: number;
  months: number;
  days?: number;
};

/**
 * Lambda that can be called to compute an age requirement
 */
export type TAgeCalc = (birthdate: string) => boolean;

/**
 * List of possible answers to the question.
 * Maps answer as string value to index number of question
 */
export type TAnswerMap = {
  [key: number]: string;
};

/**
 * Expresses a collection of answer requirements.
 * Unique keys are joined together by `AND`.
 * Keys represent a collection of allowed answer values joined by `OR`.
 */
export type TAnswers = {
  [key: string]: number[];
};

/**
 * Map sections to their last step by index
 */
export type TSectionMap = {
  [key: string]: number;
};

export type TActionType = 'RESET' | 'UPDATE';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TReducer = (...params: any) => void;
