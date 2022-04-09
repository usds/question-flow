import { ActionCore } from '@usds.gov/questionable-core';
import { IButton }    from './IButton';

/**
 * Represents something the customer can do in response to receiving a result
 */
export type IAction = ActionCore & {
  /**
   * Buttons to complete the action
   * @title Buttons
   * @hidden
   */
  buttons?: Partial<IButton>[] | undefined;
}
