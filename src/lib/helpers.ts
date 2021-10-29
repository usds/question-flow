import { isEmpty } from 'lodash';

/**
 * Collection of primitive helper methods
 */
export abstract class Helpers {
  private static sanitize(val?: string): string {
    return val ? val.toLowerCase().trim() : '';
  }

  /**
   * Determines if two strings are a fuzzy match
   */
  public static matches(left?: string, right?: string): boolean {
    if (isEmpty(left) || isEmpty(right)) {
      return false;
    }
    return Helpers.sanitize(left) === Helpers.sanitize(right);
  }
}

export const { matches } = Helpers;
