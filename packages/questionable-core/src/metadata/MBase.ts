import { ClassProperties }    from '../util/types';
import { ERefCoreProperties } from './MRef';

const TheseProperties: {
 readonly _form: '_form',
 readonly form: 'form'
} = {
  _form: '_form' as const,
  form:  'form' as const,
};
const EBaseCoreProperties = { ...ERefCoreProperties, ...TheseProperties };
type TBaseCoreProperties = ClassProperties<typeof EBaseCoreProperties>;

export {
  EBaseCoreProperties,
  type TBaseCoreProperties,
};
