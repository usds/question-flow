import {
  PageCore,
} from '@usds.gov/questionable-core';
import { ReactNode } from 'react';

/**
 * Generic step data definition. Applies to all types of steps.
 */
export class Page extends PageCore {
  /**
   * React children to append to the title area
   *
   * @hidden
   */
  children?: ReactNode;
}
