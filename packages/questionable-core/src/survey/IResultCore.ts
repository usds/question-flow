import { IActionCore }                from './IActionCore';
import { IRefCore }                   from './IRefCore';
import { IRequirementCore }           from './IStepCore';
import { EResultCoreProperties as p } from '../metadata/MResult';
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
  [p.action]: Partial<IActionCore>;
  /**
   * Optional tag/category to group results
   */
  [p.category]?: string;
  /**
   * Identify the result (e.g. 'Benefit name')
   *
   * @title Label
   */
  [p.label]: string;
  /**
   * Requirement used for applying this result
   * Could have more than one, we only store the first
   *
   * @title Match
   * @hidden Not viewable/editable in Design Mode
   */
  [p.match]?: IRequirementCore;
  /**
   * Human readable explanation of result determination
   *
   * @title Reason
   */
  [p.reason]?: string;
  /**
   * Collection of requirements required to achieve this result
   *
   * @title Requirements
   */
  [p.requirements]: IRequirementCore[];
  /**
   * Additional action which may follow after the primary
   *
   * @title Secondary Action
   * @hidden
   */
  [p.secondaryAction]?: Partial<IActionCore>;
}
