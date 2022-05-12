import { isEnum }        from '../../lib/enums';
import { TTypeable }     from '../../metadata/types/TTypeable';
import { ClassList }     from '../../lib/instanceOf';
import { BRANCH_TYPE }   from '../../metadata/properties/type/TBranchType';
import { ACTION_TYPE }   from '../../metadata/properties/type/TActionType';
import { PAGE_TYPE }     from '../../metadata/properties/type/TPageType';
import { QUESTION_TYPE } from '../../metadata/properties/type/TQuestionType';
import { RESULT_TYPE }   from '../../metadata/properties/type/TResultType';
import { SECTION_TYPE }  from '../../metadata/properties/type/TSectionType';
import { STEP_TYPE }     from '../../metadata/properties/type/TStepType';

export function isAction<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.action || isEnum({ enm: ACTION_TYPE, value: value.type }) === true);
}

export function isBranch<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.branch || isEnum({ enm: BRANCH_TYPE, value: value.type }) === true);
}

export function isPage<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.page || isEnum({ enm: PAGE_TYPE, value: value.type }) === true);
}

export function isQuestion<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.question || isEnum({ enm: QUESTION_TYPE, value: value.type }) === true);
}

export function isResult<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.result || isEnum({ enm: RESULT_TYPE, value: value.type }) === true);
}

export function isSection<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.section || isEnum({ enm: SECTION_TYPE, value: value.type }) === true);
}

export function isStep<T extends TTypeable>(value: T): value is T {
  return (value.instanceOfCheck === ClassList.step
    || isEnum({ enm: STEP_TYPE, value: value.type }) || isPage(value) || isQuestion(value));
}
