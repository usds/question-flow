/* eslint-disable import/no-cycle */
import { merge, noop }  from 'lodash';
import { catchError }   from '../util/error';
import { error as log } from '../util';
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
import { BaseCore }                                     from './BaseCore';
import {
  checkInstanceOf, getClassName, PREFIX, TInstanceOf,
} from '../util/instanceOf';
import { FormCore } from './FormCore';

const defaults = {
  onActionClick: noop,
  onAnswer:      noop,
  onAnyEvent:    noop,
  onError:       noop,
  onGateSwitch:  noop,
  onInit:        noop,
  onNoResults:   noop,
  onPage:        noop,
  onResults:     noop,
};

export class EventEmitterCore extends BaseCore implements IEventCore {
  protected static override _name = getClassName(PREFIX.EVENT_EMITTER);

  protected override instanceOfCheck: TInstanceOf = EventEmitterCore._name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static override[Symbol.hasInstance](obj: any) {
    return checkInstanceOf([EventEmitterCore._name, BaseCore._name], obj);
  }

  onActionClick!: TOnEventCore;

  onAnswer!: TOnEventCore;

  onBranch!: TOnErrorCore;

  onAnyEvent!: TOnEventCore;

  onGateSwitch!: TOnEventCore;

  onError!: TOnErrorCore;

  onPage!: TOnEventCore;

  onInit!: TOnEventCore;

  onResults!: TOnEventCore;

  onNoResults!: TOnEventCore;

  constructor(data: Partial<EventEmitterCore>, form: FormCore) {
    super(form);
    merge(this, defaults);
    merge(this, data);
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
