import {  ClassProperties }                                     from '../util';
import { EComposableCoreProperties, TComposableCoreProperties } from './MComposable';

type TTheseProperties = {
  readonly answers: 'answers',
  readonly question: 'question',
};
const TheseProperties: TTheseProperties = {
  answers:  'answers' as const,
  question: 'question' as const,
};
const EResponseCoreProperties           = { ...TheseProperties, ...EComposableCoreProperties };
type TResponseCoreProperties = ClassProperties<typeof EResponseCoreProperties> | TComposableCoreProperties;

export {
  EResponseCoreProperties,
  type TResponseCoreProperties,
};
