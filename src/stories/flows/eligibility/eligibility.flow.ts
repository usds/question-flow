import { IQuestionnaire }     from '../../../survey';
import { actionContentMap }   from './content/actions.flow';
import { pageContent }        from './content/pages.flow';
import { questionContentMap } from './content/questions.flow';
import { resultContentMap }   from './content/results.flow';
import { sectionContentMap }  from './content/sections.flow';
import {
  buildActions,
  buildPages,
  buildQuestions,
  buildResults,
  buildSections,
} from './logic';

const header = 'SSA Eligibility Survey';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildEligibility = (json: any = {}): IQuestionnaire => {
  const actionsJson   = json.actions || actionContentMap;
  const actions       = buildActions(actionsJson);
  const questionsJson = json.questions || questionContentMap;
  const questions     = buildQuestions(questionsJson);
  const pagesJson     = json.pages || pageContent;
  const pages         = buildPages(pagesJson);
  const resultsJson   = json.results || resultContentMap;
  const results       = buildResults(resultsJson, questions.map);
  const sectionsJson  = json.sections || sectionContentMap;
  const sections      = buildSections(sectionsJson);

  return {
    actions,
    branches:  questions.branches,
    header,
    pages,
    questions: questions.list,
    results:   results.list,
    sections,
  };
};
