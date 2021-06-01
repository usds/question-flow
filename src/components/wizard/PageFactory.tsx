import {
  isEnum, PAGE_TYPE,
} from '../../lib/enums';
import { noel }                 from '../../lib/noop';
import { useGlobal }            from '../../state/GlobalState';
import { IPageData, IStepData } from '../../survey/IStepData';
import {
  LandingPage,
  NoResultsPage,
  ResultsPage,
  SummaryPage,
} from '../pages';

/**
 * Given a step of a known page type, returns a page component
 * @param props
 * @returns
 */
export const PageFactory = (props: IStepData): JSX.Element => {
  const { stepId }        = props;
  const { questionnaire } = useGlobal();
  const step              = questionnaire.getStepById(`${stepId}`);
  if (!isEnum(PAGE_TYPE, step.type)) {
    return noel('Not a page');
  }
  const page     = questionnaire.getPageById(step.id);
  const stepData = { ...{ step: page, ...props } } as IPageData;
  switch (page.type) {
    case PAGE_TYPE.LANDING:
      return <LandingPage {...stepData} />;
    case PAGE_TYPE.NO_RESULTS:
      return <NoResultsPage {...stepData} />;
    case PAGE_TYPE.RESULTS:
      return <ResultsPage {...stepData} />;
    case PAGE_TYPE.SUMMARY:
      return <SummaryPage {...stepData} />;
    default:
      return noel('Page does not exist', 'PageFactory');
  }
};
