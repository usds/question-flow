import { Questionnaire }                          from '../../state/Questionnaire';
import {
  actions, pages, questions, results, sections,
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
