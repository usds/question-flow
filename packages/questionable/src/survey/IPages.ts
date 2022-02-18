import { IPage } from './IStep';

/**
 * Defines required pages for the survey flow
 */
export interface IPages {
  /**
   * First step of the survey
   *
   * @title Landing Page
   */
  readonly landingPage?: IPage;
  /**
   * Last step of the survey if there are 0 results
   *
   * @title No Results Page
   */
  readonly noResultsPage: IPage;
  /**
   * Last step of the survey if there are 1 or more results
   *
   * @title Results Page
   */
  readonly resultsPage: IPage;
  /**
   * Preview of survery before submitting to receive results
   *
   * @title Summary Page
   */
  readonly summaryPage: IPage;
}
