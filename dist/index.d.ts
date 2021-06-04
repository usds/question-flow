/// <reference types="react" />
declare module "lib/enums" {
    /**
     * Defines the known component types for questions
     */
    export enum QUESTION_TYPE {
        DOB = "dob",
        MULTIPLE_CHOICE = "multiple_choice",
        MULTIPLE_SELECT = "multiple_select"
    }
    /**
     * Defines the known component types for pages
     */
    export enum PAGE_TYPE {
        LANDING = "Landing",
        NO_RESULTS = "No Results",
        RESULTS = "Results",
        SUMMARY = "Summary"
    }
    /**
     * Defines the type of step for UI rendering
     */
    export const STEP_TYPE: {
        DOB: QUESTION_TYPE.DOB;
        MULTIPLE_CHOICE: QUESTION_TYPE.MULTIPLE_CHOICE;
        MULTIPLE_SELECT: QUESTION_TYPE.MULTIPLE_SELECT;
        LANDING: PAGE_TYPE.LANDING;
        NO_RESULTS: PAGE_TYPE.NO_RESULTS;
        RESULTS: PAGE_TYPE.RESULTS;
        SUMMARY: PAGE_TYPE.SUMMARY;
    };
    export type TStepType = PAGE_TYPE | QUESTION_TYPE;
    /**
     * Navigation direction for steps by array index (+1 or -1)
     */
    export enum DIRECTION {
        FORWARD = 1,
        BACKWARD = -1
    }
    /**
     * Progress Bar status
     */
    export enum PROGRESS_BAR_STATUS {
        COMPLETE = "complete",
        CURRENT = "current"
    }
    export enum ACTION {
        CALL = "call",
        HYBRID = "hybrid",
        ONLINE = "online"
    }
    export enum ACTION_TYPE {
        RESET = "RESET",
        UPDATE = "UPDATE"
    }
    export enum DATE_UNIT {
        DAY = "day",
        MONTH = "month",
        YEAR = "year"
    }
    export enum MODE {
        EDIT = "edit",
        VIEW = "view"
    }
    export const isEnum: (enm: object, value: string) => boolean;
}
declare module "lib/types" {
    export type TAge = {
        days?: number;
        months: number;
        years: number;
    };
    /**
     * Lambda that can be called to compute an age requirement
     */
    export type TAgeCalc = (birthdate: string) => boolean;
    /**
     * List of possible answers to the question.
     * Maps answer as string value to index number of question
     */
    export type TAnswerMap = {
        [key: number]: string;
    };
    /**
     * Expresses a collection of answer requirements.
     * Unique keys are joined together by `AND`.
     * Keys represent a collection of allowed answer values joined by `OR`.
     */
    export type TAnswers = {
        [key: string]: number[];
    };
    /**
     * Map sections to their last step by index
     */
    export type TSectionMap = {
        [key: string]: number;
    };
    export type TReducer = (...params: any) => void;
    export type TDateOfBirth = {
        day?: string | undefined;
        month?: string | undefined;
        year?: string | undefined;
    };
}
declare module "survey/IRequirement" {
    import { TAge, TAgeCalc, TAnswers } from "lib/types";
    /**
     * Defines an individual requirement for accessing a step
     */
    export interface IRequirement {
        ageCalc?: TAgeCalc;
        answers: TAnswers;
        explanation?: string;
        maxAge?: TAge;
        minAge?: TAge;
    }
}
declare module "survey/IStep" {
    import { PAGE_TYPE, QUESTION_TYPE, TStepType } from "lib/enums";
    import { TAnswerMap } from "lib/types";
    import { IRequirement } from "survey/IRequirement";
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
}
declare module "survey/IAnswer" {
    import { TAge } from "lib/types";
    import { IQuestion } from "survey/IStep";
    export interface IAnswerList {
        [key: string]: IQuestion;
    }
    export interface IAnswer {
        age?: TAge;
        answers: IAnswerList;
        birthdate?: string;
        finished?: Date;
        readonly started: Date;
    }
}
declare module "survey/Answer" {
    import { TAge } from "lib/types";
    import { IAnswer, IAnswerList } from "survey/IAnswer";
    export class Answer implements IAnswer {
        readonly started: Date;
        finished?: Date;
        birthdate?: string;
        age?: TAge;
        answers: IAnswerList;
        constructor(form?: Partial<Answer>);
    }
}
declare module "state/stepReducer" {
    import { ACTION_TYPE } from "lib/enums";
    import { IAnswer } from "survey/IAnswer";
    /**
     * Merges the form's answer state as the user progresses through the survey
     * @param previousState
     * @param action
     * @returns
     */
    export const stepReducer: (previousState: IAnswer, action: {
        type: ACTION_TYPE;
        value: any;
    }) => IAnswer;
}
declare module "lib/log" {
    /**
     * Logs to the console. All arguments logged as an array.
     * @param params
     * @returns
     */
    export const log: (...params: any) => void;
}
declare module "lib/noop" {
    /**
     * Generic no-operation
     */
    export const noop: () => void;
    /**
     * Generic no-element
     * @returns empty element
     */
    export const noel: (message?: string, context?: string) => JSX.Element;
}
declare module "survey/DefaultPages" {
    import { IPages } from "survey/IStep";
    export const DEFAULT_PAGES: IPages;
}
declare module "survey/IAction" {
    import { ACTION } from "lib/enums";
    export interface IAction {
        action: string;
        description: string;
        name: string;
        title: string;
        type: ACTION;
    }
}
declare module "survey/IResult" {
    import { IRequirement } from "survey/IRequirement";
    export interface IResult {
        id: string;
        label: string;
        match?: IRequirement;
        name: string;
        requirements: IRequirement[];
    }
}
declare module "survey/ISection" {
    import { PROGRESS_BAR_STATUS } from "lib/enums";
    import { IRequirement } from "survey/IRequirement";
    /**
     * Defines a survey section
     */
    export interface ISection {
        id: string;
        lastStep?: number;
        name: string;
        requirements: IRequirement[];
        status?: PROGRESS_BAR_STATUS;
    }
}
declare module "survey/IStepData" {
    import { ReactNode } from 'react';
    import { IWizard } from 'use-wizard/lib/cjs/useWizard/types/IWizard';
    import { TStep } from 'use-wizard/lib/cjs/useWizard/types/TStep';
    import { TReducer } from "lib/types";
    import { IAnswer } from "survey/IAnswer";
    import { IPage, IQuestion, IStep } from "survey/IStep";
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
}
declare module "survey/Questionnaire" {
    import { DIRECTION } from "lib/enums";
    import { IAction } from "survey/IAction";
    import { IAnswer } from "survey/IAnswer";
    import { IPage, IPages, IQuestion, IStep } from "survey/IStep";
    import { IResult } from "survey/IResult";
    import { ISection } from "survey/ISection";
    import { IStepData } from "survey/IStepData";
    /**
     * Definition for survey data input
     */
    export interface IQuestionnaire {
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
    export class Questionnaire implements IQuestionnaire {
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
}
declare module "lib/date" {
    import { DateTime } from 'luxon';
    import { TAge } from "lib/types";
    /**
     * Determines if a string can be parsed into a valid Date
     * @param dt
     * @returns
     */
    export const isValidDate: (dt: string | undefined) => boolean;
    /**
     * Gets a luxon DateTime object from a date string
     * @param dt DateTime as string- should always be in the format `MM/DD/YYYY`
     * @returns DateTime or undefined
     */
    export const getDateTime: (dt: string) => DateTime | undefined;
    /**
     * Gets an age from a DateTime object
     * @param dob - luxon DateTime
     * @returns an age with years, months, days
     */
    export const getDateTimeAge: (dob: DateTime) => TAge;
    /**
     * Parses a date/time string and returns an Age object
     * @param dateOfBirth - should always be in the format `MM/DD/YYYY`
     * @returns an age, if the date is valid
     */
    export const getAge: (dateOfBirth: string | undefined) => TAge | undefined;
}
declare module "lib/index" {
    export * from "lib/date";
    export * from "lib/enums";
    export * from "lib/log";
    export * from "lib/types";
}
declare module "survey/Config" {
    import { MODE } from "lib/index";
    export interface IQuestionableConfig {
        dev: boolean;
        mode: MODE;
        showSteps: boolean;
    }
    export class QuestionableConfig implements IQuestionableConfig {
        dev: boolean;
        mode: MODE;
        showSteps: boolean;
        constructor(config?: Partial<IQuestionableConfig>);
    }
}
declare module "state/GlobalState" {
    import React from 'react';
    import { Questionnaire } from "survey/Questionnaire";
    import { QuestionableConfig } from "survey/Config";
    export interface IQuestionable {
        config?: QuestionableConfig;
        questionnaire?: Questionnaire;
    }
    export const GlobalStateProvider: ({ children, value, }: {
        children: React.ReactNode;
        value?: Partial<IQuestionable> | undefined;
    }) => JSX.Element;
    export interface IGlobalState {
        config: QuestionableConfig;
        questionnaire: Questionnaire;
    }
    export const useGlobal: () => IGlobalState;
}
declare module "components/lib/Steps" {
    import { IAnswer } from "survey/IAnswer";
    import { IQuestionData, IStepData } from "survey/IStepData";
    import { Questionnaire } from "survey/Questionnaire";
    export abstract class Steps {
        static goToStep(step: string, props: IStepData): void;
        static goToNextStep(props: IStepData, questionnaire: Questionnaire): void;
        static goToPrevStep(props: IStepData, questionnaire: Questionnaire): void;
        /**
         * Determines whether the user should be allowed to continue
         * @param props
         * @returns
         */
        static isNextEnabled(props: IStepData): boolean;
        static isValid(form: IAnswer, question: string): boolean;
        static getFieldSetName(props: IQuestionData): string;
        static getDomId(answer: string, props: IQuestionData): string;
    }
}
declare module "components/wizard/Navbar" {
    import { IStepData } from "survey/IStepData";
    /**
     * Generates the Previous/Next buttons for Wizard navigation
     * @param props
     * @returns
     */
    export const Navbar: (props: IStepData) => JSX.Element;
}
declare module "components/lib/Wizard" {
    import { IStepData } from "survey/IStepData";
    import { QuestionableConfig } from "survey/Config";
    export abstract class Wizard {
        static getHeader(props: IStepData, config: QuestionableConfig): JSX.Element;
        static getSupportingDetails(props: IStepData): JSX.Element;
        static getQuestionHelp(props: IStepData): JSX.Element;
        static getFooter(props: IStepData): JSX.Element;
        static resetQuestionable(props: IStepData): void;
    }
}
declare module "components/wizard/StepLayout" {
    import { IStepData } from "survey/IStepData";
    /**
     * Generates the Card layout for each step's contents
     * @param props
     * @returns
     */
    export const StepLayout: (props: IStepData) => JSX.Element;
}
declare module "components/pages/LandingPage" {
    import { IPageData } from "survey/IStepData";
    /**
     * Generates the first page of the Wizard, "aka Landing"
     * @param props
     * @returns
     */
    export const LandingPage: (props: IPageData) => JSX.Element;
}
declare module "components/pages/NoResultsPage" {
    import { IPageData } from "survey/IStepData";
    /**
     * Displays the wizard results
     * @param props
     * @returns
     */
    export const NoResultsPage: (props: IPageData) => JSX.Element;
}
declare module "components/lib/Pages" {
    import { ReactNode } from 'react';
    import { IGlobalState } from "state/GlobalState";
    import { IResult } from "survey/IResult";
    import { IStepData } from "survey/IStepData";
    /**
     * Static utility methods for page components
     */
    export abstract class Pages {
        /**
         * Internal method to compute reason for a result
         * @param props
         * @param result
         * @returns
         */
        static getReason(props: IStepData, result: IResult, global: IGlobalState): string;
        /**
         * Internal method to generate list of results
         * @param props
         * @returns
         */
        static getResults(props: IStepData, global: IGlobalState): ReactNode;
    }
}
declare module "components/lib/Questions" {
    import { DateTime } from 'luxon';
    import { IQuestionData } from "survey/IStepData";
    import { TDateOfBirth } from "lib/types";
    /**
     * Static utility methods for question components
     */
    export abstract class Questions {
        /**
         * Updates the form with the current selected answer(s)
         * @param answer
         * @param props
         * @returns
         */
        private static updateForm;
        /**
         * Generates a radio button given a question definition
         * @param answer
         * @param props
         * @returns
         */
        private static getRadio;
        /**
         * Determines if the answer is valid and selected
         * @param answer
         * @param props
         * @returns
         */
        private static isSelected;
        /**
         * Gets a collection of radio buttons
         * @param props
         * @returns
         */
        static getRadios(props: IQuestionData): JSX.Element;
        /**
         * Generates a checkbox given a question definition
         * @param answer
         * @param props
         * @returns
         */
        private static getCheckbox;
        /**
       * Gets a collection of checkboxes
       * @param props
       * @returns
       */
        static getCheckboxes(props: IQuestionData): JSX.Element;
        /**
         * Gets a birthdate's DateTime from a form
         * @param props
         * @returns
         */
        static getBirthdate(props: IQuestionData): DateTime | undefined;
        /**
         * Converts a Date of Birth type into a string
         * @param dob
         * @returns
         */
        static toBirthdate(dob: TDateOfBirth): string | undefined;
    }
}
declare module "components/lib/index" {
    export * from "components/lib/Pages";
    export * from "components/lib/Questions";
    export * from "components/lib/Steps";
    export * from "components/lib/Wizard";
}
declare module "components/pages/ResultsPage" {
    import { IPageData } from "survey/IStepData";
    /**
     * Displays the wizard results
     * @param props
     * @returns
     */
    export const ResultsPage: (props: IPageData) => JSX.Element;
}
declare module "components/pages/SummaryPage" {
    import { IPageData } from "survey/IStepData";
    /**
     * Displays a summary of the wizard prior to showing results
     * @param props
     * @returns
     */
    export const SummaryPage: (props: IPageData) => JSX.Element;
}
declare module "components/pages/index" {
    export * from "components/pages/LandingPage";
    export * from "components/pages/NoResultsPage";
    export * from "components/pages/ResultsPage";
    export * from "components/pages/SummaryPage";
}
declare module "components/wizard/PageFactory" {
    import { IStepData } from "survey/IStepData";
    /**
     * Given a step of a known page type, returns a page component
     * @param props
     * @returns
     */
    export const PageFactory: (props: IStepData) => JSX.Element;
}
declare module "components/questions/DateOfBirth" {
    import { IQuestionData } from "survey/IStepData";
    export const DateOfBirth: (props: IQuestionData) => JSX.Element;
    export const DateOfBirthStep: (props: IQuestionData) => JSX.Element;
}
declare module "components/questions/MultipleChoice" {
    import { IQuestionData } from "survey/IStepData";
    /**
     * Renders a question and a radio list of allowed answers
     * @param props
     * @returns
     */
    export const MultipleChoice: (props: IQuestionData) => JSX.Element;
    /**
     * Renders a question and a radio list of allowed answers
     * @param props
     * @returns
     */
    export const MultipleChoiceStep: (props: IQuestionData) => JSX.Element;
}
declare module "components/questions/MultiSelect" {
    import { IQuestionData } from "survey/IStepData";
    /**
     * Renders a question and a radio list of allowed answers
     * @param props
     * @returns
     */
    export const MultipleSelect: (props: IQuestionData) => JSX.Element;
    /**
     * Renders a question and a radio list of allowed answers
     * @param props
     * @returns
     */
    export const MultipleSelectStep: (props: IQuestionData) => JSX.Element;
}
declare module "components/questions/index" {
    export * from "components/questions/DateOfBirth";
    export * from "components/questions/MultipleChoice";
    export * from "components/questions/MultiSelect";
}
declare module "components/wizard/QuestionFactory" {
    import { IStepData } from "survey/IStepData";
    /**
     * Given a step of a known question type, generates a question component
     * @param props
     * @returns
     */
    export const QuestionFactory: (props: IStepData) => JSX.Element;
}
declare module "components/wizard/StepFactory" {
    import { IStepData } from "survey/IStepData";
    /**
     * Core UI factory for generating steps
     * @param props
     * @returns
     */
    export const StepFactory: (props: IStepData) => JSX.Element;
}
declare module "components/wizard/DevPanel" {
    import { IStepData } from "survey/IStepData";
    export const DevPanel: (props: IStepData) => JSX.Element;
}
declare module "components/wizard/ProgressBar" {
    import { IStepData } from "survey/IStepData";
    export const ProgressBar: (props: IStepData) => JSX.Element;
}
declare module "components/Questionable" {
    import { IQuestionable } from "state/GlobalState";
    export const Questionable: (q: IQuestionable) => JSX.Element;
}
declare module "index" {
    export * from "components/Questionable";
}
declare module "components/index" {
    export * from "components/questions/index";
    export * from "components/Questionable";
    export * from "components/wizard/StepFactory";
    export * from "components/wizard/StepLayout";
    export * from "components/wizard/DevPanel";
    export * from "components/wizard/Navbar";
    export * from "components/wizard/ProgressBar";
}
declare module "components/wizard/index" {
    export * from "components/wizard/StepFactory";
    export * from "components/wizard/StepLayout";
    export * from "components/wizard/DevPanel";
    export * from "components/wizard/Navbar";
    export * from "components/wizard/ProgressBar";
}
declare module "flows/complex/data/actions.flow" {
    import { IAction } from "survey/IAction";
    export const actions: IAction[];
}
declare module "flows/complex/data/calculator.flow" {
    /**
     * Custom benefits calculator to compute Full Retirement Age (FRA)
     * @param dob Date of Birth as a string
     * @param monthOffset optional number of months to adjust calculation
     * @returns true if the given date is FRA as of now
     */
    export const isFraCalculator: (dob: string, monthOffset?: number) => boolean;
}
declare module "survey/index" {
    export * from "survey/Answer";
    export * from "survey/DefaultPages";
    export * from "survey/IAnswer";
    export * from "survey/IStep";
    export * from "survey/IRequirement";
    export * from "survey/IResult";
    export * from "survey/IStepData";
    export * from "survey/Questionnaire";
}
declare module "flows/complex/data/pages.flow" {
    import { IPages } from "survey/index";
    export const pages: IPages;
}
declare module "flows/complex/data/questions.flow" {
    import { IQuestion } from "survey/IStep";
    /**
     * All of the questions, their answers and dependencies
     */
    export const questions: IQuestion[];
}
declare module "flows/complex/data/results.flow" {
    import { IResult } from "survey/IResult";
    /**
     * All possible results with their requirements
     */
    export const results: IResult[];
}
declare module "flows/complex/data/sections.flow" {
    import { ISection } from "survey/ISection";
    export const sections: ISection[];
}
declare module "flows/complex/data/index" {
    export * from "flows/complex/data/actions.flow";
    export * from "flows/complex/data/calculator.flow";
    export * from "flows/complex/data/pages.flow";
    export * from "flows/complex/data/questions.flow";
    export * from "flows/complex/data/results.flow";
    export * from "flows/complex/data/sections.flow";
}
declare module "flows/complex/complex.flow" {
    import { Questionnaire } from "survey/Questionnaire";
    export const complexFlow: Questionnaire;
}
declare module "flows/index" {
    export * from "flows/complex/complex.flow";
}
declare module "flows/simple/data/actions.flow" {
    import { IAction } from "survey/IAction";
    export const actions: IAction[];
}
declare module "flows/simple/data/pages.flow" {
    import { IPages } from "survey/index";
    export const pages: IPages;
}
declare module "flows/simple/data/questions.flow" {
    import { IQuestion } from "survey/IStep";
    /**
     * All of the questions, their answers and dependencies
     */
    export const questions: IQuestion[];
}
declare module "flows/simple/data/results.flow" {
    import { IResult } from "survey/IResult";
    /**
     * All possible results with their requirements
     */
    export const results: IResult[];
}
declare module "flows/simple/data/sections.flow" {
    import { ISection } from "survey/ISection";
    export const sections: ISection[];
}
declare module "flows/simple/data/index" {
    export * from "flows/simple/data/actions.flow";
    export * from "flows/simple/data/pages.flow";
    export * from "flows/simple/data/questions.flow";
    export * from "flows/simple/data/results.flow";
    export * from "flows/simple/data/sections.flow";
}
declare module "flows/simple/simple.flow" {
    import { Questionnaire } from "survey/Questionnaire";
    export const simpleFlow: Questionnaire;
}
declare module "state/index" {
    export * from "state/stepReducer";
}
declare module "styles/index" {
    export * from './index.css';
}
//# sourceMappingURL=index.d.ts.map