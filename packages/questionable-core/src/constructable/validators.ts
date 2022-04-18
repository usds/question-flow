import { isEnum }        from '../lib/enums';
import { TTypeable }     from '../metadata/types/TTypeable';
import { ClassList }     from '../lib/instanceOf';
import { BRANCH_TYPE }   from '../metadata/properties/type/TBranchType';
import { ACTION_TYPE }   from '../metadata/properties/type/TActionType';
import { PAGE_TYPE }     from '../metadata/properties/type/TPageType';
import { QUESTION_TYPE } from '../metadata/properties/type/TQuestionType';
import { RESULT_TYPE }   from '../metadata/properties/type/TResultType';
import { SECTION_TYPE }  from '../metadata/properties/type/TSectionType';
import { STEP_TYPE }     from '../metadata/properties/type/TStepType';

export function isAction<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.action || isEnum(ACTION_TYPE, value.type) === true);
}

export function isBranch<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.branch || isEnum(BRANCH_TYPE, value.type) === true);
}

export function isPage<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.page || isEnum(PAGE_TYPE, value.type) === true);
}

export function isQuestion<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.question || isEnum(QUESTION_TYPE, value.type) === true);
}

export function isResult<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.result || isEnum(RESULT_TYPE, value.type) === true);
}

export function isSection<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.section || isEnum(SECTION_TYPE, value.type) === true);
}

export function isStep<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.step
    || isEnum(STEP_TYPE, value.type) || isPage(value) || isQuestion(value));
}
