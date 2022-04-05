import { ClassProperties } from '../util/types';

const TheseProperties: {
 readonly instanceOfCheck: 'instanceOfCheck',
} = {
  instanceOfCheck: 'instanceOfCheck' as const,
};

type TCommonCoreProperties = ClassProperties<typeof TheseProperties>;

export {
  TheseProperties as ECommonCoreProperties,
  type TCommonCoreProperties,
};
