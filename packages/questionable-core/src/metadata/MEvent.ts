import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  readonly onActionClick: 'onActionClick',
  readonly onAnswer: 'onAnswer',
  readonly onAnyEvent: 'onAnyEvent',
  readonly onBranch: 'onBranch',
  readonly onError: 'onError',
  readonly onGateSwitch: 'onGateSwitch',
  readonly onInit: 'onInit',
  readonly onNoResults: 'onNoResults',
  readonly onPage: 'onPage',
  readonly onResults: 'onResults'
};
const TheseProperties: TTheseProperties = {
  onActionClick: 'onActionClick' as const,
  onAnswer:      'onAnswer' as const,
  onAnyEvent:    'onAnyEvent' as const,
  onBranch:      'onBranch' as const,
  onError:       'onError' as const,
  onGateSwitch:  'onGateSwitch' as const,
  onInit:        'onInit' as const,
  onNoResults:   'onNoResults' as const,
  onPage:        'onPage' as const,
  onResults:     'onResults',
};
const EEventCoreProperties              = { ...ECommonCoreProperties, ...TheseProperties };
type TEventCoreProperties = ClassProperties<typeof EEventCoreProperties>;
export {
  EEventCoreProperties,
  type TEventCoreProperties,
};
