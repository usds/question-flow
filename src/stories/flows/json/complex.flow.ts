import { Questionnaire }                          from '../../../composable/Questionnaire';
import {
  json,
} from './data';

const header = 'Complex Eligibility Survey';

export const complexFlow = new Questionnaire(json);
