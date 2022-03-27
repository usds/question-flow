import {
  DIRECTION,
  TAnswerDataCore,
  TPageDataCore,
  TResultDataCore,
  TOnEventCore,
  IEventCore,
  TOnErrorCore,
} from '@usds.gov/questionable-core';
import { IForm }         from './IForm';
import { IQuestionData } from './IQuestionData';
import { IStepData }     from './IStepData';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TPageData = TPageDataCore & {
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
export type TAnswerData = TAnswerDataCore & {
  answer: string;
  /**
   * @hidden
   */
  props: IQuestionData,
  step: string;
}

export type TResultData = TResultDataCore & {
  props: IStepData;
  results: {
    id: string;
    label: string;
    reason: string;
    title: string | undefined;
  }[];
  step: 'results';
}

export type TEvent = TPageData | TAnswerData | TResultData | IForm;

/**
 * Event function type to be used as a callback
 *
 * @title Event Type
 * @hidden
 */
export type TOnEvent = TOnEventCore;

/**
 * Error function type to be used as a callback
 *
 * @title Error Type
 * @hidden
 */
export type TOnError = TOnErrorCore;

export interface IEvent extends IEventCore {
  onActionClick: TOnEvent | undefined,
  onAnswer: TOnEvent | undefined,
  onAnyEvent: TOnEvent | undefined,
  onError: TOnError | undefined,
  onInit: TOnEvent | undefined,
  onNoResults: TOnEvent | undefined,
  onPage: TOnEvent | undefined,
  onResults: TOnEvent | undefined
}
