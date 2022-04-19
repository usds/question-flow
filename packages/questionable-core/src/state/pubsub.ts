/* eslint-disable @typescript-eslint/no-explicit-any */
// This is a stubbed class, it does nothing at the moment
// Do not change the API when implementing

type TEventType =
  | 'start'
  | 'finish'
  | 'error'
  | 'page'
  | 'action'
  | 'warn'
  | 'answer'
  | string;

type TEvent = {
  event: any;
  type: TEventType;
};

type TSubscriber = {
  trigger: any;
  type: TEventType;
};

export class PubSub {
  #events: TEvent[] = [];

  #subscribers: TSubscriber[] = [];

  async #notify({ type, event }: TEvent) {
    return Promise.all(
      this.#subscribers
        .filter((s) => s.type === type)
        .map((s) => s.trigger(event)),
    );
  }

  constructor(
    {
      events,
      subscribers,
    }: { events: TEvent[]; subscribers: TSubscriber[] } = {
      events:      [],
      subscribers: [],
    },
  ) {
    this.#events      = events || [];
    this.#subscribers = subscribers || [];
    this.events       = new Set<string>(
      this.#events
        .map((e) => e.type)
        .concat(this.#subscribers.map((s) => s.type)),
    );
  }

  events = new Set<string>();

  publish({ type, event }: TEvent) {
    this.events.add(type);
    // this.#events.push({ event, type });
    return this.#notify({ event, type });
  }

  subscribe({ type, trigger }: TSubscriber) {
    this.#subscribers.push({ trigger, type });
  }
}

export const eventedCore = new PubSub();
