import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

const TheseProperties: {
  readonly id: 'id',
  readonly instanceOfCheck: 'instanceOfCheck',
  readonly label: 'label',
  readonly order: 'order',
  readonly title: 'title',
  readonly type: 'type'
} = {
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
