import { TAge }      from '../lib/types';
import { IQuestion } from './IStep';

export interface IAnswerList {
  [key: string]: IQuestion;
}

export interface IAnswer {
  age?: TAge;
  answers: IAnswerList;
  birthdate?: string;
  finished?: Date;
  readonly started: Date;
}
