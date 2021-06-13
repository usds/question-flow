import { QUESTION_TYPE }   from '../lib/enums';
import { IQuestionAnswer } from './IQuestionAnswer';
import { IStep }           from './IStep';

/**
 * Defines step content for Question type
 */

export interface IQuestion extends IStep {
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
  answers: IQuestionAnswer[];
  /**
   * Type of question
   *
   * @title Question Type
   */
  type: QUESTION_TYPE;
}
