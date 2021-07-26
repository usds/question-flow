import { IQuestionData } from './IQuestionData';
import { IStepData }     from './IStepData';

/**
 * Event data structure to be sent with event callbacks
 * @title Event Data Type
 */
export type TNavData = {
  dir: string;
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
export type TEvent = (data: TNavData | TAnswerData | TResultData) => void;

export interface IEvent {
  onAnswer: TEvent | undefined,
  onEvent: TEvent | undefined,
  onPageBackward: TEvent | undefined,
  onPageForward: TEvent | undefined,
}
