import { IQuestionCore } from '../IQuestionCore';
import { IResponseCore } from '../IResponseCore';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */

export type TAnswerDataCore = {
  answer: string;
  responses: IResponseCore[] | IQuestionCore[];
  /**
   * @hidden
   */
  step: IQuestionCore;
};
