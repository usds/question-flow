/**
 * Defines the known component types for design
 */
export type TDesignType = 'Edit';
type TEnmDesignType = {
  EDIT: TDesignType & 'Edit';
};
export const DESIGN_TYPE: TEnmDesignType = {
  EDIT: 'Edit',
};
