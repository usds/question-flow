/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { merge }                                     from 'lodash';
import { IPagesCore }                                from '../survey/IPagesCore';
import { PAGE_TYPE }                                 from '../util/enums';
import {
  checkInstanceOf, ClassList, PREFIX, TInstanceOf,
} from '../util/instanceOf';
import { PageCore }  from './PageCore';
import { BaseCore }  from './BaseCore';
import { IPageCore } from '../survey/IStepCore';

const defaults = {
  instanceof:    PREFIX.PAGES,
  landingPage:   undefined,
  noResultsPage: undefined,
  resultsPage:   undefined,
  summaryPage:   undefined,
};

type TPages = {
  [key: string]: PageCore;
}

export class PagesCore extends BaseCore implements IPagesCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.pages;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.pages], obj);
  }

  pages: TPages;

  public static override create(data: Partial<IPagesCore> = {}) {
    if (data instanceof PagesCore) {
      return data;
    }
    return new PagesCore(data);
  }

  constructor(data: Partial<IPagesCore> = {}) {
    super();
    merge(this, defaults);
    this.pages          = {};
    this.#landingPage   = PageCore.create(data.landingPage || {
      id: PAGE_TYPE.LANDING, type: PAGE_TYPE.LANDING,
    });
    this.#resultsPage   = PageCore.create(data.resultsPage || {
      id: PAGE_TYPE.RESULTS, type: PAGE_TYPE.RESULTS,
    });
    this.#noResultsPage = PageCore.create(data.noResultsPage || {
      id: PAGE_TYPE.NO_RESULTS, type: PAGE_TYPE.NO_RESULTS,
    });
    this.#summaryPage   = PageCore.create(data.summaryPage || {
      id: PAGE_TYPE.SUMMARY, type: PAGE_TYPE.SUMMARY,
    });
    if (data.pages) {
      const pages = Object.keys(data.pages);
      for (const name of pages) {
        if (data.pages[name] instanceof PageCore) {
          this.pages[name] = data.pages[name] as PageCore;
        }
      }
    }
  }

  #landingPage: PageCore;

  public get landingPage(): PageCore {
    return this.#landingPage;
  }

  #noResultsPage: PageCore;

  public get noResultsPage(): PageCore {
    return this.#noResultsPage;
  }

  #resultsPage: PageCore;

  public get resultsPage(): PageCore {
    return this.#resultsPage;
  }

  #summaryPage: PageCore;

  public get summaryPage() {
    return this.#summaryPage;
  }

  public set(data: Partial<IPageCore>) {
    const page = PageCore.create(data);
    switch (page.type) {
      case PAGE_TYPE.LANDING:
        this.#landingPage = page;
        break;
      case PAGE_TYPE.NO_RESULTS:
        this.#noResultsPage = page;
        break;
      case PAGE_TYPE.RESULTS:
        this.#resultsPage = page;
        break;
      case PAGE_TYPE.SUMMARY:
        this.#summaryPage = page;
        break;
      default:
        this.pages[page.title] = page;
        break;
    }
    return page;
  }
}
