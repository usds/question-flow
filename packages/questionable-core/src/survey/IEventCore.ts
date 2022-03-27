import { DIRECTION }             from '../lib/enums';
import { TStringDictionaryCore } from '../lib/types';
import { IFormCore }             from './IFormCore';
import { IQuestionDataCore }     from './IQuestionDataCore';
import { IStepDataCore }         from './IStepDataCore';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageDataCore = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  props: IStepDataCore,
  step: string;
}
/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TAnswerDataCore = {
  answer: string;
  /**
   * @hidden
   */
  props: IQuestionDataCore,
  step: string;
}

/**
 * Event data structure for results
 * @title Event Result Type
 */
export type TResultDataCore = {
  props: IStepDataCore;
  results: {
    id: string;
    label: string;
    reason: string;
    title: string | undefined;
  }[];
  step: 'results';
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

/**
 * Event Model
 * @title Event
 */
export interface IEventCore {
  onActionClick: TOnEventCore | undefined,
  onAnswer: TOnEventCore | undefined,
  onAnyEvent: TOnEventCore | undefined,
  onError: TOnErrorCore | undefined,
  onGateSwitch: TOnEventCore | undefined,
  onInit: TOnEventCore | undefined,
  onNoResults: TOnEventCore | undefined,
  onPage: TOnEventCore | undefined,
  onResults: TOnEventCore | undefined
}
