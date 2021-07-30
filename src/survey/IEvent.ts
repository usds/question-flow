import { DIRECTION }     from '../lib/enums';
import { IQuestionData } from './IQuestionData';
import { IStepData }     from './IStepData';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageData = {
  dir: DIRECTION;
  /**
   * @hidden
   */
  props: IStepData,
  step: string;
}

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TAnswerData = {
  answer: string;
  /**
   * @hidden
   */
  props: IQuestionData,
  step: string;
}

export type TResultData = {
  props: IStepData;
  results: {
    id: string;
    label: string;
    reason: string;
    title: string | undefined;
  }[];
  step: 'results';
}

/**
 * Event function type to be used as a callback
 *
 * @title Event Type
 * @hidden
 */
export type TEvent = (data: TPageData | TAnswerData | TResultData) => void;

/**
 * Error function type to be used as a callback
 *
 * @title Error Type
 * @hidden
 */
export type TError = (e: Error, data?: TPageData | TAnswerData | TResultData) => void;

export interface IEvent {
  onAnswer: TEvent | undefined,
  onError: TError | undefined,
  onEvent: TEvent | undefined,
  onPage: TEvent | undefined,
}
