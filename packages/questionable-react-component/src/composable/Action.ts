import { ActionCore } from '@usds.gov/questionable-core';
import { Button }    from './Button';

/**
 * Represents something the customer can do in response to receiving a result
 */
export class Action extends ActionCore {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  #buttons?: Partial<Button>[] | undefined;

  get buttons() {
    return this.#buttons || [];
  }

  set buttons(val: Button[]) {
    this.#buttons = val;
  }
}
