import { ClassProperties }                                      from '../util/types';
import { EComposableCoreProperties, TComposableCoreProperties } from './MComposable';

type TTheseProperties = {
  readonly _entryRequirements: '_entryRequirements',
  readonly _exitRequirements: '_exitRequirements',
  readonly _footer: '_footer',
  readonly _info: '_info',
  readonly _internalNotes: '_internalNotes',
  readonly _order: '_order',
  readonly _section: '_section',
  readonly _subTitle: '_subTitle',
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
  _entryRequirements: '_entryRequirements' as const,
  _exitRequirements:  '_exitRequirements' as const,
  _footer:            '_footer' as const,
  _info:              '_info' as const,
  _internalNotes:     '_internalNotes' as const,
  _order:             '_order' as const,
  _section:           '_section' as const,
  _subTitle:          '_subTitle' as const,
  entryRequirements:  'entryRequirements' as const,
  exitRequirements:   'exitRequirements' as const,
  footer:             'footer' as const,
  info:               'info' as const,
  internalNotes:      'internalNotes' as const,
  order:              'order' as const,
  section:            'section' as const,
  subTitle:           'subTitle' as const,
};

const EStepCoreProperties = { ...TheseProperties, ...EComposableCoreProperties };
type TStepCoreProperties = ClassProperties<typeof EStepCoreProperties> | TComposableCoreProperties;

export {
  EStepCoreProperties,
  type TStepCoreProperties,
};
