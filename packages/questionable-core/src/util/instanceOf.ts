import { isEmpty }         from 'lodash';
import { BaseCore }        from '../composable';
import { ClassProperties } from './types';

/**
 type TPrefix = {
  ACTION_TYPE,
  ANSWER,
  TBaseType,
  BRANCH,
  BUTTON,
  BUTTONS,
  CONFIG,
  DESIGN,
  DESIGN_DATA,
  EVENT,
  EVENT_EMITTER,
  FORM,
  PAGE,
  PAGES,
  PAGE_DATA,
  QUESTION,
  QUESTIONNAIRE,
  QUESTIONS,
  QUESTION_DATA,
  REF,
  REQUIREMENT,
  RESPONSE,
  RESULT,
  RESULTS,
  SECTION,
  STEP,
  STEPS,
  STEP_DATA,
  SURVEY,
  SURVEY_BUILDER,

 */
type TPrefix = {
  ACTION_TYPE: 'action',
  ANSWER: 'answer',
  BASE: 'base',
  BRANCH: 'branch',
  BUTTON: 'button',
  BUTTONS: 'buttons',
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
  SURVEY_BUILDER: 'survey-builder'
};

const CLASS_NAME: TPrefix = {
  ACTION_TYPE:    'action' as const,
  ANSWER:         'answer' as const,
  BASE:           'base' as const,
  BRANCH:         'branch' as const,
  BUTTON:         'button' as const,
  BUTTONS:        'buttons' as const,
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

interface IInstance {
  [key: string]: TInstanceOf;
}
interface IClassMap extends IInstance {
  [CLASS_NAME.ACTION_TYPE]: TInstanceOf;
  [CLASS_NAME.ANSWER]: TInstanceOf;
  [CLASS_NAME.BASE]: TInstanceOf;
  [CLASS_NAME.BRANCH]: TInstanceOf;
  [CLASS_NAME.BUTTON]: TInstanceOf;
  [CLASS_NAME.BUTTONS]: TInstanceOf;
  [CLASS_NAME.CONFIG]: TInstanceOf;
  [CLASS_NAME.DESIGN]: TInstanceOf;
  [CLASS_NAME.DESIGN_DATA]: TInstanceOf;
  [CLASS_NAME.EVENT]: TInstanceOf;
  [CLASS_NAME.EVENT_EMITTER]: TInstanceOf;
  [CLASS_NAME.FORM]: TInstanceOf;
  [CLASS_NAME.PAGE]: TInstanceOf;
  [CLASS_NAME.PAGES]: TInstanceOf;
  [CLASS_NAME.PAGE_DATA]: TInstanceOf;
  [CLASS_NAME.QUESTION]: TInstanceOf;
  [CLASS_NAME.QUESTIONNAIRE]: TInstanceOf;
  [CLASS_NAME.QUESTIONS]: TInstanceOf;
  [CLASS_NAME.QUESTION_DATA]: TInstanceOf;
  [CLASS_NAME.REF]: TInstanceOf;
  [CLASS_NAME.REQUIREMENT]: TInstanceOf;
  [CLASS_NAME.RESPONSE]: TInstanceOf;
  [CLASS_NAME.RESULT]: TInstanceOf;
  [CLASS_NAME.RESULTS]: TInstanceOf;
  [CLASS_NAME.SECTION]: TInstanceOf;
  [CLASS_NAME.STEP]: TInstanceOf;
  [CLASS_NAME.STEPS]: TInstanceOf;
  [CLASS_NAME.STEP_DATA]: TInstanceOf;
  [CLASS_NAME.SURVEY]: TInstanceOf;
  [CLASS_NAME.SURVEY_BUILDER]: TInstanceOf;
}

type TEPrefix = ClassProperties<typeof CLASS_NAME>;

const SUFFIX: {
  CORE: 'core',
  DEFAULT: 'default',
} = {
  CORE:    'core' as const,
  DEFAULT: 'default' as const,
};

type TESuffix = ClassProperties<typeof SUFFIX>;

const COI: {
  CLASS: '',
  INTERFACE: 'I',
} = {
  CLASS:     '' as const,
  INTERFACE: 'I' as const,
};

type TECoi = ClassProperties<typeof COI>;

 type TInstanceOf =
  `${TECoi}${TEPrefix}-${TESuffix}`
  | `${TECoi}${TEPrefix}s-${TESuffix}`
  | `${TECoi}${TEPrefix}s`
  | `${TECoi}${TEPrefix}`;

 function makeName(name: TEPrefix, suffix: TESuffix | '', coi: TECoi): TInstanceOf;
function makeName(
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

function getClassName(name: TEPrefix, suffix: TESuffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.CLASS);
}

function getInterfaceName(name: TEPrefix, suffix: TESuffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.INTERFACE);
}

function extractNames(name: TInstanceOf): TInstanceOf[] {
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
  if (names.some((n) => n.startsWith(CLASS_NAME.REF))) {
    names.push('base-core');
  }
  return names;
}

function getClassesAndInterfaces(names: TInstanceOf[]): TInstanceOf[] {
  const ret = names.concat(names.reduce((_p, currentValue, _i, out) =>
    out.concat(extractNames(currentValue)), names));
  return [...new Set([...ret])];
}

function checkInstanceOf(names: TInstanceOf[], obj: BaseCore) {
  const checking = getClassesAndInterfaces(names);
  return checking.some((i) => `${i}` === `${obj?.instanceOfCheck}`);
}

type instanceMap = Map<TEPrefix, TInstanceOf>;

const assembleClassNames = () => {
  const ret: instanceMap = new Map<TEPrefix, TInstanceOf>();

  for (const name of Object.values(CLASS_NAME)) {
    ret.set(name, getClassName(name));
  }
  return ret;
};

const ClassMap = assembleClassNames();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const getInstanceName = <T extends TEPrefix>(name: T): TInstanceOf => ClassMap.get(name)!;

const classes: IInstance = {};
Object.values(CLASS_NAME).forEach((key) => {
  classes[key] = getInstanceName(key);
});

const ClassList = { ...classes } as IClassMap;

export {
  assembleClassNames,
  checkInstanceOf,
  ClassMap,
  ClassList,
  COI,
  extractNames,
  getClassesAndInterfaces,
  getClassName,
  getInstanceName,
  getInterfaceName,
  makeName,
  CLASS_NAME as PREFIX,
  CLASS_NAME,
  SUFFIX,
  type instanceMap,
  type TECoi,
  type TEPrefix,
  type TESuffix,
  type TInstanceOf,
  type TPrefix,
};
