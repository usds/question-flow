import { ClassProperties }                        from '../util/types';
import { ERefCoreProperties, TRefCoreProperties } from './MRef';

const TheseProperties: {
  readonly _buttons: '_buttons',
  readonly _label: '_label',
  readonly _subTitle: '_subTitle',
  readonly _type: '_type',
  readonly buttons: 'buttons',
  readonly subTitle: 'subTitle',
} = {
  _buttons:  '_buttons' as const,
  _label:    '_label' as const,
  _subTitle: '_subTitle' as const,
  _type:     '_type' as const,
  buttons:   'buttons' as const,
  subTitle:  'subTitle' as const,
};

const EActionCoreProperties = { ...TheseProperties, ...ERefCoreProperties };
type TActionCoreProperties = ClassProperties<typeof EActionCoreProperties> | TRefCoreProperties;
type TActionPrivateProps = `_${TActionCoreProperties}`;

export {
  EActionCoreProperties,
  type TActionCoreProperties,
  type TActionPrivateProps,
};
