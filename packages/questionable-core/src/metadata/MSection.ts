import { ClassProperties }     from '../util';
import {
  EComposableCoreProperties,
  TComposableCoreProperties,
} from './MComposable';

type TTheseProperties = {
 readonly _lastStep: '_lastStep';
 readonly _requirements: '_requirements';
 readonly _status: '_status';
 readonly lastStep: 'lastStep';
 readonly requirements: 'requirements';
 readonly status: 'status';
};
const TheseProperties: TTheseProperties = {
  _lastStep:     '_lastStep' as const,
  _requirements: '_requirements' as const,
  _status:       '_status' as const,
  lastStep:      'lastStep' as const,
  requirements:  'requirements' as const,
  status:        'status' as const,
};
const ESectionCoreProperties            = { ...TheseProperties, ...EComposableCoreProperties };
type TSectionCoreProperties = ClassProperties<typeof ESectionCoreProperties> | TComposableCoreProperties;

export {
  ESectionCoreProperties,
  type TSectionCoreProperties,
};
