import { IRefCore } from '@usds.gov/questionable-core';
/** Generic reference object */
export interface IRef extends IRefCore {
  /**
   * Unique identifier
   *
   * @title Id
   */
  id: string;
  /**
   * Optional order
   *
   * @title Order
   * @hidden
   */
  order?: number;
  /**
   * @title Title
   */
  title?: string;
  /**
   * @title Type
   * @hidden
   */
  type?: string;
}
