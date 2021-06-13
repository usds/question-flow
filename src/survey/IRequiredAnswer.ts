import { IQuestion }       from './IQuestion';
import { IQuestionAnswer } from './IQuestionAnswer';

export interface IRequiredAnswer {
  answers: Partial<IQuestionAnswer>[];
  question: Partial<IQuestion>;
}
