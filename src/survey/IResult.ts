import { IRequirement } from './IStep';

/**
 * Represents a potential result based on a customer's answers
 */
export interface IResult {
  /**
   * Unique identifier
   *
   * @title Id
   * @hidden Not viewable/editable in Design Mode
   */
  id: string;
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
   * Name of this result
   *
   * @title Name
   */
  name: string;
  /**
   * Collection of requirements required to achieve this result
   *
   * @title Requirements
   */
  requirements: IRequirement[];
}
