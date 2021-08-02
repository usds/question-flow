/* eslint-disable no-console */
import { QuestionableConfig } from '../../../composable/Config';
import { EventEmitter }       from '../../../composable/EventEmitter';
import { IQuestionnaire }     from '../../../survey/IQuestionnaire';
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
  const config        = new QuestionableConfig({
    dev:    false,
    events: new EventEmitter({ onEvent: console.log }),
    nav:    {
      prev: {
        visible: false,
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
    steps: {
      showStepId: false,
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
