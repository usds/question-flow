import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
 readonly _landingPage: '_landingPage';
 readonly _noResultsPage: '_noResultsPage';
 readonly _resultsPage: '_resultsPage';
 readonly _summaryPage: '_summaryPage';
 readonly  landingPage: 'landingPage';
 readonly  noResultsPage: 'noResultsPage';
 readonly  resultsPage: 'resultsPage';
 readonly  summaryPage: 'summaryPage';
};
const TheseProperties: TTheseProperties = {
  _landingPage:   '_landingPage' as const,
  _noResultsPage: '_noResultsPage' as const,
  _resultsPage:   '_resultsPage' as const,
  _summaryPage:   '_summaryPage' as const,
  landingPage:    'landingPage' as const,
  noResultsPage:  'noResultsPage' as const,
  resultsPage:    'resultsPage' as const,
  summaryPage:    'summaryPage' as const,
};
const EPagesCoreProperties              = { ...ECommonCoreProperties, ...TheseProperties };
type TEPagesCoreProperties = ClassProperties<typeof EPagesCoreProperties>;

export {
  EPagesCoreProperties,
  type TEPagesCoreProperties,
};
