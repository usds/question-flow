import {
  GateLogicCore,
  isEnum, PAGE_TYPE,
} from '@usds.gov/questionable-core';
import { noel }       from '../../lib/noel';
import { useGlobal }  from '../../state/GlobalState';
import { Step, Page } from '../../composable';
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
export const PageFactory = ({ step, gate }: {gate: GateLogicCore, step: Step}): JSX.Element => {
  const { questionnaire } = useGlobal();
  const s                 = questionnaire.getStepById(step.id);
  if (!isEnum(PAGE_TYPE, s.type)) {
    return noel('Not a page');
  }
  const page = questionnaire.getPageById(step.id) as Page;
  const comp = new PageComposer({ gate, page });
  switch (page.type) {
    case PAGE_TYPE.LANDING:
      return <LandingPage step={page} comp={comp} />;
    case PAGE_TYPE.NO_RESULTS:
      return <NoResultsPage step={page} gate={questionnaire} comp={comp} />;
    case PAGE_TYPE.RESULTS:
      return <ResultsPage step={page} gate={questionnaire} comp={comp} />;
    case PAGE_TYPE.SUMMARY:
      return <SummaryPage step={page} gate={questionnaire} comp={comp} />;
    default:
      return noel('Page does not exist', 'PageFactory');
  }
};
