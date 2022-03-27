import { ReactNode }    from 'react';
import { TContentCore } from '@usds.gov/questionable-core';
/**
 * Content type for blocks of copy
 */
export type TContent = TContentCore & {
  /**
   * React component to append to the parent
   * @hidden
   */
  children?: ReactNode;
}
