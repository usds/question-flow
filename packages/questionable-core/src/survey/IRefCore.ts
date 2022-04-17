export type TBaseType = 'default';
export const DEFAULT_TYPE: TBaseType = 'default';
export type TEnmBaseType = { DEFAULT: TBaseType };
export const BASE_TYPE: TEnmBaseType = { DEFAULT: DEFAULT_TYPE };

/** Generic reference object */
export interface IRefCore {
  /**
   * Unique identifier
   *
   * @title Id
   */
  id?: string;
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
