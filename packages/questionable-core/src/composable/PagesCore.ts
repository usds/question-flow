/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { merge }             from 'lodash';
import { IPagesCore }        from '../survey/IPagesCore';
import { PAGE_TYPE }         from '../util/enums';
import {
  checkInstanceOf, ClassList, PREFIX,
} from '../util/instanceOf';
import { PageCore }          from './PageCore';
import { EPagesCoreProperties as p } from '../metadata/MPages';

const defaults = {
  instanceof:    PREFIX.PAGES,
  landingPage:   undefined,
  noResultsPage: undefined,
  resultsPage:   undefined,
  summaryPage:   undefined,
};

export class PagesCore implements IPagesCore {
  protected static _name = PREFIX.PAGES;

  // public readonly instanceOfCheck: TInstanceOf = refCoreClassName;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.pages], obj);
  }

  [key: string]: PageCore | undefined;

  constructor(data: Partial<IPagesCore>) {
    merge(this, defaults);
    Object.defineProperty(this, 'instanceOfCheck', {
      get:      () => ClassList.pages,
      writable: false,
    });

    if (data.landingPage) {
      this.landingPage = new PageCore(data.landingPage);
    } else {
      this.landingPage      = new PageCore({
        id: PAGE_TYPE.LANDING, type: PAGE_TYPE.LANDING,
      });
      this.landingPage.type = PAGE_TYPE.LANDING;
    }
    if (data.noResultsPage) {
      this.noResultsPage = new PageCore(data.noResultsPage);
    } else {
      this.noResultsPage      = new PageCore({
        id: PAGE_TYPE.NO_RESULTS, type: PAGE_TYPE.NO_RESULTS,
      });
      this.noResultsPage.type = PAGE_TYPE.NO_RESULTS;
    }
    if (data.resultsPage) {
      this.resultsPage = new PageCore(data.resultsPage);
    } else {
      this.resultsPage      = new PageCore({
        id: PAGE_TYPE.RESULTS, type: PAGE_TYPE.RESULTS,
      });
      this.resultsPage.type = PAGE_TYPE.RESULTS;
    }
    if (data.summaryPage) {
      this.summaryPage = new PageCore(data.summaryPage);
    } else {
      this.summaryPage      = new PageCore({
        id: PAGE_TYPE.SUMMARY, type: PAGE_TYPE.SUMMARY,
      });
      this.summaryPage.type = PAGE_TYPE.SUMMARY;
    }
    const pages = Object.keys(data);
    for (const page of pages) {
      if (data[page] instanceof PageCore) {
        this[page] = data[page] as PageCore;
      }
    }
  }

  private [p._landingPage]: PageCore;

  public get landingPage(): PageCore {
    return this[p._landingPage];
  }

  noResultsPage: PageCore;

  resultsPage: PageCore;

  summaryPage: PageCore;

  public override type: PAGE_TYPE;
}
