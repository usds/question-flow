import { DIRECTION }             from '../util/enums';
import { TStringDictionaryCore } from '../util/types';
import { IFormCore }             from './IFormCore';
import { IQuestionCore }         from './IQuestionCore';
import { IResponseCore }         from './IResponseCore';
import { IResultCore }           from './IResultCore';
import { IStepCore }             from './IStepCore';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageDataCore = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  step: IStepCore;
};
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
  step: IQuestionCore;
};

/**
 * Event data structure for results
 * @title Event Result Type
 */
export type TResultDataCore = {
  results: IResultCore[];
  step: IStepCore;
};

/**
 * Represents any type of mutation which has significant impact
 *
 * @title Gate Type
 */
export type TGateCore = 'branch' | 'age';

export type TGateDataCore = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  gate: TGateCore;
};

/**
 * Generic data input for event context
 */
export type TEventCore =
  | TPageDataCore
  | TAnswerDataCore
  | TResultDataCore
  | IFormCore
  | TGateDataCore;

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
export type TOnGateSwitchCore = (
  gate: TGateCore,
  data: TStringDictionaryCore,
) => void;

/**
 * Event Model
 * @title Event
 */
export interface IEventCore {
  readonly onActionClick?: TOnEventCore;
  readonly onAnswer?: TOnEventCore;
  readonly onAnyEvent?: TOnEventCore;
  readonly onBranch?: TOnEventCore;
  readonly onError?: TOnErrorCore;
  readonly onGateSwitch?: TOnEventCore;
  readonly onInit?: TOnEventCore;
  readonly onNoResults?: TOnEventCore;
  readonly onPage?: TOnEventCore;
  readonly onResults?: TOnEventCore;
}
