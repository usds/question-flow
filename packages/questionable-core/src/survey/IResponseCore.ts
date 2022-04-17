import { IAnswerCore }                       from './IAnswerCore';
import { IQuestionCore }                     from './IQuestionCore';
import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';

export type TResponseType = 'complete' | 'incomplete';
type TEnmResponseType = TEnmBaseType & {
  COMPLETE: TResponseType & 'complete',
  INCOMPLETE: TResponseType & 'incomplete'
}
export const RESPONSE_TYPE: TEnmResponseType = {
  ...BASE_TYPE,
  COMPLETE:   'complete',
  INCOMPLETE: 'incomplete',
};

/**
 * Acceptable responses
 */
export interface IResponseCore extends IRefCore {
  answers: IAnswerCore[];
  question?: IQuestionCore;
  type?: TResponseType;
}
