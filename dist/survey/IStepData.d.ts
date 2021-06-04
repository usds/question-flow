import { ReactNode } from 'react';
import { IWizard } from 'use-wizard/lib/cjs/useWizard/types/IWizard';
import { TStep } from 'use-wizard/lib/cjs/useWizard/types/TStep';
import { TReducer } from '../lib/types';
import { IAnswer } from './IAnswer';
import { IPage, IQuestion, IStep } from './IStep';
/**
 * Data defintion for question step
 */
export interface IQuestionData extends IStepData {
    step: IQuestion;
}
/**
 * Data defintion for page step
 */
export interface IPageData extends IStepData {
    step: IPage;
}
/**
 * Data defintion for base wizard step
 */
export interface IStepData {
    children?: ReactNode;
    dispatchForm: TReducer;
    form: IAnswer;
    step?: IStep;
    stepId: TStep;
    wizard: IWizard;
}
//# sourceMappingURL=IStepData.d.ts.map