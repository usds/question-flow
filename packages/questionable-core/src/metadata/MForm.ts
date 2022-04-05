import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  readonly age: 'age',
  readonly birthdate: 'birthdate',
  readonly finished: 'finished',
  readonly responses: 'responses',
  readonly started: 'started'
};
const TheseProperties: TTheseProperties = {
  age:       'age' as const,
  birthdate: 'birthdate' as const,
  finished:  'finished' as const,
  responses: 'responses' as const,
  started:   'started' as const,
};
const EFormCoreProperties               = { ...ECommonCoreProperties, ...TheseProperties };
type TFormCoreProperties = ClassProperties<typeof EFormCoreProperties>;

export {
  EFormCoreProperties,
  type TFormCoreProperties,
};
