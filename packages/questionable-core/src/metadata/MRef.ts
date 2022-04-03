import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

const TheseProperties: {
 readonly _id: '_id',
 readonly _label: '_label',
 readonly _order: '_order',
 readonly _title: '_title',
 readonly _type: '_type',
 readonly id: 'id',
 readonly instanceOfCheck: 'instanceOfCheck',
 readonly label: 'label',
 readonly order: 'order',
 readonly title: 'title',
 readonly type: 'type'
} = {
  _id:             '_id' as const,
  _label:          '_label' as const,
  _order:          '_order' as const,
  _title:          '_title' as const,
  _type:           '_type' as const,
  id:              'id' as const,
  instanceOfCheck: 'instanceOfCheck' as const,
  label:           'label' as const,
  order:           'order' as const,
  title:           'title' as const,
  type:            'type' as const,
};
const ERefCoreProperties = { ...ECommonCoreProperties, ...TheseProperties };
type TRefCoreProperties = ClassProperties<typeof ERefCoreProperties>;
type TRefCorePrivateProps = `_${TRefCoreProperties}`;
export {
  ERefCoreProperties,
  type TRefCoreProperties,
  type TRefCorePrivateProps,
};
