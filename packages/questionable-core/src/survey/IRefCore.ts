/** Generic reference object */
export interface IRefCore {
  /**
   * Unique identifier
   *
   * @title Id
   */
  id?: string | undefined;
  /**
   * @title Optional label
   * @hidden
   */
  label?: string | undefined;
  /**
   * Optional order
   *
   * @title Order
   * @hidden
   */
  order?: number | undefined;
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Type
   * @hidden
   */
  type?: string | undefined;
}
