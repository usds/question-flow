/* eslint-disable max-len */
import { PAGE_TYPE } from '@usds.gov/questionable';

export const pageContent = {
  noResultsPage: {
    body:     '',
    id:       PAGE_TYPE.NO_RESULTS,
    subTitle: `
Based on your answers, you may not be eligible for benefits right now. As you age and parts of your life change, you may become eligible.<br>
<br>
If you want to start an application anyway, <a href="ssa.gov">learn how to apply.</a><br>
<br>
Call us if you have questions or think you may be eligible for benefits.<br>
<br>
Call 1-800-772-1213<br>
Call TTY 1-800-325-0778 if you're deaf or hard of hearing<br>
`,
    title: 'You may not be eligible for benefits.',
  },
  resultsPage: {
    body:       "This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll provide a definite answer after you complete the application process. The answers you shared today told us what's going on in your life right now. As you age and aspects of your life change, you may be eligible for other Social Security benefits.",
    bodyHeader: '',
    id:         PAGE_TYPE.RESULTS,
    info:       '',
    subTitle:
      "Based on your answers, here's what you may be eligible for and why:",
    title: 'You may be eligible for Social Security benefits.',
  },
  summaryPage: {
    buttons: {
      next: {
        id:    'pb2',
        title: 'Get Results',
      },
    },
    id:       PAGE_TYPE.SUMMARY,
    subTitle:
      'Select a question if you need to change the answer. Then, check your answers to all the questions that come after the one you changed.',
    title: 'Review your answers',
  },
};
