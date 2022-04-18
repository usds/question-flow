/* eslint-disable import/no-cycle */
import { noop } from 'lodash';
import {
  IEventCore,
} from '../metadata/IEventCore';
import {
  TEventCore,
  TGateDataCore,
  TOnErrorCore,
  TOnEventCore,
} from '../metadata/types/TGateCore';
import { TResultDataCore }                         from '../metadata/types/TResultDataCore';
import { TAnswerDataCore }                         from '../metadata/types/TAnswerDataCore';
import { TPageDataCore }                           from '../metadata/types/TPageDataCore';
import { catchError }                              from '../lib/error';
import { checkInstanceOf, ClassList, TInstanceOf } from '../lib/instanceOf';
import { error as log }                            from '../lib/logger';
import { BaseCore }                                from './BaseCore';
import { FormCore }                                from './FormCore';

const className = ClassList['event-emitter'];
export class EventEmitterCore extends BaseCore implements IEventCore {
  public get instanceOfCheck(): TInstanceOf {
    return className;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static [Symbol.hasInstance](obj: any) {
    return checkInstanceOf([className], obj);
  }

  readonly onActionClick: TOnEventCore;

  readonly onAnswer: TOnEventCore;

  readonly onBranch: TOnEventCore;

  readonly onAnyEvent: TOnEventCore;

  readonly onGateSwitch: TOnEventCore;

  readonly onError: TOnErrorCore;

  readonly onPage: TOnEventCore;

  readonly onInit: TOnEventCore;

  readonly onResults: TOnEventCore;

  readonly onNoResults: TOnEventCore;

  public static override create(data: Partial<EventEmitterCore> = {}) {
    if (data instanceof EventEmitterCore) {
      return data;
    }
    return new EventEmitterCore(data);
  }

  constructor(data: Partial<EventEmitterCore> = {}) {
    super(data);
    this.onActionClick = data.onActionClick || noop;
    this.onAnswer      = data.onAnswer || noop;
    this.onAnyEvent    = data.onAnyEvent || noop;
    this.onBranch      = data.onBranch || noop;
    this.onError       = data.onError || noop;
    this.onGateSwitch  = data.onGateSwitch || noop;
    this.onInit        = data.onInit || noop;
    this.onNoResults   = data.onNoResults || noop;
    this.onPage        = data.onPage || noop;
    this.onResults     = data.onResults || noop;
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
