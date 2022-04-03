import { ClassProperties }                          from '../util/types';
import { EStepCoreProperties, TStepCoreProperties } from './MStep';

type TTheseProperties = {
  readonly _answer: '_answer';
  readonly _answers: '_answers';
  readonly _branch: '_branch';
  readonly _type: '_type';
  readonly answer: 'answer';
  readonly answers: 'answers';
  readonly branch: 'branch';
  readonly type: 'type';
};
const TheseProperties: TTheseProperties = {
  _answer:  '_answer' as const,
  _answers: '_answers' as const,
  _branch:  '_branch' as const,
  _type:    '_type' as const,
  answer:   'answer' as const,
  answers:  'answers' as const,
  branch:   'branch' as const,
  type:     'type' as const,
};

const EQuestionCoreProperties = { ...TheseProperties, ...EStepCoreProperties };
type TQuestionCoreProperties = ClassProperties<typeof EQuestionCoreProperties> | TStepCoreProperties;

export {
  EQuestionCoreProperties,
  type TQuestionCoreProperties,
};
