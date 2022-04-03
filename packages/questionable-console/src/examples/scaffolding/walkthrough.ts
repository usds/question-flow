import {
  QuestionableConfigCore, IBranchCore,
} from '@usds.gov/questionable-core';
import { IQuestionnaire } from '../../survey/IQuestionnaire';
import {
  actions,
  pages,
  questions,
  results,
  sections,
} from './data';

const header                  = 'Project bootstrapping';
const branches: IBranchCore[] = [];

export const walkthroughFlow = {
  actions,
  branches,
  config: new QuestionableConfigCore(),
  header,
  pages,
  questions,
  results,
  sections,
  steps:  [],
} as unknown as IQuestionnaire;