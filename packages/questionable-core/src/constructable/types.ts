/* eslint-disable import/no-cycle */
import { ActionCore }                   from '../composable/ActionCore';
import { BranchCore }                   from '../composable/BranchCore';
import { FormCore }                     from '../composable/FormCore';
import { PageCore }                     from '../composable/PageCore';
import { QuestionCore }                 from '../composable/QuestionCore';
import { RefCore }                      from '../composable/RefCore';
import { ResultCore }                   from '../composable/ResultCore';
import { SectionCore }                  from '../composable/SectionCore';
import { StepCore }                     from '../composable/StepCore';
import { BRANCH_TYPE }                  from '../survey/IBranchCore';
import { PAGE_TYPE }                    from '../survey/IPageCore';
import { QUESTION_TYPE }                from '../survey/IQuestionCore';
import { RESULT_TYPE }                  from '../survey/IResultCore';
import { SECTION_TYPE }                 from '../survey/ISectionCore';
import { OP_TYPE, STEP_TYPE, TRefType } from '../survey/Unions';
import { isEnum }                       from '../util/enums';
import { matches }                      from '../util/helpers';

export type TQForm = {
  form: FormCore,
  question: QuestionCore
};

export type TSForm = {
  form: FormCore,
  step: StepCore
};

type TTypeable = { type: TRefType };
type TCollectable = TTypeable & { title: string };

// const isTypeable = <T extends TTypeable>(value: T): value is T => (!isEmpty(value.type));
const isQuestion = <T extends TTypeable>(value: T): value is T =>
  (value instanceof QuestionCore || isEnum(QUESTION_TYPE, value.type) === true);
const isPage     = <T extends TTypeable>(value: T): value is T =>
  (value instanceof PageCore || isEnum(PAGE_TYPE, value.type) === true);
const isStep     = <T extends TTypeable>(value: T): value is T =>
  (value instanceof StepCore || isEnum(STEP_TYPE, value.type) || isPage(value) || isQuestion(value));
const isAction   = <T extends TTypeable>(value: T): value is T =>
  (value instanceof ActionCore || isEnum(OP_TYPE, value.type) === true);
const isBranch   = <T extends TTypeable>(value: T): value is T =>
  (value instanceof BranchCore || isEnum(BRANCH_TYPE, value.type) === true);
const isSection  = <T extends TTypeable>(value: T): value is T =>
  (value instanceof SectionCore || isEnum(SECTION_TYPE, value.type) === true);
const isResult   = <T extends TTypeable>(value: T): value is T =>
  (value instanceof ResultCore || isEnum(RESULT_TYPE, value.type) === true);

// const tryParseQuestion = <Q extends QuestionCore>(value: TTypeable): Q | undefined => {
//   if (isQuestion(value)) {
//     return value as Q;
//   }
//   return undefined;
// };

// const tryParsePage = <Q extends PageCore>(value: TTypeable): Q | undefined => {
//   if (isPage(value)) {
//     return value as Q;
//   }
//   return undefined;
// };

type TReferentialble = RefCore & {
  actions?: TCollectable[];
  answers?: TCollectable[];
  branches?: TCollectable[];
  buttons?: TCollectable[];
  // [key in TPoolName]: TCollectable[];
  questions?: TCollectable[];
  requirements?: TCollectable[];
  responses?: TCollectable[];
  results?: TCollectable[];
  sections?: TCollectable[];
};
type TPoolName = 'questions' | 'branches' | 'sections' | 'results' | 'answers' | 'requirements' | 'actions';
const getNameOfPool = <T extends TCollectable>(item: T): TPoolName => {
  if (isQuestion(item)) {
    return 'questions';
  }
  if (isBranch(item)) {
    return 'branches';
  }
  if (isSection(item)) {
    return 'sections';
  }
  if (isResult(item)) {
    return 'results';
  }
  if (isAction(item)) {
    return 'actions';
  }
  throw new Error(`Collection for ${item} has not been implemented`);
};

const existsIn = <T extends TCollectable>(item: T, pool: TCollectable[]): boolean => {
  if (Array.isArray(pool) && pool.length > 0) {
    return pool.some((q) => q === item || matches(q.title, item.title));
  }
  return false;
};

const getPool = <T extends TCollectable>(item: T, obj: TReferentialble): TCollectable[] => {
  const poolName = getNameOfPool(item);
  if (!obj[poolName] || !Array.isArray(obj[poolName])) {
    throw new Error(`No pool has been implemented for ${poolName}`);
  }
  const pool = obj[poolName];
  if (!pool) {
    throw new Error(`No pool has been implemented for ${poolName}`);
  }
  return pool;
};

const existsInPool = <T extends TCollectable>(item: T, obj: TReferentialble) => {
  const pool = getPool(item, obj);
  return existsIn(item, pool);
};

const addToPool = <T extends TCollectable>(item: T, obj: TReferentialble) => {
  const pool   = getPool(item, obj);
  const exists = existsIn(item, pool);
  if (exists) {
    return obj;
  }
  pool.push(item);
  return obj;
};

export {
  addToPool,
  existsInPool,
  isAction,
  isPage,
  isQuestion,
  isStep,
  type TTypeable,
  type TCollectable,
};
