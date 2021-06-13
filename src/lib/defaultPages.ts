import { IPage, IPages } from '../survey/IStep';
import { PAGE_TYPE }     from './enums';

/**
 * Default landing step if none is defined
 */
const landingPage: IPage = {
  buttons: {
    next: {
      label: 'Get Started',
    },
  },
  id:      PAGE_TYPE.LANDING,
  section: { id: PAGE_TYPE.LANDING },
  title:   PAGE_TYPE.LANDING,
  type:    PAGE_TYPE.LANDING,
};

/**
 * Default result step if none is defined
 */
const resultsPage: IPage = {
  id:      PAGE_TYPE.RESULTS,
  section: { id: PAGE_TYPE.RESULTS },
  title:   PAGE_TYPE.RESULTS,
  type:    PAGE_TYPE.RESULTS,
};

/**
 * Default no results step if none is defined
 */
const noResultsPage: IPage = {
  id:      PAGE_TYPE.NO_RESULTS,
  section: { id: PAGE_TYPE.RESULTS },
  title:   PAGE_TYPE.NO_RESULTS,
  type:    PAGE_TYPE.NO_RESULTS,
};

/**
 * Default result step if none is defined
 */
const summaryPage: IPage = {
  buttons: {
    next: {
      label: 'Submit',
    },
  },
  id:      PAGE_TYPE.SUMMARY,
  section: { id: PAGE_TYPE.RESULTS },
  title:   PAGE_TYPE.SUMMARY,
  type:    PAGE_TYPE.SUMMARY,
};

export const DEFAULT_PAGES: IPages = {
  landingPage,
  noResultsPage,
  resultsPage,
  summaryPage,
};
