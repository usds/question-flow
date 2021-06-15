/* eslint-disable max-len */
import { DIRECTION, PAGE_TYPE } from '../../../../lib';
import { IPages }               from '../../../../survey/IPages';
import { SurveyBuilder }        from '../../../../composable/SurveyBuilder';
import { TSections }            from './sections.flow';

export const buildPages = (builder: SurveyBuilder, sections: TSections): IPages => {
  const landingPage = builder.addPage({
    body:    "To receive benefits, you have to meet certain requirements. We'll guide you through a series of questions to determine if you may be eligible.",
    id:      PAGE_TYPE.LANDING,
    section: sections.introduction,
    title:   'Check eligibility for benefits',
    type:    PAGE_TYPE.LANDING,
  });
  landingPage.addButton({
    direction: DIRECTION.FORWARD,
    label:     'Get Started',
  });

  const noResultsPage = builder.addPage({
    footer:
      'The information you shared today tells us about your current situation. In the future, you may become eligible for benefits as you age or things in your life change.',
    id:       PAGE_TYPE.NO_RESULTS,
    section:  sections.results,
    subTitle:
      'You can <a href="#">apply for benefits</a> but based on what you told us today, you may not be eligible at this time.',
    title: 'You may not be eligible for benefits.',
    type:  PAGE_TYPE.NO_RESULTS,
  });

  const resultsPage = builder.addPage({
    body: `This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll analyze more details during the application process to provide a definite answer.
<p/>
The information you shared today tells us about your current situation. In the future, you may become eligible for other benefits as you age or things in your life change.`,
    bodyHeader:    'Benefits you may be eligible for',
    bodySubHeader: "Here's what you may be eligible for and why",
    id:            PAGE_TYPE.RESULTS,
    info:          'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
    section:       sections.results,
    title:         'You may be eligible for benefits.',
    type:          PAGE_TYPE.RESULTS,
  });

  const summaryPage = builder.addPage({
    id:       PAGE_TYPE.SUMMARY,
    section:  sections.results,
    subTitle:
      'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
    title: 'Review your answers',
    type:  PAGE_TYPE.SUMMARY,
  });
  summaryPage.addButton({
    direction: DIRECTION.FORWARD,
    label:     'Submit',
  });

  return {
    landingPage,
    noResultsPage,
    resultsPage,
    summaryPage,
  };
};
