import { ClassProperties }     from '../util';
import {
  EComposableCoreProperties,
  TComposableCoreProperties,
} from './MComposable';

const TheseProperties: {
  readonly questions: 'questions',
} = {
  questions: 'questions' as const,
};

const EBranchCoreProperties = { ...TheseProperties, ...EComposableCoreProperties };
type TBranchCoreProperties = ClassProperties<typeof EBranchCoreProperties> | TComposableCoreProperties;

export {
  EBranchCoreProperties,
  type TBranchCoreProperties,
};
