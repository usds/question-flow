import { QuestionableConfig, IQuestionnaire, IBranch } from '@usds.gov/questionable';
import {
  actions,
  pages,
  questions,
  results,
  sections,
} from './data';

const header              = 'Simple Eligibility Survey';
const branches: IBranch[] = [];

export const simpleFlow: IQuestionnaire = {
  actions,
  branches,
  config: new QuestionableConfig({
    dev: false,
    nav: {
      next: {
        type:        'button',
        verticalPos: 'bottom',
      },
      prev: {
        type:        'button',
        verticalPos: 'bottom',
      },
    },
  }),
  header,
  pages,
  questions,
  results,
  sections,
};
