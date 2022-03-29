import {
  QuestionableConfigCore, IBranchCore,
} from '@usds.gov/questionable-core';
import { IQuestionnaire } from '../../src/survey/IQuestionnaire';
import {
  actions,
  pages,
  questions,
  results,
  sections,
} from './data';

const header                  = 'Project bootstrapping';
const branches: IBranchCore[] = [];

export const walkthroughFlow: Partial<IQuestionnaire> = {
  actions,
  branches,
  config: new QuestionableConfigCore(),
  header,
  pages,
  questions,
  results,
  sections,
};
