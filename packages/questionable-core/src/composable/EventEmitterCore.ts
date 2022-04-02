/* eslint-disable import/no-cycle */
import { noop }                from 'lodash';
import { catchError }          from '../util/error';
import { error as log }        from '../util/logger';
import {
  IEventCore,
  TAnswerDataCore,
  TEventCore,
  TGateDataCore,
  TOnErrorCore,
  TOnEventCore,
  TPageDataCore,
  TResultDataCore,
  EventCoreClassName as className,
  EEventCoreProperties as p,
} from '../survey/IEventCore';
import { BaseCore } from './BaseCore';
import {
  checkInstanceOf,
  TInstanceOf,
} from '../util/instanceOf';
import { FormCore } from './FormCore';

export class EventEmitterCore implements IEventCore {
  public static readonly [p._name] = className;

  public readonly [p.instanceOfCheck]: TInstanceOf = className;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className, BaseCore._name], obj);
  }

  readonly [p.onActionClick]: TOnEventCore;

  readonly [p.onAnswer]: TOnEventCore;

  readonly [p.onBranch]: TOnErrorCore;

  readonly [p.onAnyEvent]: TOnEventCore;

  readonly [p.onGateSwitch]: TOnEventCore;

  readonly [p.onError]: TOnErrorCore;

  readonly [p.onPage]: TOnEventCore;

  readonly [p.onInit]: TOnEventCore;

  readonly [p.onResults]: TOnEventCore;

  readonly [p.onNoResults]: TOnEventCore;

  public static create(data: Partial<IEventCore> = {}) {
    if (data instanceof EventEmitterCore) {
      return data;
    }
    return new EventEmitterCore(data);
  }

  constructor(data: Partial<IEventCore> = {}) {
    this[p.onActionClick] = data.onActionClick || noop;
    this[p.onAnswer]      = data.onAnswer || noop;
    this[p.onAnyEvent]    = data.onAnyEvent || noop;
    this[p.onError]       = data.onError || noop;
    this[p.onGateSwitch]  = data.onGateSwitch || noop;
    this[p.onInit]        = data.onInit || noop;
    this[p.onNoResults]   = data.onNoResults || noop;
    this[p.onPage]        = data.onPage || noop;
    this[p.onResults]     = data.onResults || noop;
  }

  action(data: FormCore): void {
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

  init(data: FormCore): void {
    this.#event(data, this.onInit);
  }

  noResult(data: FormCore): void {
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
