import { Questionnaire } from '../../../composable/Questionnaire';
import {
  json,
} from './data';

const header = 'JSON Eligibility Survey';

export const jsonFlow = new Questionnaire({ ...json, header });
