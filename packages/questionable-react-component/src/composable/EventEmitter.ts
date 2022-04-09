import {
  catchError, error as log,
  EventEmitterCore,
  IEventCore,
  noop,
} from '@usds.gov/questionable-core';
import { IFormCore } from '../survey';
import {
  TAnswerData,
  TEvent,
  TOnErrorCore,
  TOnEventCore,
  TPageData,
  TResultData,
} from '../survey/IEvent';

export class EventEmitter extends EventEmitterCore implements IEventCore {
  onActionClick: TOnEventCore = noop;

  onAnswer: TOnEventCore = noop;

  onError: TOnErrorCore = noop;

  onAnyEvent: TOnEventCore = noop;

  onPage: TOnEventCore = noop;

  onInit: TOnEventCore = noop;

  onResults: TOnEventCore = noop;

  onNoResults: TOnEventCore = noop;

  constructor(obj: Partial<EventEmitter>) {
    super(obj);
    Object.assign(this, obj);
  }

  action(data: IFormCore): void {
    this.event(data, this.onActionClick);
  }

  init(data: IFormCore): void {
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

  noResult(data: IFormCore): void {
    this.event(data, this.onNoResults);
  }

  error(e: Error, data?: TEvent): void {
    try {
      this.onError(e, data);
    } catch (innerE) {
      log(data, e, innerE);
    }
  }

  event(data: TEvent, callback: TOnEventCore, noAny = true): void {
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
