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
    id:        PAGE_TYPE.LANDING,
    sectionId: PAGE_TYPE.LANDING,
    title:     'Check eligibility for benefits',
    type:      PAGE_TYPE.LANDING,
  },
  noResultsPage: {
    footer:
      'The information you shared today tells us about your current situation. In the future, you may become eligible for benefits as you age or things in your life change.',
    id:        PAGE_TYPE.NO_RESULTS,
    sectionId: PAGE_TYPE.RESULTS,
    subTitle:
      'You can <a href="#">apply for benefits</a> but based on what you told us today, you may not be eligible at this time.',
    title: 'You may not be eligible for benefits.',
    type:  PAGE_TYPE.NO_RESULTS,
  },
  resultsPage: {
    body: `This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll analyze more details during the application process to provide a definite answer.
<p/>
The information you shared today tells us about your current situation. In the future, you may become eligible for other benefits as you age or things in your life change.`,
    bodyHeader:    'Benefits you may be eligible for',
    bodySubHeader: "Here's what you may be eligible for and why",
    id:            PAGE_TYPE.RESULTS,
    info:          'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
    sectionId:     PAGE_TYPE.RESULTS,
    title:         'You may be eligible for benefits.',
    type:          PAGE_TYPE.RESULTS,
  },
  summaryPage: {
    buttons: {
      next: {
        label: 'Submit',
      },
    },
    id:        PAGE_TYPE.SUMMARY,
    sectionId: 'results',
    subTitle:
      'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
    title: 'Review your answers',
    type:  PAGE_TYPE.SUMMARY,
  },
};
