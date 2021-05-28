import { Questionnaire }                          from '../../survey/Questionnaire';
import {
  questions, results, actions, sections, pages,
} from './data';

const header = 'Simple Eligibility Survey';

export const simpleFlow = new Questionnaire({
  actions,
  header,
  pages,
  questions,
  results,
  sections,
});
