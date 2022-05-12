/**
 * Lambda that can be called to compute an age requirement
 * @hidden Functions must be hidden from schema
 */
export type TAgeCalcCore = (birthdate: string) => boolean;
/**
 * @hidden Functions must be hidden from schema
 */
export type TReducerCore = (...params: unknown[]) => void;

export type TPointerDirection = 'in' | 'out';
