import { TAge } from '../lib/types';
import { IQuestion } from './IQuestion';

export interface IAnswerList {
  [key: string]: IQuestion;
}

export interface IAnswer {
  readonly started: Date;
  finished?: Date;
  birthdate?: string;
  age?: TAge;
  answers: IAnswerList;
}
