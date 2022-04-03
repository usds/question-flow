import { ClassProperties }     from '../util/types';
import {
  EComposableCoreProperties,
  TComposableCoreProperties,
} from './MComposable';

type TTheseProperties = typeof EComposableCoreProperties;
const TheseProperties: TTheseProperties = {
  ...EComposableCoreProperties,
};
type TAnswerCoreProperties = ClassProperties<typeof TheseProperties> | TComposableCoreProperties;

export {
  TheseProperties as EAnswerCoreProperties,
  type TAnswerCoreProperties,
};
