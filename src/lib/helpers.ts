/**
 * Collection of primitive helper methods
 */
export abstract class Helpers {
  private static sanitize(val: string): string {
    return val.toLowerCase().trim();
  }

  /**
   * Determines if two strings are a fuzzy match
   */
  public static matches(left?: string, right?: string): boolean {
    if (!left || !right) {
      return false;
    }
    return Helpers.sanitize(left) === Helpers.sanitize(right);
  }
}
