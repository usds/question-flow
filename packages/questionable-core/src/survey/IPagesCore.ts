import { IPageCore } from './IStepCore';
import { EPagesCoreProperties as p } from '../metadata/MPages';
/**
 * Defines required pages for the survey flow
 */
export interface IPagesCore {
  [key: string]: IPageCore | undefined;
  /**
   * First step of the survey
   *
   * @title Landing Page
   */
  [p.landingPage]?: IPageCore;
  /**
   * Last step of the survey if there are 0 results
   *
   * @title No Results Page
   */
  [p.noResultsPage]?: IPageCore;
  /**
   * Last step of the survey if there are 1 or more results
   *
   * @title Results Page
   */
  [p.resultsPage]?: IPageCore;
  /**
   * Preview of survery before submitting to receive results
   *
   * @title Summary Page
   */
  [p.summaryPage]?: IPageCore;
}
