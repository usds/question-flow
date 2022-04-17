import { TAgeCalcCore, TAgeCore }            from '../util/types';
import { BASE_TYPE, IRefCore, TEnmBaseType } from './IRefCore';
import { IResponseCore }                     from './IResponseCore';

export type TRequirementType = 'required' | 'non-required';
type TEnmRequirementType = TEnmBaseType & {
  NON_REQUIRED: TRequirementType & 'non-required',
  REQUIRED: TRequirementType & 'required'
}
export const REQUIREMENT_TYPE: TEnmRequirementType = {
  ...BASE_TYPE,
  NON_REQUIRED: 'non-required',
  REQUIRED:     'required',
};
/**
 * Defines an individual requirement for accessing a step
 */
export interface IRequirementCore extends IRefCore {
  /**
   * Optional, custom calculator for performing age-specific validation
   * @hidden JSON schema does not support functions
   */
  ageCalc?: TAgeCalcCore;
  /**
   * User facing description of this requirement
   *
   * @title Exlanation
   */
  explanation: string;
  /**
   * Optional maximum age allowed for this requirement
   *
   * @title Maximum Age
   */
  maxAge?: TAgeCore;
  /**
   * Optional minimum age allowed for this requirement
   *
   * @title Minimum Age
   */
  minAge?: TAgeCore;
  /**
   * Map of step id to required answer values
   *
   * @title Answers
   */
  responses: IResponseCore[];

  type?: TRequirementType;
}
