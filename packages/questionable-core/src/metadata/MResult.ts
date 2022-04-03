import { ClassProperties }     from '../util';
import {
  EComposableCoreProperties,
  TComposableCoreProperties,
} from './MComposable';

type TTheseProperties = {
  readonly _action: '_action';
  readonly _category: '_category';
  readonly _label: '_label';
  readonly _match: '_match';
  readonly _reason: '_reason';
  readonly _requirements: '_requirements';
  readonly _secondaryAction: '_secondaryAction';
  readonly action: 'action';
  readonly category: 'category';
  readonly label: 'label';
  readonly match: 'match';
  readonly reason: 'reason';
  readonly requirements: 'requirements';
  readonly secondaryAction: 'secondaryAction';
}
const TheseProperties: TTheseProperties = {
  _action:          '_action' as const,
  _category:        '_category' as const,
  _label:           '_label' as const,
  _match:           '_match' as const,
  _reason:          '_reason' as const,
  _requirements:    '_requirements' as const,
  _secondaryAction: '_secondaryAction' as const,
  action:           'action' as const,
  category:         'category' as const,
  label:            'label' as const,
  match:            'match' as const,
  reason:           'reason' as const,
  requirements:     'requirements' as const,
  secondaryAction:  'secondaryAction' as const,
};
const EResultCoreProperties             = { ...TheseProperties, ...EComposableCoreProperties };
type TResultCoreProperties = ClassProperties<typeof EResultCoreProperties> | TComposableCoreProperties;

export {
  EResultCoreProperties,
  type TResultCoreProperties,
};
