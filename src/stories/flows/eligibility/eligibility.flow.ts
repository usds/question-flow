import { actionContentMap }   from './content/actions.flow';
import { EventEmitter }       from '../../../composable/EventEmitter';
import { IQuestionnaire }     from '../../../survey/IQuestionnaire';
import { pageContent }        from './content/pages.flow';
import { QuestionableConfig } from '../../../composable/Config';
import { questionContentMap } from './content/questions.flow';
import { resultContentMap }   from './content/results.flow';
/* eslint-disable no-console */
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
    events: new EventEmitter({
      onAnswer:    () => console.log('answer'),
      onAnyEvent:  () => console.log('anyEvent'),
      onError:     console.error,
      onInit:      () => console.log('init'),
      onNoResults: () => console.log('noResults'),
      onPage:      () => console.log('page'),
      onResults:   () => console.log('results'),
    }),
    nav: {
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
