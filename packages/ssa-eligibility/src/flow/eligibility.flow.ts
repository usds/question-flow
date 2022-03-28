import { IQuestionnaire, QuestionableConfig } from '@usds.gov/questionable-react-component';
import {
  onActionClick,
  onError,
  onInit,
  onNoResults,
  onPage,
  onResults,
} from '../lib/analytics';
import { actionContentMap }   from './content/actions.flow';
import { pageContent }        from './content/pages.flow';
import { questionContentMap } from './content/questions.flow';
import { resultContentMap }   from './content/results.flow';
import {
  buildActions,
  buildPages,
  buildQuestions,
  buildResults,
} from './logic';

const header = 'SSA Eligibility';

/**
 * Constructs the object required to instantiate Questionable
 * @param json
 * @returns a new instance of the questionnaire
 */
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildEligibility = (json: any = {}): IQuestionnaire => {
  // TODO: migrate the copy to the CMS
  const actionsJson = json.actions || actionContentMap;
  const actions     = buildActions(actionsJson);
  // `json.questions` should always exist. This has been migrated to the CMS
  const questionsJson = json.questions || questionContentMap;
  const questions     = buildQuestions(questionsJson);
  // TODO: migrate the copy to the CMS
  const pagesJson = json.pages || pageContent;
  const pages     = buildPages(pagesJson);
  // TODO: migrate the copy to the CMS
  const resultsJson = json.results || resultContentMap;
  const results     = buildResults(resultsJson, questions.map);
  const config      = new QuestionableConfig({
    events: {
      onActionClick,
      onError,
      onInit,
      onNoResults,
      onPage,
      onResults,
    },
    nav: {
      next: {
        type:        'button',
        verticalPos: 'bottom',
      },
      prev: {
        visible: true,
      },
    },
    pages: {
      landing: {
        visible: false,
      },
    },
    progressBar: {
      bgColor: '#1DC2AE',
    },
  });

  return {
    actions,
    branches:  questions.branches,
    config,
    header,
    pages,
    questions: questions.list,
    results:   results.list,
    sections:  [],
  };
};
