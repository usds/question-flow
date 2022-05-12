import { ACTION_TYPE, TActionType }           from './TActionType';
import { ANSWER_TYPE, TAnswerType }           from './TAnswerType';
import { BRANCH_TYPE, TBranchType }           from './TBranchType';
import { BUTTON_TYPE, TButtonType }           from './TButtonType';
import { REQUIREMENT_TYPE, TRequirementType } from './TRequirementType';
import { RESPONSE_TYPE, TResponseType }       from './TResponseType';
import { RESULT_TYPE, TResultType }           from './TResultType';
import { SECTION_TYPE, TSectionType }         from './TSectionType';
import { STEP_TYPE, TStepType }               from './TStepType';

export type TRefType = TStepType |
  TActionType |
  TAnswerType |
  TBranchType |
  TButtonType |
  TRequirementType |
  TResponseType |
  TResultType |
  TSectionType;
export const REF_TYPE = {
  ...STEP_TYPE,
  ...ACTION_TYPE,
  ...ANSWER_TYPE,
  ...BRANCH_TYPE,
  ...BUTTON_TYPE,
  ...RESULT_TYPE,
  ...REQUIREMENT_TYPE,
  ...RESPONSE_TYPE,
  ...SECTION_TYPE,
};
