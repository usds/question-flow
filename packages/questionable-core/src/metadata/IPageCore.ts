import { IStepCore } from './IStepCore';
import { TPageType } from './properties/type/TPageType';

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
