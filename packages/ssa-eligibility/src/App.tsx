/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  noop,
  log,
  Questionable,
  Questionnaire,
} from '@usds.gov/questionable';
import { merge }    from 'lodash';
import { useFetch } from 'react-async';
import {
  Attributes,
  CMS,
  Datum,
  IFetchAPI,
  IQuestionData,
} from './lib/interfaces';
import { buildEligibility } from './flow/eligibility.flow';

const API_URL = '/jsonapi/question/eligibility';

export const AppContainer = (json?: CMS, error = ''): JSX.Element => {
  const eligibility = buildEligibility(json);
  if (Object.keys(eligibility).length === 0) {
    return <></>;
  }
  const gtag = window.gtag || noop;
  gtag('config', 'ssa_eligibility_wizard', {
    send_page_view: false,
  });
  const args = {
    questionnaire: new Questionnaire(eligibility),
  };

  return (
    <div>
      <Questionable {...args} />
      <div>{error}</div>
    </div>
  );
};

/**
 * Flatten the data returned from the API before passing it on
 * @param data
 * @returns
 */
const transformDataToCMS = (data: any) => {
  let json: Partial<CMS> = {};
  if (data?.data !== undefined && data?.data?.length > 0) {
    try {
      const questions = data?.data?.map((question: Datum) => {
        const q = question.attributes;
        q.id    = q.question_id;
        return q;
      }).reduce((ret: IQuestionData, question: Attributes) => {
        if (question.id) {
          ret[question.id] = question;
          return ret;
        } return ret;
      }, {});
      json = merge(json, { questions });
    } catch (e) {
      log('API error', e);
    }
  }
  return json as CMS;
};

/**
 * React application container for the web component
 * @param config - object representing the Fetch configuration
 * @returns
 */
const Container = ({ url }: IFetchAPI) => {
  const { data, error } = useFetch(url, {
    headers: { accept: 'application/json' },
  });
  if (error) log(error.message);
  if (data) {
    const json = transformDataToCMS(data);
    return AppContainer(json);
  }
  return AppContainer();
};

export const App = (config: IFetchAPI = {
  url: API_URL,
}) => <Container url={config.url} />;
