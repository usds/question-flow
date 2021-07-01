/* eslint-disable max-len */
import { PAGE_TYPE } from '../../../../lib';
import { IPages }    from '../../../../survey';

export const pages: IPages = {
  landingPage: {
    body:    "To receive benefits, you have to meet certain requirements. We'll guide you through a series of questions to determine if you may be eligible.",
    buttons: {
      next: {
        label: 'Get Started',
      },
    },
    id:      PAGE_TYPE.LANDING,
    section: { id: PAGE_TYPE.LANDING },
    title:   'Check eligibility for benefits',
    type:    PAGE_TYPE.LANDING,
  },
  noResultsPage: {
    body:     'If you want to apply anyway, review the process and start an application.',
    id:       PAGE_TYPE.NO_RESULTS,
    section:  { id: PAGE_TYPE.RESULTS },
    subTitle: 'Based on your answers, you may not be eligible for benefits right now. As you age and aspects of your life change, you may become eligible.',
    title:    'You may not be eligible for benefits.',
    type:     PAGE_TYPE.NO_RESULTS,
  },
  resultsPage: {
    body:       'The answers you shared today told us what\'s going on in your life right now. As you age and aspects of your life change, you may be eligible for other Social Security benefits.',
    bodyHeader: 'This gives you an idea of what you may be eligible for, but we can\'t guarantee you\'ll get these benefits. We\'ll provide a definite answer after you complete the application process.',
    id:         PAGE_TYPE.RESULTS,
    info:       'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
    section:    { id: PAGE_TYPE.RESULTS },
    subTitle:   'Based on your answers, here\'s what you may be eligible for and why:',
    title:      'You may be eligible for Social Security benefits.',
    type:       PAGE_TYPE.RESULTS,
  },
  summaryPage: {
    buttons: {
      next: {
        label: 'Submit',
      },
    },
    id:       PAGE_TYPE.SUMMARY,
    section:  { id: 'results' },
    subTitle:
      'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your answers as needed.',
    title: 'Review your answers',
    type:  PAGE_TYPE.SUMMARY,
  },
};
