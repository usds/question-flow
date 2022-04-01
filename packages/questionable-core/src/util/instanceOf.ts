import { isEmpty } from 'lodash';

/* eslint-disable @typescript-eslint/no-explicit-any */
enum PREFIX {
  ACTION = 'action',
  ANSWER = 'answer',
  BASE = 'base',
  BRANCH = 'branch',
  BUTTON = 'button',
  BUTTONS = 'buttons',
  COMPOSABLE = 'composable',
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

enum SUFFIX {
  CORE = 'core',
  DEFAULT = 'core',
  NONE = '',
}

enum COI {
  CLASS = '',
  INTERFACE = 'I',
}

export type TInstanceOf =
  `${COI}${PREFIX}-${SUFFIX}`
  | `${COI}${PREFIX}s-${SUFFIX}`
  | `${COI}${PREFIX}s`
  | `${COI}${PREFIX}`;

function makeName(name: PREFIX, suffix: SUFFIX, coi: COI): TInstanceOf;
function makeName(name: PREFIX, suffix = SUFFIX.CORE, coi: boolean | COI = false): TInstanceOf {
  const isInterface    = coi === true || coi === COI.INTERFACE;
  let ret: TInstanceOf = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}`;
  if (suffix !== SUFFIX.NONE) {
    ret = `${isInterface ? COI.INTERFACE : COI.CLASS}${name}-${suffix}`;
  }
  return ret;
}

function getClassName(name: PREFIX, suffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.CLASS);
}

function getInterfaceName(name: PREFIX, suffix = SUFFIX.CORE): TInstanceOf {
  return makeName(name, suffix, COI.INTERFACE);
}

function extractNames(name: TInstanceOf): TInstanceOf[] {
  const names: TInstanceOf[] = [name];
  let parts: string[];
  let coi                    = COI.CLASS;
  if (name.startsWith(COI.INTERFACE)) {
    coi   = COI.INTERFACE;
    parts = name.replace('I', '').split('-');
  } else {
    parts = name.split('-');
  }
  const prefix = parts[0] as PREFIX;
  const suffix = (isEmpty(parts[1]) ? SUFFIX.NONE : parts[1] as SUFFIX);
  names.push(makeName(prefix, SUFFIX.NONE, coi));
  if (suffix !== SUFFIX.NONE) {
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

function getClassesAndInterfaces(names: TInstanceOf[]): TInstanceOf[] {
  const ret = names.concat(names.reduce((_p, currentValue, _i, out) =>
    out.concat(extractNames(currentValue)), names));
  return [...new Set([...ret])];
}

function checkInstanceOf(names: TInstanceOf[], obj: any) {
  const checking = getClassesAndInterfaces(names);
  return checking.some((i) => `${i}` === `${obj?.instanceOfCheck}`);
}

export {
  COI,
  PREFIX,
  SUFFIX,
  makeName,
  getClassName,
  getInterfaceName,
  checkInstanceOf,
};
