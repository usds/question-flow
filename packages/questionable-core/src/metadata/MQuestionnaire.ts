import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
 readonly _actions: '_actions';
 readonly _branches: '_branches';
 readonly _config: '_config';
 readonly _flow: '_flow';
 readonly _form: '_form';
 readonly _header: '_header';
 readonly _pages: '_pages';
 readonly _questions: '_questions';
 readonly _results: '_results';
 readonly _sections: '_sections';
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
  _actions:   '_actions' as const,
  _branches:  '_branches' as const,
  _config:    '_config' as const,
  _flow:      '_flow' as const,
  _form:      '_form' as const,
  _header:    '_header' as const,
  _pages:     '_pages' as const,
  _questions: '_questions' as const,
  _results:   '_results' as const,
  _sections:  '_sections' as const,
  actions:    'actions' as const,
  branches:   'branches' as const,
  config:     'config' as const,
  flow:       'flow' as const,
  form:       'form' as const,
  header:     'header' as const,
  pages:      'pages' as const,
  questions:  'questions' as const,
  results:    'results' as const,
  sections:   'sections' as const,
};
const EQuestionnaireCoreProperties      = { ...ECommonCoreProperties, ...TheseProperties };
type TQuestionnaireCoreProperties = ClassProperties<typeof EQuestionnaireCoreProperties>;

export {
  EQuestionnaireCoreProperties,
  type TQuestionnaireCoreProperties,
};
