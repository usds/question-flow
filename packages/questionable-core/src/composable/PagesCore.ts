/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { IPagesCore } from '../survey/IPagesCore';
import { PAGE_TYPE } from '../util/enums';
import { matches } from '../util/helpers';
import { checkInstanceOf, ClassList, TInstanceOf } from '../util/instanceOf';
import { merge } from '../util/merge';
import { BaseCore } from './BaseCore';
import { PageCore } from './PageCore';

export class PagesCore extends BaseCore implements IPagesCore {
  public get instanceOfCheck(): TInstanceOf {
    return ClassList.pages;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([ClassList.pages], obj);
  }

  #pages: PageCore[];

  public static override create(data: Partial<PagesCore>) {
    if (data instanceof PagesCore) {
      return data;
    }
    return new PagesCore(data);
  }

  public static override createOptional(data?: Partial<PagesCore>) {
    if (!data) {
      return undefined;
    }
    return PagesCore.create(data);
  }

  /**
   * Produces required object from inputs
   * @param type Page Type
   * @param data Optional data
   * @returns
   */
  #touchPage(type: PAGE_TYPE, data?: Partial<PageCore>): Partial<PageCore> {
    const defaults = merge(
      {
        display: false,
        title: type,
      },
      data,
      { id: type, type },
    );
    defaults.type = type;
    return defaults;
  }

  constructor(data: Partial<PagesCore> = {}) {
    super(data);
    this.#pages = data.pages?.map((p) => PageCore.create(p)) || [];
    this.#landingPage = PageCore.create(
      this.#touchPage(PAGE_TYPE.LANDING, data.landingPage),
    );
    this.#resultsPage = PageCore.create(
      this.#touchPage(PAGE_TYPE.RESULTS, data.resultsPage),
    );
    this.#noResultsPage = PageCore.create(
      this.#touchPage(PAGE_TYPE.NO_RESULTS, data.noResultsPage),
    );
    this.#summaryPage = PageCore.create(
      this.#touchPage(PAGE_TYPE.SUMMARY, data.summaryPage),
    );
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

  public get pages() {
    return this.#pages;
  }

  public all() {
    return [
      ...this.#pages,
      this.#landingPage,
      this.#noResultsPage,
      this.#resultsPage,
      this.#summaryPage,
    ];
  }

  public set(data: Partial<PageCore>) {
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
        this.add(page);
        break;
    }
    return page;
  }

  public existsIn(data: PageCore): boolean {
    if (data instanceof PageCore) {
      return Object.values(this.pages).some(
        (q) => q === data || matches(q.title, data.title),
      );
    }
    return false;
  }

  public add(data: PageCore): PagesCore {
    if (data instanceof PageCore) {
      const exists = this.existsIn(data);
      if (!exists) {
        this.pages.push(data);
      }
    }
    return this;
  }
}
