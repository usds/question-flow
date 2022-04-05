import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  readonly  landingPage: 'landingPage';
  readonly  noResultsPage: 'noResultsPage';
  readonly  resultsPage: 'resultsPage';
  readonly  summaryPage: 'summaryPage';
};
const TheseProperties: TTheseProperties = {
  landingPage:   'landingPage' as const,
  noResultsPage: 'noResultsPage' as const,
  resultsPage:   'resultsPage' as const,
  summaryPage:   'summaryPage' as const,
};
const EPagesCoreProperties              = { ...ECommonCoreProperties, ...TheseProperties };
type TEPagesCoreProperties = ClassProperties<typeof EPagesCoreProperties>;

export {
  EPagesCoreProperties,
  type TEPagesCoreProperties,
};
