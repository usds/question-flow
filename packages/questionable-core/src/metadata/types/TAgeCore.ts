/*
 * Defines an age relative to a date
 * @title Age Type
 */
export interface TAgeCore {
  /**
   * @minimum 0
   * @maximum 31
   * @nullable
   * @title Days
   */
  days?: number;
  /**
   * @minimum 0
   * @maximum 31
   * @nullable
   * @title Months
   */
  months: number;
  /**
   * @minimum 0
   * @maximum 100
   * @nullable
   * @title Years
   */
  years: number;
}

export interface TDateOfBirthCore {
  day?: string | undefined;
  month?: string | undefined;
  year?: string | undefined;
}
