import {
  ButtonCore,
} from '@usds.gov/questionable-core';

export class Buttons {
  #buttons: ButtonCore[] = [];

  constructor(data: Partial<Buttons> = {}) {
    this.#buttons = data.buttons || [];
    if (data.next) {
      this.next = data.next;
    }
    if (data.prev) {
      this.prev = data.prev;
    }
  }

  get buttons() {
    this.#buttons = this.#buttons || [];
    return this.#buttons;
  }

  get prev() {
    return this.#buttons.find((b) => b.pointer === 'back') || new ButtonCore({ pointer: 'back' });
  }

  set prev(val: ButtonCore) {
    this.#buttons.push(val);
  }

  get next() {
    return this.#buttons.find((b) => b.pointer === 'next') || new ButtonCore({ pointer: 'next' });
  }

  set next(val: ButtonCore) {
    this.#buttons.push(val);
  }
}
