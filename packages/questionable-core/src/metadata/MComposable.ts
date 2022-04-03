import { ClassProperties }     from '../util/types';
import { EBaseCoreProperties } from './MBase';

const TheseProperties: {
 readonly _questionnaire: '_questionnaire',
 readonly questionnaire: 'questionnaire'
} = {
  _questionnaire: '_questionnaire' as const,
  questionnaire:  'questionnaire' as const,
};
const EComposableCoreProperties = { ...EBaseCoreProperties, ...TheseProperties };
type TComposableCoreProperties = ClassProperties<typeof EComposableCoreProperties>;

export {
  EComposableCoreProperties,
  type TComposableCoreProperties,
};
