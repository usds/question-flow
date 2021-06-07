import { Questionnaire } from '../../state/Questionnaire';
import { actions, pages, questions, results, sections } from './data';

const header = 'Simple Eligibility Survey';

export const simpleFlow = new Questionnaire({
  actions,
  header,
  pages,
  questions,
  results,
  sections,
});
