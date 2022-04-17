import { BASE_TYPE, TEnmBaseType } from './IRefCore';
import { IStepCore }               from './IStepCore';

/**
 * Defines the known component types for pages
 */
export type TPageType = 'Landing' | 'No Results' | 'Results' | 'Summary';
type TEnmPageType = TEnmBaseType & {
  LANDING: TPageType & 'Landing',
  NO_RESULTS: TPageType & 'No Results',
  RESULTS: TPageType & 'Results',
  SUMMARY: TPageType & 'Summary',
}
export const PAGE_TYPE: TEnmPageType = {
  ...BASE_TYPE,
  LANDING:    'Landing',
  NO_RESULTS: 'No Results',
  RESULTS:    'Results',
  SUMMARY:    'Summary',
};

/**
 * Defines step content for Page types
 */
export interface IPageCore extends IStepCore {
  /**
   * Defines the body content of the page
   *
   * @title Body
   */
  body?: string;
  /**
   * Optional header to display above body
   *
   * @title Body Heading
   */
  bodyHeader?: string;
  /**
   * Optional sub header to display below Body Heading
   *
   * @title Body Subheading
   */
  bodySubHeader?: string;
  display: boolean;
  /**
   * Type of page
   *
   * @title Page Type
   */
  type: TPageType;
}
