import {
  DIRECTION,
  TAnswerDataCore,
  TPageDataCore,
  TResultDataCore,
  IFormCore,
} from '@usds.gov/questionable-core';
import { IStepData, IQuestionData } from './IStepData';

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

export type TEvent = TPageData | TAnswerData | TResultData | IFormCore;
