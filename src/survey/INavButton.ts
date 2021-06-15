/**
 * Represents a navigation button
 */

import { DIRECTION } from '../lib';

export interface INavButton {
  /**
   * Next/Prev type
   */
  direction: DIRECTION;
  /**
   * Text to display on button (e.g. 'Prev' or 'Next')
   */
  label: string;
}
