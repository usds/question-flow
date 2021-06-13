import { PAGE_TYPE } from '../lib/enums';
import { IStep }     from './IStep';

/**
 * Defines step content for Page types
 */

export interface IPage extends IStep {
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
  /**
   * Type of page
   *
   * @title Page Type
   */
  type: PAGE_TYPE;
}
