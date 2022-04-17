import { TResponseType } from '../util';
import { IAnswerCore }   from './IAnswerCore';
import { IQuestionCore } from './IQuestionCore';
import { IRefCore }      from './IRefCore';

/**
 * Acceptable responses
 */
export interface IResponseCore extends IRefCore {
  answers: IAnswerCore[];
  question?: IQuestionCore;
  type?: TResponseType;
}
