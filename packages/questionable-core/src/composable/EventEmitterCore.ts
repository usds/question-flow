import { catchError }         from '../lib/error';
import { error as log, noop } from '../lib';
import { IFormCore }          from '../survey';
import {
  IEventCore,
  TAnswerDataCore,
  TEventCore,
  TGateDataCore,
  TOnErrorCore,
  TOnEventCore,
  TPageDataCore,
  TResultDataCore,
} from '../survey/IEventCore';

export class EventEmitterCore implements IEventCore {
  onActionClick: TOnEventCore = noop;

  onAnswer: TOnEventCore = noop;

  onBranch: TOnErrorCore = noop;

  onAnyEvent: TOnEventCore = noop;

  onGateSwitch: TOnEventCore = noop;

  onError: TOnErrorCore = noop;

  onPage: TOnEventCore = noop;

  onInit: TOnEventCore = noop;

  onResults: TOnEventCore = noop;

  onNoResults: TOnEventCore = noop;

  constructor(obj: Partial<EventEmitterCore>) {
    Object.assign(this, obj);
  }

  action(data: IFormCore): void {
    this.#event(data, this.onActionClick);
  }

  answer(data: TAnswerDataCore): void {
    this.#event(data, this.onAnswer);
  }

  gate(data: TGateDataCore): void {
    this.#event(data, this.onGateSwitch);
  }

  error(e: Error, data?: TEventCore): void {
    try {
      this.onError(e, data);
    } catch (innerE) {
      log(data, e, innerE);
    }
  }

  init(data: IFormCore): void {
    this.#event(data, this.onInit);
  }

  noResult(data: IFormCore): void {
    this.#event(data, this.onNoResults);
  }

  page(data: TPageDataCore): void {
    this.#event(data, this.onPage);
  }

  result(data: TResultDataCore): void {
    this.#event(data, this.onResults);
  }

  /**
   * Internal event handler
   *
   * @param data Object with event data
   * @param callback Method to execute
   * @param noAny Prevent the onAny event from infinite recursion
   */
  #event(data: TEventCore, callback: TOnEventCore, noAny = true): void {
    if (noAny) {
      // This is a recursive call, so we do not need to catch errors
      this.#event(data, this.onAnyEvent, false);
    }
    try {
      callback(data);
    } catch (e) {
      const error = catchError(e);
      this.error(error, data);
    }
  }
}
