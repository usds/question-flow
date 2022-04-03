import { ClassProperties }       from '../util/types';
import { ECommonCoreProperties } from './MCommon';

type TTheseProperties = {
  _dev: '_dev';
  _events: '_events';
  _getRuntimeConfig: '_getRuntimeConfig';
  _mode: '_mode';
  _nav: '_nav';
  _pages: '_pages';
  _params: '_params';
  _progressBar: '_progressBar';
  _questions: '_questions';
  _steps: '_steps';
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
  _dev:              '_dev' as const,
  _events:           '_events' as const,
  _getRuntimeConfig: '_getRuntimeConfig' as const,
  _mode:             '_mode' as const,
  _nav:              '_nav' as const,
  _pages:            '_pages' as const,
  _params:           '_params' as const,
  _progressBar:      '_progressBar' as const,
  _questions:        '_questions' as const,
  _steps:            '_steps' as const,
  dev:               'dev' as const,
  events:            'events' as const,
  getRuntimeConfig:  'getRuntimeConfig' as const,
  mode:              'mode' as const,
  nav:               'nav' as const,
  pages:             'pages' as const,
  params:            'params' as const,
  progressBar:       'progressBar' as const,
  questions:         'questions' as const,
  steps:             'steps' as const,
};
const EConfigCoreProperties             = { ...ECommonCoreProperties, ...TheseProperties };
type TConfigCoreProperties = ClassProperties<typeof EConfigCoreProperties>;

export {
  EConfigCoreProperties,
  type TConfigCoreProperties,
};
