import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  readonly _age: '_age',
  readonly _birthdate: '_birthdate',
  readonly _finished: '_finished',
  readonly _responses: '_responses',
  readonly _started: '_started',
  readonly age: 'age',
  readonly birthdate: 'birthdate',
  readonly finished: 'finished',
  readonly responses: 'responses',
  readonly started: 'started'
};
const TheseProperties: TTheseProperties = {
  _age:       '_age' as const,
  _birthdate: '_birthdate' as const,
  _finished:  '_finished' as const,
  _responses: '_responses' as const,
  _started:   '_started' as const,
  age:        'age' as const,
  birthdate:  'birthdate' as const,
  finished:   'finished' as const,
  responses:  'responses' as const,
  started:    'started' as const,
};
const EFormCoreProperties               = { ...ECommonCoreProperties, ...TheseProperties };
type TFormCoreProperties = ClassProperties<typeof EFormCoreProperties>;

export {
  EFormCoreProperties,
  type TFormCoreProperties,
};
