import { IBranch }                                from '../../../survey/IBranch';
import { Questionnaire }                          from '../../../composable/Questionnaire';
import {
  actions, pages, questions, results, sections,
} from './data';

const header              = 'Simple Eligibility Survey';
const branches: IBranch[] = [];

export const simpleFlow = new Questionnaire({
  actions,
  branches,
  header,
  pages,
  questions,
  results,
  sections,
});
