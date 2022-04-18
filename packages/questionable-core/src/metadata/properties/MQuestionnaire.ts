import { ClassProperties }       from '../types/ClassProperties';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  readonly actions: 'actions';
  readonly branches: 'branches';
  readonly config: 'config';
  readonly flow: 'flow';
  readonly form: 'form';
  readonly header: 'header';
  readonly pages: 'pages';
  readonly questions: 'questions';
  readonly results: 'results';
  readonly sections: 'sections';
};
const TheseProperties: TTheseProperties = {
  actions:   'actions' as const,
  branches:  'branches' as const,
  config:    'config' as const,
  flow:      'flow' as const,
  form:      'form' as const,
  header:    'header' as const,
  pages:     'pages' as const,
  questions: 'questions' as const,
  results:   'results' as const,
  sections:  'sections' as const,
};
const EQuestionnaireCoreProperties      = { ...ECommonCoreProperties, ...TheseProperties };
type TQuestionnaireCoreProperties = ClassProperties<typeof EQuestionnaireCoreProperties>;

export {
  EQuestionnaireCoreProperties,
  type TQuestionnaireCoreProperties,
};
