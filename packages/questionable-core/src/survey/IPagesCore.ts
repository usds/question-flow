import { IPageCore } from './IStepCore';

export type TPages = {
  [key: string]: IPageCore;
}
/**
 * Defines required pages for the survey flow
 */
export interface IPagesCore {
  /**
   * First step of the survey
   *
   * @title Landing Page
   */
  landingPage?: IPageCore;
  /**
   * Last step of the survey if there are 0 results
   *
   * @title No Results Page
   */
  noResultsPage?: IPageCore;
  pages: TPages;
  /**
   * Last step of the survey if there are 1 or more results
   *
   * @title Results Page
   */
  resultsPage?: IPageCore;
  /**
   * Preview of survery before submitting to receive results
   *
   * @title Summary Page
   */
  summaryPage?: IPageCore;
}
