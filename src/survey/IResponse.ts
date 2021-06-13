import { IQuestion }       from './IQuestion';
import { IQuestionAnswer } from './IQuestionAnswer';

export interface IResponse {
  answers: Partial<IQuestionAnswer>[];
  question: Partial<IQuestion>;
}
