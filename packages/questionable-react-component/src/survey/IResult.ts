import { ResultCore } from '@usds.gov/questionable-core';
import { IAction }    from './IAction';

/**
 * Represents a potential result based on a customer's answers
 */
export type IResult = ResultCore & {
  /**
   * Defines the primary call to action for this result
   *
   * @title Call to Action
   * @hidden
   */
  action?: Partial<IAction> | undefined;
  /**
   * Additional action which may follow after the primary
   *
   * @title Secondary Action
   * @hidden
   */
  secondaryAction?: Partial<IAction> | undefined;
}
