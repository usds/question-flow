/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
import { IPagesCore } from '../survey/IPagesCore';
import { IPageCore }  from '../survey/IStepCore';
import { PageCore }   from './PageCore';
import { TStepCtor }  from './StepCore';

type ctor = TStepCtor & Partial<IPageCore>;

export class PagesCore implements IPagesCore {
  [key: string]: PageCore | undefined;

  constructor(data: Partial<IPagesCore> = {}) {
    const pages = Object.keys(data);
    for (const page of pages) {
      if (data[page] !== undefined) {
        this[page] = new PageCore(data[page] as ctor);
      }
    }
  }

  landingPage: PageCore | undefined = undefined;

  noResultsPage: PageCore | undefined = undefined;

  resultsPage: PageCore | undefined = undefined;

  summaryPage: PageCore | undefined = undefined;
}
