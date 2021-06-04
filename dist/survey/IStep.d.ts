import { PAGE_TYPE, QUESTION_TYPE, TStepType } from '../lib/enums';
import { TAnswerMap } from '../lib/types';
import { IRequirement } from './IRequirement';
export interface IPages {
    readonly landingPage: IPage;
    readonly noResultsPage: IPage;
    readonly resultsPage: IPage;
    readonly summaryPage: IPage;
}
export interface IPage extends IStep {
    body?: string;
    bodyHeader?: string;
    bodySubHeader?: string;
    type: PAGE_TYPE;
}
export interface IQuestion extends IStep {
    answer?: string;
    answers: TAnswerMap;
    type: QUESTION_TYPE;
}
export interface INavButton {
    label: string;
}
/**
 * Question/step data definition
 */
export interface IStep {
    buttons?: {
        next?: INavButton;
        prev?: INavButton;
    };
    footer?: string;
    id: string;
    info?: string;
    internalNotes?: string;
    requirements?: IRequirement[];
    sectionId: string;
    subTitle?: string;
    title: string;
    type: TStepType;
}
//# sourceMappingURL=IStep.d.ts.map