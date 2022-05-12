import {  ClassProperties }                       from '../types/ClassProperties';
import { ERefCoreProperties, TRefCoreProperties } from './MRef';

type TTheseProperties = {
  readonly answers: 'answers',
  readonly question: 'question',
};
const TheseProperties: TTheseProperties = {
  answers:  'answers' as const,
  question: 'question' as const,
};
const EResponseCoreProperties           = { ...TheseProperties, ...ERefCoreProperties };
type TResponseCoreProperties = ClassProperties<typeof EResponseCoreProperties> | TRefCoreProperties;

export {
  EResponseCoreProperties,
  type TResponseCoreProperties,
};
