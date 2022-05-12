import { DIRECTION } from '../../lib/enums';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */

export type TPageDataCore = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  step: unknown;
};
