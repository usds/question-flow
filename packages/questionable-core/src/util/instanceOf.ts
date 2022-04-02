import { isEmpty }         from 'lodash';
import { ClassProperties } from './types';

type TPrefix = {
  ACTION: 'action',
  ANSWER: 'answer',
  BASE: 'base',
  BRANCH: 'branch',
  BUTTON: 'button',
  BUTTONS: 'buttons',
  COMPOSABLE: 'composable',
  CONFIG: 'config',
  DESIGN: 'design',
  DESIGN_DATA: 'design-data',
  EVENT: 'event',
  EVENT_EMITTER: 'event-emitter',
  FORM: 'form',
  PAGE: 'page',
  PAGES: 'pages',
  PAGE_DATA: 'page-data',
  QUESTION: 'question',
  QUESTIONNAIRE: 'questionnaire',
  QUESTIONS: 'questions',
  QUESTION_DATA: 'question-data',
  REF: 'ref',
  REQUIREMENT: 'requirement',
  RESPONSE: 'response',
  RESULT: 'result',
  RESULTS: 'results',
  SECTION: 'section',
  STEP: 'step',
  STEPS: 'steps',
  STEP_DATA: 'step-data',
  SURVEY: 'survey',
  SURVEY_BUILDER: 'survey-builder',
};
type test = ClassProperties<TPrefix>;
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PREFIX: TPrefix = {
  ACTION:         'action' as const,
  ANSWER:         'answer' as const,
  BASE:           'base' as const,
  BRANCH:         'branch' as const,
  BUTTON:         'button' as const,
  BUTTONS:        'buttons' as const,
  COMPOSABLE:     'composable' as const,
  CONFIG:         'config' as const,
  DESIGN:         'design' as const,
  DESIGN_DATA:    'design-data' as const,
  EVENT:          'event' as const,
  EVENT_EMITTER:  'event-emitter' as const,
  FORM:           'form' as const,
  PAGE:           'page' as const,
  PAGES:          'pages' as const,
  PAGE_DATA:      'page-data' as const,
  QUESTION:       'question' as const,
  QUESTIONNAIRE:  'questionnaire' as const,
  QUESTIONS:      'questions' as const,
  QUESTION_DATA:  'question-data' as const,
  REF:            'ref' as const,
  REQUIREMENT:    'requirement' as const,
  RESPONSE:       'response' as const,
  RESULT:         'result' as const,
  RESULTS:        'results' as const,
  SECTION:        'section' as const,
  STEP:           'step' as const,
  STEPS:          'steps' as const,
  STEP_DATA:      'step-data' as const,
  SURVEY:         'survey' as const,
  SURVEY_BUILDER: 'survey-builder' as const,
};

type TEPrefix = ClassProperties<typeof PREFIX>;

export const SUFFIX: {
  CORE: 'core',
  DEFAULT: 'default',
} = {
  CORE:    'core' as const,
  DEFAULT: 'default' as const,
};

type TESuffix = ClassProperties<typeof SUFFIX>;

export const COI: {
  CLASS: '',
  INTERFACE: 'I',
} = {
  CLASS:     '' as const,
  INTERFACE: 'I' as const,
};

type TECoi = ClassProperties<typeof COI>;

export type TInstanceOf =
  `${TECoi}${TEPrefix}-${TESuffix}`
  | `${TECoi}${TEPrefix}s-${TESuffix}`
  | `${TECoi}${TEPrefix}s`
  | `${TECoi}${TEPrefix}`;

export function makeName(name: TEPrefix, suffix: TESuffix | '', coi: TECoi): TInstanceOf;
export function makeName(
  name: TEPrefix,
  suffix: TESuffix | '' = SUFFIX.CORE,
  coi: boolean | TECoi = false,
): TInstanceOf {
  const isInterface    = coi === true || coi === COI.INTERFACE;
  let ret: TInstanceOf = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}`;
  if (suffix !== '') {
    ret = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}-${suffix}`;
  }
  return ret;
}

export function getClassName(name: TEPrefix, suffix: TESuffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.CLASS);
}

export function getInterfaceName(name: TEPrefix, suffix: TESuffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.INTERFACE);
}

export function extractNames(name: TInstanceOf): TInstanceOf[] {
  const names: TInstanceOf[] = [name];
  let parts: string[];
  let coi: TECoi             = COI.CLASS;
  if (name.startsWith(COI.INTERFACE)) {
    coi   = COI.INTERFACE;
    parts = name.replace('I', '').split('-');
  } else {
    parts = name.split('-');
  }
  const prefix: TEPrefix      = parts[0] as TEPrefix;
  const suffix: TESuffix | '' = (isEmpty(parts[1]) ? '' : parts[1] as TESuffix);
  names.push(makeName(prefix, '', coi));
  if (suffix !== '') {
    names.push(makeName(prefix, suffix, coi));
  } else {
    names.push(makeName(prefix, SUFFIX.CORE, coi));
  }
  if (names.some((n) => n === 'composable-core')) {
    names.push('base-core');
  }
  if (names.some((n) => n === 'base-core')) {
    names.push('ref-core');
    names.push('Iref-core');
  }
  return names;
}

export function getClassesAndInterfaces(names: TInstanceOf[]): TInstanceOf[] {
  const ret = names.concat(names.reduce((_p, currentValue, _i, out) =>
    out.concat(extractNames(currentValue)), names));
  return [...new Set([...ret])];
}

export function checkInstanceOf(names: TInstanceOf[], obj: any) {
  const checking = getClassesAndInterfaces(names);
  return checking.some((i) => `${i}` === `${obj?.instanceOfCheck}`);
}

type instanceMap = Map<TEPrefix, TInstanceOf>;

export const assembleClassNames = () => {
  const ret: instanceMap = new Map<TEPrefix, TInstanceOf>();

  for (const name of Object.values(PREFIX)) {
    ret.set(name, getClassName(name));
  }
  return ret;
};

export const ClassMap = assembleClassNames();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const getInstanceName = <T extends TEPrefix>(name: T): TInstanceOf => ClassMap.get(name)!;
