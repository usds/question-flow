import { ClassProperties }           from '../util/types';
import { EComposableCoreProperties } from './MComposable';

const TheseProperties: {
 readonly _ageCalc: '_ageCalc';
 readonly _explanation: '_explanation';
 readonly _maxAge: '_maxAge';
 readonly _minAge: '_minAge';
 readonly _responses: '_responses';
 readonly ageCalc: 'ageCalc';
 readonly explanation: 'explanation';
 readonly maxAge: 'maxAge';
 readonly minAge: 'minAge';
 readonly responses: 'responses';
} = {
  _ageCalc:     '_ageCalc' as const,
  _explanation: '_explanation' as const,
  _maxAge:      '_maxAge' as const,
  _minAge:      '_minAge' as const,
  _responses:   '_responses' as const,
  ageCalc:      'ageCalc' as const,
  explanation:  'explanation' as const,
  maxAge:       'maxAge' as const,
  minAge:       'minAge' as const,
  responses:    'responses' as const,
};
const ERequirementCoreProperties = { ...EComposableCoreProperties, ...TheseProperties };
type TRequirementCoreProperties = ClassProperties<typeof ERequirementCoreProperties>;

export {
  ERequirementCoreProperties,
  type TRequirementCoreProperties,
};
