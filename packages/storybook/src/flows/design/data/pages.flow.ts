/* eslint-disable max-len */
import { PAGE_TYPE, IPages } from '@usds.gov/questionable';

export const pages: IPages = {
  landingPage: {
    body:    'Complete this series of questions to earn badges!',
    buttons: {
      next: {
        id:    'b2',
        title: 'Begin',
      },
    },
    id:       PAGE_TYPE.LANDING,
    section:  { id: PAGE_TYPE.LANDING },
    subTitle: 'This is a simple survey',
    title:    'Welcome',
    type:     PAGE_TYPE.LANDING,
  },
  noResultsPage: {
    footer:   "While you can try again, we cannot guarantee you'll get a badge.",
    id:       PAGE_TYPE.NO_RESULTS,
    section:  { id: 'results' },
    subTitle: 'Try again to earn some.',
    title:    'You earned no badges.',
    type:     PAGE_TYPE.NO_RESULTS,
  },
  resultsPage: {
    id:      PAGE_TYPE.RESULTS,
    info:    'Each badge has an official name. You may see these names referenced in other resources online.',
    section: { id: 'results' },
    title:   'You have earned these badges.',
    type:    PAGE_TYPE.RESULTS,
  },
  summaryPage: {
    buttons: {
      next: {
        id:    'b3',
        title: 'See your results',
      },
    },
    id:       PAGE_TYPE.SUMMARY,
    section:  { id: 'results' },
    subTitle:
      'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
    title: 'Review your answers',
    type:  PAGE_TYPE.SUMMARY,
  },
};
