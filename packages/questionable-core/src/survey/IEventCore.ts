import { DIRECTION }                               from '../util/enums';
import { getInstanceName, PREFIX }                 from '../util/instanceOf';
import { ClassProperties, TStringDictionaryCore }  from '../util/types';
import { IFormCore }                               from './IFormCore';
import { ECommonCoreProperties }                   from './IRefCore';
import { IResultCore }                             from './IResultCore';
import { IQuestionCore, IResponseCore, IStepCore } from './IStepCore';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageDataCore = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  step: IStepCore
}
/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TAnswerDataCore = {
  answer: string;
  responses: IResponseCore[] | IQuestionCore[];
  /**
   * @hidden
   */
  step: IQuestionCore
}

/**
 * Event data structure for results
 * @title Event Result Type
 */
export type TResultDataCore = {
  results: IResultCore[];
  step: IStepCore;
}

/**
 * Represents any type of mutation which has significant impact
 *
 * @title Gate Type
 */
export type TGateCore = 'branch' | 'age';

export type TGateDataCore = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  gate: TGateCore
};

/**
 * Generic data input for event context
 */
export type TEventCore = TPageDataCore
  | TAnswerDataCore | TResultDataCore | IFormCore | TGateDataCore;

/**
 * Event function type to be used as a callback
 *
 * @title Event Type
 * @hidden
 */
export type TOnEventCore = (data: TEventCore) => void;

/**
 * Error function type to be used as a callback
 *
 * @title Error Type
 * @hidden
 */
export type TOnErrorCore = (e: Error, data?: TEventCore) => void;

/**
 * Event triggered when gates are switched
 *
 * @title Gate Switch Event
 *
 * @title Gate Switch Event
 * @hidden
 */
export type TOnGateSwitchCore = (gate: TGateCore, data: TStringDictionaryCore) => void;

export const EventCoreClassName = getInstanceName(PREFIX.EVENT_EMITTER);
export type TEEventCoreProperties = {
  onActionClick: 'onActionClick',
  onAnswer: 'onAnswer',
  onAnyEvent: 'onAnyEvent',
  onBranch: 'onBranch',
  onError: 'onError',
  onGateSwitch: 'onGateSwitch',
  onInit: 'onInit',
  onNoResults: 'onNoResults',
  onPage: 'onPage',
  onResults: 'onResults'
};
const EventProps: TEEventCoreProperties = {
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
export const EEventCoreProperties = { ...ECommonCoreProperties, ...EventProps };
export type EventCoreProperties = ClassProperties<typeof EEventCoreProperties>;
// For (a little) brevity in interface members
const p = EEventCoreProperties;
/**
 * Event Model
 * @title Event
 */
export interface IEventCore {
  readonly [p.onActionClick]: TOnEventCore | undefined,
  readonly [p.onAnswer]: TOnEventCore | undefined,
  readonly [p.onAnyEvent]: TOnEventCore | undefined,
  readonly [p.onError]: TOnErrorCore | undefined,
  readonly [p.onGateSwitch]: TOnEventCore | undefined,
  readonly [p.onInit]: TOnEventCore | undefined,
  readonly [p.onNoResults]: TOnEventCore | undefined,
  readonly [p.onPage]: TOnEventCore | undefined,
  readonly [p.onResults]: TOnEventCore | undefined
}
