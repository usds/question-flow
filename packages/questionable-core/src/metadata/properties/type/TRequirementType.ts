import { BASE_TYPE, TEnmBaseType } from './TBaseType';

export type TRequirementType = 'required' | 'non-required';
type TEnmRequirementType = TEnmBaseType & {
  NON_REQUIRED: TRequirementType & 'non-required';
  REQUIRED: TRequirementType & 'required';
};
export const REQUIREMENT_TYPE: TEnmRequirementType = {
  ...BASE_TYPE,
  NON_REQUIRED: 'non-required',
  REQUIRED:     'required',
};
