import { merge }           from 'lodash';
import { IQuestionAnswer } from '../../survey/IQuestionAnswer';

export class QuestionAnswer implements IQuestionAnswer {
  constructor(obj: Partial<QuestionAnswer>) {
    merge(this, obj);
  }

  id!: string;

  order?: number;

  title!: string;
}
