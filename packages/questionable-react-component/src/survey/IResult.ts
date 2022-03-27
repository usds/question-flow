import { IAction }      from './IAction';
import { IRef }         from './IRef';
import { IRequirement } from './IStep';

/**
 * Represents a potential result based on a customer's answers
 */
export interface IResult extends IRef {
  /**
   * Defines the primary call to action for this result
   *
   * @title Call to Action
   * @hidden
   */
  action: Partial<IAction>;
  /**
   * Optional tag/category to group results
   */
  category?: string;
  /**
   * Identify the result (e.g. 'Benefit name')
   *
   * @title Label
   */
  label: string;
  /**
   * Requirement used for applying this result
   * Could have more than one, we only store the first
   *
   * @title Match
   * @hidden Not viewable/editable in Design Mode
   */
  match?: IRequirement;
  /**
   * Human readable explanation of result determination
   *
   * @title Reason
   */
  reason?: string;
  /**
   * Collection of requirements required to achieve this result
   *
   * @title Requirements
   */
  requirements: IRequirement[];
  /**
   * Additional action which may follow after the primary
   *
   * @title Secondary Action
   * @hidden
   */
  secondaryAction?: Partial<IAction>;
}
