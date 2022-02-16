/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  noop,
  log,
  Questionable,
  Questionnaire,
} from '@usds.gov/questionable';
import { merge }                                 from 'lodash';
import { useFetch }                              from './lib/fetch';
import {
  Attributes, Datum, IFetchAPI, IQuestionData,
} from './lib/interfaces';
import { buildEligibility } from './flow/eligibility.flow';

const API_URL = '/jsonapi/question/eligibility';

/**
 * React application container for the web component
 * @param config - object representing the Fetch configuration
 * @param json - JSON that represents content of survey
 * @returns
 */
export const App = (config: IFetchAPI = {
  url: API_URL,
}): JSX.Element => {
  let json = {};
  try {
    const {
      data, error, loading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useFetch(`${config.url}`);
    // const res = useAsync({ promiseFn: () => getData(config) });
    if (error) {
      throw error;
    }
    if (loading) {
      return (<div></div>);
    }
    if (data?.data !== undefined && data?.data?.length > 0) {
      try {
        const questions = data?.data?.map((question: Datum) => {
          const q = question.attributes;
          q.id    = q.question_id;
          return q;
        }).reduce((ret: IQuestionData, question: Attributes) => {
          ret[question.id] = question;
          return ret;
        }, {});
        json = merge(json, { questions });
      } catch (e) {
        log('API error', e);
      }
    }
  } catch (e) {
    log('API error', e);
  }

  if (Object.keys(json).length === 0) {
    return <div></div>;
  }

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
      <Questionable {...args}/>
    </div>
  );
};
