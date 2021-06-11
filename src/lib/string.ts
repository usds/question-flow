const sanitize = (val: string): string => val.toLowerCase().trim();

/**
 * Determines if two strings are a fuzzy match
 */
export const matches = (left?: string, right?: string): boolean => {
  if (!left || !right) {
    return false;
  }
  return sanitize(left) === sanitize(right);
};
