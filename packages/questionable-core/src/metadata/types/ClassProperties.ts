/**
 * Construct a type using property names
 * @hidden
 */
export type ClassProperties<T> = FlatStrings<CoreProperties<T>>;
// type PrivateProperties<T> = T[keyof ClassProperties<T>]
/**
 * Flatten object
 * @hidden
 */
export type FlatStrings<T> = T extends object ? T[keyof T] : T;
/**
 * Grab the properties
 * @hidden
 */
export type CoreProperties<X> = X[keyof X];
