import { ClassProperties } from '../util/types';
import {
  ERefCoreProperties,
  TRefCoreProperties,
} from './MRef';

type TTheseProperties = typeof ERefCoreProperties;
const TheseProperties: TTheseProperties = {
  ...ERefCoreProperties,
};
type TAnswerCoreProperties = ClassProperties<typeof TheseProperties> | TRefCoreProperties;

export {
  TheseProperties as EAnswerCoreProperties,
  type TAnswerCoreProperties,
};
