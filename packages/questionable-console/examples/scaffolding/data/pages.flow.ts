/* eslint-disable max-len */
import { PAGE_TYPE, IPagesCore } from '@usds.gov/questionable-core';

export const pages: IPagesCore = {
  landingPage: {
    body:    'Please answer the following questions to setup your environment.',
    id:      PAGE_TYPE.LANDING,
    section: { id: PAGE_TYPE.LANDING },
    title:   'Welcome to the scaffolding project. Press any key to continue...',
    type:    PAGE_TYPE.LANDING,
  },
  noResultsPage: {
    id:      PAGE_TYPE.NO_RESULTS,
    section: { id: 'results' },
    title:   'No actions have been performed',
    type:    PAGE_TYPE.NO_RESULTS,
  },
  resultsPage: {
    id:      PAGE_TYPE.RESULTS,
    section: { id: 'results' },
    title:   'Success. Your project has been bootstrapped.',
    type:    PAGE_TYPE.RESULTS,
  },
  summaryPage: {
    id:      PAGE_TYPE.SUMMARY,
    section: { id: 'results' },
    title:   'Review the output and confirm that everything was successful.',
    type:    PAGE_TYPE.SUMMARY,
  },
};
