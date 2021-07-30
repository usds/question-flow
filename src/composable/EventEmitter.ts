import { log, noop } from '../lib';
import { catchError } from '../lib/error';
import {
  TEvent,
  IEvent,
  TPageData,
  TAnswerData,
  TResultData,
  TError,
} from '../survey/IEvent';

export class EventEmitter implements IEvent {
  onAnswer: TEvent = noop;

  onEvent: TEvent = noop;

  onError: TError = noop;

  onPage: TEvent = noop;

  constructor(obj: Partial<EventEmitter>) {
    Object.assign(this, obj);
  }

  page(data: TPageData): void {
    this.event(data);
    try {
      this.onPage(data);
    } catch (e) {
      const error = catchError(e);
      this.error(error, data);
    }
  }

  answer(data: TAnswerData): void {
    this.event(data);
    try {
      if (this.onAnswer) {
        this.onAnswer(data);
      }
    } catch (e) {
      const error = catchError(e);
      this.error(error, data);
    }
  }

  error(e: Error, data: TPageData | TAnswerData | TResultData): void {
    try {
      this.onError(e, data);
    } catch (innerE) {
      log(data, e, innerE);
    }
  }

  event(data: TPageData | TAnswerData | TResultData): void {
    try {
      if (this.onEvent) {
        this.onEvent(data);
      }
    } catch (e) {
      const error = catchError(e);
      this.error(error, data);
    }
  }

  results(data: TResultData): void {
    this.event(data);
  }
}
