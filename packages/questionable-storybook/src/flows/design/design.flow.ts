import {
  IBranch, QuestionableConfig, MODE, IQuestionnaire,
} from '@usds.gov/questionable-react-component';
import {
  actions,
  pages,
  questions,
  results,
  sections,
} from './data';

const header              = 'Design Mode';
const branches: IBranch[] = [];

export const designFlow: IQuestionnaire = {
  actions,
  branches,
  config: new QuestionableConfig({
    dev:  false,
    mode: MODE.EDIT,
    nav:  {
      next: {
        type:        'button',
        verticalPos: 'top',
      },
      prev: {
        type:        'button',
        verticalPos: 'top',
      },
    },
    steps: {
      showStepId: false,
    },
  }),
  header,
  pages,
  questions,
  results,
  sections,
};
