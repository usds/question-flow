import { TQuestionType } from '../lib/enums';
import { TAnswerMap } from '../lib/types';
import { IRequirement } from './IRequirement';

/**
 * Question/step data definition
 */
export interface IQuestion {
  answer?: string;
  answers: TAnswerMap;
  body?: string;
  eligibilityNote?: string;
  footer?: string;
  id: string;
  questionHelp?: string;
  questionText: string;
  questionType: TQuestionType;
  requirements?: IRequirement[];
  sectionId: string;
  supportingDetails?: string;
}
