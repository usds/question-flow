import { ClassProperties }                        from '../util/types';
import { ERefCoreProperties, TRefCoreProperties } from './MRef';

const TheseProperties: {
  readonly buttons: 'buttons',
  readonly subTitle: 'subTitle',
} = {
  buttons:  'buttons' as const,
  subTitle: 'subTitle' as const,
};

const EActionCoreProperties = { ...TheseProperties, ...ERefCoreProperties };
type TActionCoreProperties = ClassProperties<typeof EActionCoreProperties> | TRefCoreProperties;
type TActionPrivateProps = `_${TActionCoreProperties}`;

export {
  EActionCoreProperties,
  type TActionCoreProperties,
  type TActionPrivateProps,
};
