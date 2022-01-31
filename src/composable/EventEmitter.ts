import { catchError }         from '../lib/error';
import { error as log, noop } from '../lib';
import { IForm }              from '../survey';
import {
  IEvent,
  TAnswerData,
  TEvent,
  TOnError,
  TOnEvent,
  TPageData,
  TResultData,
} from '../survey/IEvent';

export class EventEmitter implements IEvent {
  onAnswer: TOnEvent = noop;

  onError: TOnError = noop;

  onAnyEvent: TOnEvent = noop;

  onPage: TOnEvent = noop;

  onInit: TOnEvent = noop;

  onResults: TOnEvent = noop;

  onNoResults: TOnEvent = noop;

  constructor(obj: Partial<EventEmitter>) {
    Object.assign(this, obj);
  }

  init(data: IForm): void {
    this.event(data, this.onInit);
  }

  page(data: TPageData): void {
    this.event(data, this.onPage);
  }

  answer(data: TAnswerData): void {
    this.event(data, this.onAnswer);
  }

  result(data: TResultData): void {
    this.event(data, this.onResults);
  }

  noResult(data: IForm): void {
    this.event(data, this.onNoResults);
  }

  error(e: Error, data?: TEvent): void {
    try {
      this.onError(e, data);
    } catch (innerE) {
      log(data, e, innerE);
    }
  }

  event(data: TEvent, callback: TOnEvent, noAny = true): void {
    if (noAny) {
      // This is a recursive call, so we do not need to catch errors
      this.event(data, this.onAnyEvent, false);
    }
    try {
      callback(data);
    } catch (e) {
      const error = catchError(e);
      this.error(error, data);
    }
  }
}
