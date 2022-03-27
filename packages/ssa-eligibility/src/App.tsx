/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  noop,
  Questionable,
  Questionnaire,
} from '@usds.gov/questionable';
import { isEmpty, merge } from 'lodash';
import { useFetch }       from 'react-async';
import { ErrorBoundary }  from 'react-error-boundary';
import {
  Attributes,
  CMS,
  Datum,
  IFetchAPI,
  IQuestionData,
} from './lib/interfaces';
import { buildEligibility }         from './flow/eligibility.flow';
import { catchError, handleErrors } from './lib/error';

type TErrFallback = { error: Error, resetErrorBoundary: () => void };
function ErrorFallback({ error, resetErrorBoundary }: TErrFallback) {
  const e = catchError(error);
  return (
    <div className={'usds-q-dob-error usds-q-visible'}>
      <div className={'usa-alert usa-alert--error usa-alert--slim'}>
        <div className="usa-alert__body">
          <pre className="usa-alert__text">{e.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </div>
    </div>
  );
}

const API_URL = '/jsonapi/question/eligibility';

export const AppContainer = (data: any = {}): JSX.Element => {
  const json: CMS   = (isEmpty(data) ? {} : data) as CMS;
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
      handleErrors('There was an error parsing the API response.', e);
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
  handleErrors('There was an error fetching content from the API.', error);
  if (data) {
    const json = transformDataToCMS(data);
    return AppContainer(json);
  }
  return AppContainer();
};

export const App = (config: IFetchAPI = {
  url: API_URL,
}) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={(e) => {
      handleErrors('An error occurred', e);
    }}
  >
    <Container url={config.url} />
  </ErrorBoundary>
);
