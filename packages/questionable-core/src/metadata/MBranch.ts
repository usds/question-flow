import { ClassProperties } from '../util';
import {
  ERefCoreProperties,
  TRefCoreProperties,
} from './MRef';

const TheseProperties: {
  readonly questions: 'questions',
} = {
  questions: 'questions' as const,
};

const EBranchCoreProperties = { ...TheseProperties, ...ERefCoreProperties };
type TBranchCoreProperties = ClassProperties<typeof EBranchCoreProperties> | TRefCoreProperties;

export {
  EBranchCoreProperties,
  type TBranchCoreProperties,
};
