import { ClassProperties } from '../types/ClassProperties';

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
