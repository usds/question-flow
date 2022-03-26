import { IPagesCore } from '@usds.gov/questionable-core';
import { IPage }      from './IStep';

/**
 * Defines required pages for the survey flow
 */
export interface IPages extends IPagesCore {
  /**
   * First step of the survey
   *
   * @title Landing Page
   */
  landingPage?: IPage;
  /**
   * Last step of the survey if there are 0 results
   *
   * @title No Results Page
   */
  noResultsPage: IPage;
  /**
   * Last step of the survey if there are 1 or more results
   *
   * @title Results Page
   */
  resultsPage: IPage;
  /**
   * Preview of survery before submitting to receive results
   *
   * @title Summary Page
   */
  summaryPage: IPage;
}
