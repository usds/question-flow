import { IActionCore }                       from './IActionCore';
import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';
import { IRequirementCore }                  from './IRequirementCore';

export type TResultType = 'match' | 'non-match';
type TEnmResultType = TEnmBaseType & {
  MATCH: TResultType & 'match',
  NON_MATCH: TResultType & 'non-match';
}
export const RESULT_TYPE: TEnmResultType = {
  ...BASE_TYPE,
  MATCH:     'match',
  NON_MATCH: 'non-match',
};

/**
 * Represents a potential result based on a customer's answers
 */
export interface IResultCore extends IRefCore {
  /**
   * Defines the primary call to action for this result
   *
   * @title Call to Action
   * @hidden
   */
  action?: IActionCore;
  /**
   * Optional tag/category to group results
   */
  category?: string;
  /**
   * Identify the result (e.g. 'Benefit name')
   *
   * @title Label
   */
  label?: string;
  /**
   * Requirement used for applying this result
   * Could have more than one, we only store the first
   *
   * @title Match
   * @hidden Not viewable/editable in Design Mode
   */
  match?: IRequirementCore;
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
  requirements?: IRequirementCore[];
  /**
   * Additional action which may follow after the primary
   *
   * @title Secondary Action
   * @hidden
   */
  secondaryAction?: IActionCore;

  type?: TResultType;
}
