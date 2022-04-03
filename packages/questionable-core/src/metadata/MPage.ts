import { ClassProperties }                          from '../util/types';
import { EStepCoreProperties, TStepCoreProperties } from './MStep';

type TTheseProperties = {
readonly _body: '_body';
readonly _bodyHeader: '_bodyHeader';
readonly _bodySubHeader: '_bodySubHeader';
readonly _type: '_type';
readonly  body: 'body';
readonly  bodyHeader: 'bodyHeader';
readonly  bodySubHeader: 'bodySubHeader';
readonly  type: 'type';
};
const TheseProperties: TTheseProperties = {
  _body:          '_body',
  _bodyHeader:    '_bodyHeader',
  _bodySubHeader: '_bodySubHeader',
  _type:          '_type',
  body:           'body',
  bodyHeader:     'bodyHeader',
  bodySubHeader:  'bodySubHeader',
  type:           'type',
};
const EPageCoreProperties               = { ...TheseProperties, ...EStepCoreProperties };
type TPageCoreProperties = ClassProperties<typeof EPageCoreProperties> | TStepCoreProperties;

export {
  EPageCoreProperties,
  type TPageCoreProperties,
};
