import { ClassProperties } from '../types/ClassProperties';
import {
  ERefCoreProperties,
  TRefCoreProperties,
} from './MRef';

type TTheseProperties = {
  readonly lastStep: 'lastStep';
  readonly requirements: 'requirements';
  readonly status: 'status';
};
const TheseProperties: TTheseProperties = {
  lastStep:     'lastStep' as const,
  requirements: 'requirements' as const,
  status:       'status' as const,
};
const ESectionCoreProperties            = { ...TheseProperties, ...ERefCoreProperties };
type TSectionCoreProperties = ClassProperties<typeof ESectionCoreProperties> | TRefCoreProperties;

export {
  ESectionCoreProperties,
  type TSectionCoreProperties,
};
