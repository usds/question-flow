import {
  questions, results, actions, sections, pages,
} from './data';

const header = 'SSA Eligibility Survey';

export const eligibility = {
  actions,
  branches:  questions.branches,
  header,
  pages,
  questions: questions.list,
  results:   results.list,
  sections,
};
