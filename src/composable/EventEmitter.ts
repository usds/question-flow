import { DIRECTION, log }                               from '../lib';
import {
  TEvent, IEvent, TNavData, TAnswerData, TResultData,
} from '../survey/IEvent';

export class EventEmitter implements IEvent {
  onAnswer: TEvent | undefined;

  onEvent: TEvent | undefined;

  onPageBackward: TEvent | undefined;

  onPageForward: TEvent | undefined;

  constructor(obj: Partial<EventEmitter>) {
    Object.assign(this, obj);
  }

  page(data: TNavData): void {
    this.event(data);
    try {
      if (data.dir === DIRECTION[DIRECTION.BACKWARD]) {
        if (this.onPageBackward) {
          this.onPageBackward(data);
        }
      } else if (this.onPageForward) {
        this.onPageForward(data);
      }
    } catch (e) {
      log({ data, e });
    }
  }

  answer(data: TAnswerData): void {
    this.event(data);
    try {
      if (this.onAnswer) {
        this.onAnswer(data);
      }
    } catch (e) {
      log({ data, e });
    }
  }

  event(data: TNavData | TAnswerData | TResultData): void {
    try {
      if (this.onEvent) {
        this.onEvent(data);
      }
    } catch (e) {
      log({ data, e });
    }
  }

  results(data: TResultData): void {
    this.event(data);
  }
}
