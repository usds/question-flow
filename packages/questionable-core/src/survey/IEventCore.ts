import {
  FormCore,
  QuestionCore,
  ResponseCore,
  ResultCore,
  StepCore,
} from '../composable';
import { DIRECTION }             from '../util/enums';
import { TStringDictionaryCore } from '../util/types';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageDataCore = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  step: StepCore
}
/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TAnswerDataCore = {
  answer: string;
  responses: ResponseCore[] | QuestionCore[];
  /**
   * @hidden
   */
  step: QuestionCore
}

/**
 * Event data structure for results
 * @title Event Result Type
 */
export type TResultDataCore = {
  results: ResultCore[];
  step: StepCore;
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
  | TAnswerDataCore | TResultDataCore | FormCore | TGateDataCore;

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
