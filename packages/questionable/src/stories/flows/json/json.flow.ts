import { merge }              from 'lodash';
import { QuestionableConfig } from '../../../composable/Config';
import { Questionnaire }      from '../../../composable/Questionnaire';
import { IQuestionnaire }     from '../../../survey';
import { content, logic }     from './data';

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
