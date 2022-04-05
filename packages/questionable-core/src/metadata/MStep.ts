import { ClassProperties }                        from '../util/types';
import { ERefCoreProperties, TRefCoreProperties } from './MRef';

type TTheseProperties = {
  readonly entryRequirements: 'entryRequirements',
  readonly exitRequirements: 'exitRequirements',
  readonly footer: 'footer',
  readonly info: 'info',
  readonly internalNotes: 'internalNotes',
  readonly order: 'order',
  readonly section: 'section',
  readonly subTitle: 'subTitle',
};
const TheseProperties: TTheseProperties = {
  entryRequirements: 'entryRequirements' as const,
  exitRequirements:  'exitRequirements' as const,
  footer:            'footer' as const,
  info:              'info' as const,
  internalNotes:     'internalNotes' as const,
  order:             'order' as const,
  section:           'section' as const,
  subTitle:          'subTitle' as const,
};

const EStepCoreProperties = { ...TheseProperties, ...ERefCoreProperties };
type TStepCoreProperties = ClassProperties<typeof EStepCoreProperties> | TRefCoreProperties;

export {
  EStepCoreProperties,
  type TStepCoreProperties,
};
