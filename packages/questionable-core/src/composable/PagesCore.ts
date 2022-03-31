/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { IPagesCore }        from '../survey/IPagesCore';
import { PageCore }          from './PageCore';
import { QuestionnaireCore } from './QuestionnaireCore';

export class PagesCore implements IPagesCore {
  [key: string]: PageCore | undefined;

  constructor(data: Partial<IPagesCore>, questionnaire: QuestionnaireCore) {
    if (data.landingPage) {
      this.landingPage = new PageCore(data.landingPage, questionnaire);
    }
    if (data.noResultsPage) {
      this.noResultsPage = new PageCore(data.noResultsPage, questionnaire);
    }
    if (data.resultsPage) {
      this.resultsPage = new PageCore(data.resultsPage, questionnaire);
    }
    if (data.summaryPage) {
      this.summaryPage = new PageCore(data.summaryPage, questionnaire);
    }
    const pages = Object.keys(data);
    for (const page of pages) {
      if (data[page] instanceof PageCore) {
        this[page] = data[page] as PageCore;
      }
    }
  }

  landingPage: PageCore | undefined = undefined;

  noResultsPage: PageCore | undefined = undefined;

  resultsPage: PageCore | undefined = undefined;

  summaryPage: PageCore | undefined = undefined;
}
