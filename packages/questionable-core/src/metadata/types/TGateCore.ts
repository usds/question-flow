import { TStringDictionaryCore } from './TStringDictionaryCore';
import { IFormCore }             from '../IFormCore';
import { TAnswerDataCore }       from './TAnswerDataCore';
import { TPageDataCore }         from './TPageDataCore';
import { TResultDataCore }       from './TResultDataCore';

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

export type TEventCore = TPageDataCore |
  TAnswerDataCore |
  TResultDataCore |
  IFormCore |
  TGateDataCore;
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
  data: TStringDictionaryCore
) => void;
