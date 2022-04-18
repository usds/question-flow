import { isEmpty }         from 'lodash';
import { BaseCore }        from '../composable/BaseCore';
import { ClassProperties } from '../metadata/types/ClassProperties';

enum EClassList {
  ACTION = 'action',
  ANSWER = 'answer',
  BASE = 'base',
  BRANCH = 'branch',
  BUTTON = 'button',
  BUTTONS = 'buttons',
  CONFIG = 'config',
  DESIGN = 'design',
  DESIGN_DATA = 'design-data',
  EVENT = 'event',
  EVENT_EMITTER = 'event-emitter',
  FORM = 'form',
  PAGE = 'page',
  PAGES = 'pages',
  PAGE_DATA = 'page-data',
  QUESTION = 'question',
  QUESTIONNAIRE = 'questionnaire',
  QUESTIONS = 'questions',
  QUESTION_DATA = 'question-data',
  REF = 'ref',
  REQUIREMENT = 'requirement',
  RESPONSE = 'response',
  RESULT = 'result',
  RESULTS = 'results',
  SECTION = 'section',
  STEP = 'step',
  STEPS = 'steps',
  STEP_DATA = 'step-data',
  SURVEY = 'survey',
  SURVEY_BUILDER = 'survey-builder'
}

type TPrefix = {
  ACTION: EClassList.ACTION,
  ANSWER: EClassList.ANSWER,
  BASE: EClassList.BASE,
  BRANCH: EClassList.BRANCH,
  BUTTON: EClassList.BUTTON,
  BUTTONS: EClassList.BUTTONS,
  CONFIG: EClassList.CONFIG,
  DESIGN: EClassList.DESIGN,
  DESIGN_DATA: EClassList.DESIGN_DATA,
  EVENT: EClassList.EVENT,
  EVENT_EMITTER: EClassList.EVENT_EMITTER,
  FORM: EClassList.FORM,
  PAGE: EClassList.PAGE,
  PAGES: EClassList.PAGES,
  PAGE_DATA: EClassList.PAGE_DATA,
  QUESTION: EClassList.QUESTION,
  QUESTIONNAIRE: EClassList.QUESTIONNAIRE,
  QUESTIONS: EClassList.QUESTIONS,
  QUESTION_DATA: EClassList.QUESTION_DATA,
  REF: EClassList.REF,
  REQUIREMENT: EClassList.REQUIREMENT,
  RESPONSE: EClassList.RESPONSE,
  RESULT: EClassList.RESULT,
  RESULTS: EClassList.RESULTS,
  SECTION: EClassList.SECTION,
  STEP: EClassList.STEP,
  STEPS: EClassList.STEPS,
  STEP_DATA: EClassList.STEP_DATA,
  SURVEY: EClassList.SURVEY,
  SURVEY_BUILDER: EClassList.SURVEY_BUILDER,
};

const CLASS_NAME: TPrefix = {
  ACTION:         EClassList.ACTION,
  ANSWER:         EClassList.ANSWER,
  BASE:           EClassList.BASE,
  BRANCH:         EClassList.BRANCH,
  BUTTON:         EClassList.BUTTON,
  BUTTONS:        EClassList.BUTTONS,
  CONFIG:         EClassList.CONFIG,
  DESIGN:         EClassList.DESIGN,
  DESIGN_DATA:    EClassList.DESIGN_DATA,
  EVENT:          EClassList.EVENT,
  EVENT_EMITTER:  EClassList.EVENT_EMITTER,
  FORM:           EClassList.FORM,
  PAGE:           EClassList.PAGE,
  PAGES:          EClassList.PAGES,
  PAGE_DATA:      EClassList.PAGE_DATA,
  QUESTION:       EClassList.QUESTION,
  QUESTIONNAIRE:  EClassList.QUESTIONNAIRE,
  QUESTIONS:      EClassList.QUESTIONS,
  QUESTION_DATA:  EClassList.QUESTION_DATA,
  REF:            EClassList.REF,
  REQUIREMENT:    EClassList.REQUIREMENT,
  RESPONSE:       EClassList.RESPONSE,
  RESULT:         EClassList.RESULT,
  RESULTS:        EClassList.RESULTS,
  SECTION:        EClassList.SECTION,
  STEP:           EClassList.STEP,
  STEPS:          EClassList.STEPS,
  STEP_DATA:      EClassList.STEP_DATA,
  SURVEY:         EClassList.SURVEY,
  SURVEY_BUILDER: EClassList.SURVEY_BUILDER,
};

interface IClassMap {
  [CLASS_NAME.ACTION]: TInstanceOf;
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

function makeName({ name, suffix, coi }:
  { coi: TECoi; name: TEPrefix; suffix?: TESuffix | ''; }): TInstanceOf;
function makeName(
  { name, suffix = SUFFIX.CORE, coi = false }: { coi?: boolean | TECoi; name: TEPrefix; suffix?: TESuffix | ''; },
): TInstanceOf {
  const isInterface    = coi === true || coi === COI.INTERFACE;
  let ret: TInstanceOf = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}`;
  if (suffix !== '') {
    ret = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}-${suffix}`;
  }
  return ret;
}

function getClassName({ name, suffix = SUFFIX.CORE }: { name: TEPrefix; suffix?: TESuffix; }): TInstanceOf {
  return makeName({ coi: COI.CLASS, name, suffix });
}

function getInterfaceName({ name, suffix = SUFFIX.CORE }: { name: TEPrefix; suffix?: TESuffix; }): TInstanceOf {
  return makeName({ coi: COI.INTERFACE, name, suffix });
}

function extractNames({ name }: { name: TInstanceOf; }): TInstanceOf[] {
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
  names.push(makeName({ coi, name: prefix, suffix: '' }));
  if (suffix !== '') {
    names.push(makeName({ coi, name: prefix, suffix }));
  } else {
    names.push(makeName({ coi, name: prefix, suffix: SUFFIX.CORE }));
  }
  if (names.some((n) => n.startsWith(CLASS_NAME.REF))) {
    names.push('base-core');
  }
  return names;
}

function getClassesAndInterfaces({ names }: { names: TInstanceOf[]; }): TInstanceOf[] {
  const ret = names.concat(names.reduce((_p, currentValue, _i, out) =>
    out.concat(extractNames({ name: currentValue })), names));
  return [...new Set([...ret])];
}

function checkInstanceOf({ names, obj }: { names: TInstanceOf[]; obj: BaseCore; }) {
  const checking = getClassesAndInterfaces({ names });
  return checking.some((i) => `${i}` === `${obj?.instanceOfCheck}`);
}

type instanceMap = Map<TEPrefix, TInstanceOf>;

function assembleClassNames() {
  const ret: instanceMap = new Map<TEPrefix, TInstanceOf>();

  for (const name of Object.values(CLASS_NAME)) {
    ret.set(name, getClassName({ name }));
  }
  return ret;
}

const ClassMap = assembleClassNames();

function getInstanceName<T extends TEPrefix>({ name }: { name: T; }): TInstanceOf {
  return ClassMap.get(name)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
}

const classes = {} as IClassMap;
Object.values(CLASS_NAME).forEach((key) => {
  classes[key] = getInstanceName({ name: key });
});

const ClassList = { ...classes } as IClassMap;

export {
  assembleClassNames,
  checkInstanceOf,
  ClassMap,
  ClassList,
  EClassList,
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
