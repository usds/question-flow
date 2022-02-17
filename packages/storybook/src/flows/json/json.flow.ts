import { merge }    from 'lodash';
import {
  IQuestionnaire,
  QuestionableConfig,
  Questionnaire,
} from '@usds.gov/questionable';
import { content, logic } from './data';

const header = 'JSON Eligibility Survey';

const json = merge(logic, content) as unknown as IQuestionnaire;

export const jsonFlow = new Questionnaire({
  ...json,
  config: new QuestionableConfig({
    dev:         false,
    progressBar: {
      bgColor: '#1DC2AE',
    },
    steps: {
      showStepId: false,
    },
  }),
  header,
});
