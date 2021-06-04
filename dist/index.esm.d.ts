/// <reference types="react" />
import { ReactNode } from "react";
import { IWizard } from "use-wizard/lib/cjs/useWizard/types/IWizard";
import { TStep } from "use-wizard/lib/cjs/useWizard/types/TStep";
/**
 * Defines the known component types for questions
 */
declare enum QUESTION_TYPE {
    DOB = "dob",
    MULTIPLE_CHOICE = "multiple_choice",
    MULTIPLE_SELECT = "multiple_select"
}
/**
 * Defines the known component types for pages
 */
declare enum PAGE_TYPE {
    LANDING = "Landing",
    NO_RESULTS = "No Results",
    RESULTS = "Results",
    SUMMARY = "Summary"
}
type TStepType = PAGE_TYPE | QUESTION_TYPE;
/**
 * Navigation direction for steps by array index (+1 or -1)
 */
declare enum DIRECTION {
    FORWARD = 1,
    BACKWARD = -1
}
/**
 * Progress Bar status
 */
declare enum PROGRESS_BAR_STATUS {
    COMPLETE = "complete",
    CURRENT = "current"
}
declare enum ACTION {
    CALL = "call",
    HYBRID = "hybrid",
    ONLINE = "online"
}
declare enum MODE {
    EDIT = "edit",
    VIEW = "view"
}
interface IAction {
    action: string;
    description: string;
    name: string;
    title: string;
    type: ACTION;
}
/*
* Defines an age relative to a date
*/
type TAge = {
    days?: number;
    months: number;
    years: number;
};
/**
 * Lambda that can be called to compute an age requirement
 */
type TAgeCalc = (birthdate: string) => boolean;
/**
 * List of possible answers to the question.
 * Maps answer as string value to index number of question
 */
type TAnswerMap = {
    [key: number]: string;
};
/**
 * Expresses a collection of answer requirements.
 * Unique keys are joined together by `AND`.
 * Keys represent a collection of allowed answer values joined by `OR`.
 */
type TAnswers = {
    [key: string]: number[];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TReducer = (...params: any) => void;
/**
 * Defines an individual requirement for accessing a step
 */
interface IRequirement {
    ageCalc?: TAgeCalc;
    answers: TAnswers;
    explanation?: string;
    maxAge?: TAge;
    minAge?: TAge;
}
interface IPages {
    readonly landingPage: IPage;
    readonly noResultsPage: IPage;
    readonly resultsPage: IPage;
    readonly summaryPage: IPage;
}
interface IPage extends IStep {
    body?: string;
    bodyHeader?: string;
    bodySubHeader?: string;
    type: PAGE_TYPE;
}
interface IQuestion extends IStep {
    answer?: string;
    answers: TAnswerMap;
    type: QUESTION_TYPE;
}
interface INavButton {
    label: string;
}
/**
 * Question/step data definition
 */
interface IStep {
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
interface IAnswerList {
    [key: string]: IQuestion;
}
interface IAnswer {
    age?: TAge;
    answers: IAnswerList;
    birthdate?: string;
    finished?: Date;
    readonly started: Date;
}
interface IResult {
    id: string;
    label: string;
    match?: IRequirement;
    name: string;
    requirements: IRequirement[];
}
/**
 * Defines a survey section
 */
interface ISection {
    id: string;
    lastStep?: number;
    name: string;
    requirements: IRequirement[];
    status?: PROGRESS_BAR_STATUS;
}
/**
 * Data defintion for base wizard step
 */
interface IStepData {
    children?: ReactNode;
    dispatchForm: TReducer;
    form: IAnswer;
    step?: IStep;
    stepId: TStep;
    wizard: IWizard;
}
/**
 * Definition for survey data input
 */
interface IQuestionnaire {
    readonly actions: IAction[];
    readonly header: string;
    readonly pages: IPages;
    readonly questions: IQuestion[];
    readonly results: IResult[];
    readonly sections: ISection[];
}
/**
 * Utility wrapper for survey state
 */
declare class Questionnaire implements IQuestionnaire {
    readonly questions: IQuestion[];
    readonly header: string;
    readonly results: IResult[];
    readonly flow: string[];
    readonly sections: ISection[];
    readonly actions: IAction[];
    readonly pages: IPages;
    private readonly steps;
    constructor(data: IQuestionnaire);
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    getStepById(id: string): IStep;
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    getPageById(id: string): IPage;
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    getQuestionById(id: string): IQuestion;
    /**
     * Returns the next step in the sequence which is permitted by the current state of the form
     */
    getStep(thisStep: string, form: IAnswer, direction: DIRECTION): string;
    getNextStep(props: IStepData): string;
    getPreviousStep(props: IStepData): string;
    /**
     * Gets all of the currently available sections
     * @param props
     * @returns
     */
    getSections(props: IStepData): ISection[];
    /**
     * Get all the results compatible with the current answers of the form
     * @param form
     * @returns
     */
    getResults(form: IAnswer): IResult[];
    /**
     * Get a randomized action
     * @returns
     */
    getAction(): IAction;
    /**
     * Performs constructor validation on the survery inputs.
     * Sets step defaults for landing, summary and result if none are defined.
     */
    private init;
    private meetsAllRequirements;
    /**
     * Validates minimum age requirements
     * @param form The current state of the form
     * @param minAge a TAge object or undefined
     * @returns true if no min age, else true if age is >= min age
     */
    private static meetsMinAgeRequirements;
    /**
     * Validates maximum age requirements
     * @param form The current state of the form
     * @param maxAge a TAge object or undefined
     * @returns true if no max age, else true if age is <= max age
     */
    private static meetsMaxAgeRequirements;
    /**
     * Executes an arbitrary function to determine age eligibility
     * @param form The current state of the form
     * @param ageCalc A callback function that operates on an age
     * @returns
     */
    private static meetsAgeCalcRequirements;
    /**
     * Determines if current answers in the form meet the step's requirements
     * @param answers Collection of required answer matches
     * @returns true if all answers are valid or if no answers are required
     */
    private meetsAnswerRequirements;
}
interface IQuestionableConfig {
    dev: boolean;
    mode: MODE;
    showSteps: boolean;
}
declare class QuestionableConfig implements IQuestionableConfig {
    dev: boolean;
    mode: MODE;
    showSteps: boolean;
    constructor(config?: Partial<IQuestionableConfig>);
}
interface IQuestionable {
    config?: QuestionableConfig;
    questionnaire?: Questionnaire;
}
declare const Questionable: (q: IQuestionable) => JSX.Element;
export { Questionable };
//# sourceMappingURL=index.esm.d.ts.map