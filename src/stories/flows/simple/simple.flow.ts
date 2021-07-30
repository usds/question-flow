import { IBranch } from '../../../survey/IBranch';
import {
  actions,
  pages,
  questions,
  results,
  sections,
} from './data';
import { QuestionableConfig } from '../../../composable/Config';
import { MODE }               from '../../../lib/enums';
import { IQuestionnaire }     from '../../../survey/IQuestionnaire';

const header              = 'Simple Eligibility Survey';
const branches: IBranch[] = [];

export const simpleFlow: IQuestionnaire = {
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
