import { ClassProperties }                          from '../types/ClassProperties';
import { EStepCoreProperties, TStepCoreProperties } from './MStep';

type TTheseProperties = {
  readonly answer: 'answer';
  readonly answers: 'answers';
  readonly branch: 'branch';
  readonly type: 'type';
};
const TheseProperties: TTheseProperties = {
  answer:  'answer' as const,
  answers: 'answers' as const,
  branch:  'branch' as const,
  type:    'type' as const,
};

const EQuestionCoreProperties = { ...TheseProperties, ...EStepCoreProperties };
type TQuestionCoreProperties = ClassProperties<typeof EQuestionCoreProperties> | TStepCoreProperties;

export {
  EQuestionCoreProperties,
  type TQuestionCoreProperties,
};
