/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { merge }                           from 'lodash';
import { IPagesCore }                      from '../survey/IPagesCore';
import { PAGE_TYPE }                       from '../util/enums';
import {
  checkInstanceOf, getClassName, PREFIX,
} from '../util/instanceOf';
import { PageCore }          from './PageCore';
import { QuestionnaireCore } from './QuestionnaireCore';

const defaults = {
  instanceof:    getClassName(PREFIX.PAGES),
  landingPage:   undefined,
  noResultsPage: undefined,
  resultsPage:   undefined,
  summaryPage:   undefined,
};

export class PagesCore implements IPagesCore {
  protected static _name = defaults.instanceof;

  // protected instanceOfCheck: TInstanceOf = PagesCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([PagesCore._name], obj);
  }

  [key: string]: PageCore | undefined;

  constructor(data: Partial<IPagesCore>, questionnaire: QuestionnaireCore) {
    merge(this, defaults);
    if (data.landingPage) {
      this.landingPage = new PageCore(data.landingPage, questionnaire);
    } else {
      this.landingPage      = new PageCore({
        id: PAGE_TYPE.LANDING, type: PAGE_TYPE.LANDING,
      }, questionnaire);
      this.landingPage.type = PAGE_TYPE.LANDING;
    }
    if (data.noResultsPage) {
      this.noResultsPage = new PageCore(data.noResultsPage, questionnaire);
    } else {
      this.noResultsPage      = new PageCore({
        id: PAGE_TYPE.NO_RESULTS, type: PAGE_TYPE.NO_RESULTS,
      }, questionnaire);
      this.noResultsPage.type = PAGE_TYPE.NO_RESULTS;
    }
    if (data.resultsPage) {
      this.resultsPage = new PageCore(data.resultsPage, questionnaire);
    } else {
      this.resultsPage      = new PageCore({
        id: PAGE_TYPE.RESULTS, type: PAGE_TYPE.RESULTS,
      }, questionnaire);
      this.resultsPage.type = PAGE_TYPE.RESULTS;
    }
    if (data.summaryPage) {
      this.summaryPage = new PageCore(data.summaryPage, questionnaire);
    } else {
      this.summaryPage      = new PageCore({
        id: PAGE_TYPE.SUMMARY, type: PAGE_TYPE.SUMMARY,
      }, questionnaire);
      this.summaryPage.type = PAGE_TYPE.SUMMARY;
    }
    const pages = Object.keys(data);
    for (const page of pages) {
      if (data[page] instanceof PageCore) {
        this[page] = data[page] as PageCore;
      }
    }
  }

  landingPage: PageCore;

  noResultsPage: PageCore;

  resultsPage: PageCore;

  summaryPage: PageCore;
}
