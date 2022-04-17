/**
 * Defines step content for Question type
 */

import { TQuestionType } from '../util/enums';
import { IAnswerCore }   from './IAnswerCore';
import { IBranchCore }   from './IBranchCore';
import { IStepCore }     from './IStepCore';

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
