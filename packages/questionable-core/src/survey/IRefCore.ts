import { TInstanceOf }             from '../util/instanceOf';
import { ERefCoreProperties as p } from '../metadata/MRef';

/** Generic reference object */
export interface IRefCore {
  readonly [p.instanceOfCheck]: TInstanceOf;
  /**
   * Unique identifier
   *
   * @title Id
   */
  [p.id]: string;
  /**
   * @title Optional label
   * @hidden
   */
  [p.label]?: string;
  /**
   * Optional order
   *
   * @title Order
   * @hidden
   */
  [p.order]?: number;
  /**
   * @title Title
   */
  [p.title]?: string;
  /**
   * @title Type
   * @hidden
   */
  [p.type]?: string;
}
