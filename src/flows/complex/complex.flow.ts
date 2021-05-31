import { Questionnaire }                          from '../../survey/Questionnaire';
import {
  questions, results, actions, sections, pages,
} from './data';

const header = 'Complex Eligibility Survey';

export const complexFlow = new Questionnaire({
  actions,
  header,
  pages,
  questions,
  results,
  sections,
});
