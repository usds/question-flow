import { ACTION } from '../lib/enums';

/**
 * Represents something the customer can do in response to receiving a result
 */
export interface IAction {
  /**
   * @title Action
   */
  action: string;
  /**
   * @title Description
   */
  description: string;
  /**
   * @ttitle Name
   */
  name: string;
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Type
   */
  type: ACTION;
}
