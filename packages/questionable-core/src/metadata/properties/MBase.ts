import { ClassProperties }    from '../types/ClassProperties';
import { ERefCoreProperties } from './MRef';

const TheseProperties     = {};
const EBaseCoreProperties = { ...ERefCoreProperties, ...TheseProperties };
type TBaseCoreProperties = ClassProperties<typeof EBaseCoreProperties>;

export {
  EBaseCoreProperties,
  type TBaseCoreProperties,
};
