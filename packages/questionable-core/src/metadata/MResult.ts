import { ClassProperties } from '../util/types';
import {
  ERefCoreProperties,
  TRefCoreProperties,
} from './MRef';

type TTheseProperties = {
  readonly action: 'action';
  readonly category: 'category';
  readonly label: 'label';
  readonly match: 'match';
  readonly reason: 'reason';
  readonly requirements: 'requirements';
  readonly secondaryAction: 'secondaryAction';
}
const TheseProperties: TTheseProperties = {
  action:          'action' as const,
  category:        'category' as const,
  label:           'label' as const,
  match:           'match' as const,
  reason:          'reason' as const,
  requirements:    'requirements' as const,
  secondaryAction: 'secondaryAction' as const,
};
const EResultCoreProperties             = { ...TheseProperties, ...ERefCoreProperties };
type TResultCoreProperties = ClassProperties<typeof EResultCoreProperties> | TRefCoreProperties;

export {
  EResultCoreProperties,
  type TResultCoreProperties,
};
