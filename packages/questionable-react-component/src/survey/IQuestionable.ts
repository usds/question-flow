import { IQuestionableCore } from '@usds.gov/questionable-core';
import { Questionnaire }     from '../composable';

export interface IQuestionable extends IQuestionableCore {
  questionnaire: Questionnaire,
}
