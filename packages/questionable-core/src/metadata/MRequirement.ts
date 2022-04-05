import { ClassProperties }    from '../util/types';
import { ERefCoreProperties } from './MRef';

const TheseProperties: {
 readonly ageCalc: 'ageCalc';
 readonly explanation: 'explanation';
 readonly maxAge: 'maxAge';
 readonly minAge: 'minAge';
 readonly responses: 'responses';
} = {
  ageCalc:     'ageCalc' as const,
  explanation: 'explanation' as const,
  maxAge:      'maxAge' as const,
  minAge:      'minAge' as const,
  responses:   'responses' as const,
};
const ERequirementCoreProperties = { ...ERefCoreProperties, ...TheseProperties };
type TRequirementCoreProperties = ClassProperties<typeof ERequirementCoreProperties>;

export {
  ERequirementCoreProperties,
  type TRequirementCoreProperties,
};
