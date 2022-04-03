import { ClassProperties } from '../util/types';

const TheseProperties: {
 readonly _name: '_name',
 readonly instanceOfCheck: 'instanceOfCheck',
} = {
  _name:           '_name' as const,
  instanceOfCheck: 'instanceOfCheck' as const,
};

type TCommonCoreProperties = ClassProperties<typeof TheseProperties>;

export {
  TheseProperties as ECommonCoreProperties,
  type TCommonCoreProperties,
};
