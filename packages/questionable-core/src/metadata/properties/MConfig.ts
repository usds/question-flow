import { ClassProperties }       from '../types/ClassProperties';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  dev: 'dev';
  events: 'events';
  getRuntimeConfig: 'getRuntimeConfig';
  mode: 'mode';
  nav: 'nav';
  pages: 'pages';
  params: 'params';
  progressBar: 'progressBar';
  questions: 'questions';
  steps: 'steps';
};
const TheseProperties: TTheseProperties = {
  dev:              'dev' as const,
  events:           'events' as const,
  getRuntimeConfig: 'getRuntimeConfig' as const,
  mode:             'mode' as const,
  nav:              'nav' as const,
  pages:            'pages' as const,
  params:           'params' as const,
  progressBar:      'progressBar' as const,
  questions:        'questions' as const,
  steps:            'steps' as const,
};
const EConfigCoreProperties             = { ...ECommonCoreProperties, ...TheseProperties };
type TConfigCoreProperties = ClassProperties<typeof EConfigCoreProperties>;

export {
  EConfigCoreProperties,
  type TConfigCoreProperties,
};
