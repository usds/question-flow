import {
  isEnum, PAGE_TYPE,
} from '@usds.gov/questionable-core';
import { noel }                 from '../../lib/noel';
import { useGlobal }            from '../../state/GlobalState';
import { IStepData, IPageData } from '../../survey/IStepData';
import {
  LandingPage,
  NoResultsPage,
  ResultsPage,
  SummaryPage,
} from '../pages';
import { PageComposer } from '../lib/Pages';

/**
 * Given a step of a known page type, returns a page component
 * @param props
 * @returns
 */
export const PageFactory = (props: IStepData): JSX.Element => {
  const { questionnaire, config, gate } = useGlobal();
  const step                            = questionnaire.getStepById(props.stepId);
  if (!isEnum(PAGE_TYPE, step.type)) {
    return noel('Not a page');
  }
  const page     = questionnaire.getPageById(step.id);
  const stepData = { ...{ step: page, ...props } } as IPageData;
  const gate     = questionnaire.getGate(props.form);
  const comp     = new PageComposer({
    config, gate, props: page, questionnaire,
  });
  switch (page.type) {
    case PAGE_TYPE.LANDING:
      return <LandingPage {...stepData} comp={comp} />;
    case PAGE_TYPE.NO_RESULTS:
      return <NoResultsPage {...stepData} comp={comp} />;
    case PAGE_TYPE.RESULTS:
      return <ResultsPage {...stepData} comp={comp} />;
    case PAGE_TYPE.SUMMARY:
      return <SummaryPage {...stepData} comp={comp} />;
    default:
      return noel('Page does not exist', 'PageFactory');
  }
};
