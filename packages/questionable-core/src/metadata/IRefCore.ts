import { TInstanceOf } from '../lib/instanceOf';

/** Generic reference object */
export interface IRefCore {
  /**
   * Unique identifier
   *
   * @title Id
   */
  id?: string;
  instanceOfCheck: TInstanceOf;
  /**
   * @title Optional label
   * @hidden
   */
  label?: string;
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
  title: string;
  /**
   * @title Type
   * @hidden
   */
  type?: string;
}
