import { IAnswerCore }   from './IAnswerCore';
import { IQuestionCore } from './IQuestionCore';
import { IRefCore }      from './IRefCore';
import { TResponseType } from './properties/type/TResponseType';

/**
 * Acceptable responses
 */
export interface IResponseCore extends IRefCore {
  answers: IAnswerCore[];
  question?: IQuestionCore;
  type?: TResponseType;
}
