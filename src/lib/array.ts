/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign */
interface IGrouped<T> {
  [key: string]: T[];
}

/**
 * Converts an array of a given type into an object with property names
 * that represent the subset of array elements with properties of the same name
 * @param array An array of objects
 * @param prop A property name to group by
 * @returns IGrouped<T>
 */
export const groupBy = <T>(array: T[], prop: string): IGrouped<T> =>
  array.reduce((groups: IGrouped<T>, item: any) => {
    const val   = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
