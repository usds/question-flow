import { ACTION_TYPE } from '../lib/enums';
import { IAnswer } from '../survey/IAnswer';
/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
export declare const stepReducer: (previousState: IAnswer, action: {
    type: ACTION_TYPE;
    value: any;
}) => IAnswer;
//# sourceMappingURL=stepReducer.d.ts.map