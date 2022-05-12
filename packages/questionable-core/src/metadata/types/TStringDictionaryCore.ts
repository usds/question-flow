/**
 * Key/value pairs which are both strings
 */
export type TStringDictionaryCore = {
  [key: string]: string;
};
/**
 * Generic fetch dictionary
 *
 * @hidden Functions must be hidden from schema
 */
export type TGetDictionaryCore = (...params: unknown[]) => TStringDictionaryCore;
