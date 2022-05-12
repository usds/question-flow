import { ClassProperties }                          from '../types/ClassProperties';
import { EStepCoreProperties, TStepCoreProperties } from './MStep';

type TTheseProperties = {
  readonly  body: 'body';
  readonly  bodyHeader: 'bodyHeader';
  readonly  bodySubHeader: 'bodySubHeader';
  readonly  type: 'type';
};
const TheseProperties: TTheseProperties = {
  body:          'body',
  bodyHeader:    'bodyHeader',
  bodySubHeader: 'bodySubHeader',
  type:          'type',
};
const EPageCoreProperties               = { ...TheseProperties, ...EStepCoreProperties };
type TPageCoreProperties = ClassProperties<typeof EPageCoreProperties> | TStepCoreProperties;

export {
  EPageCoreProperties,
  type TPageCoreProperties,
};
