import { DIRECTION } from '../lib/enums';
import { IAction } from './IAction';
import { IAnswer } from './IAnswer';
import { IPage, IPages, IQuestion, IStep } from './IStep';
import { IResult } from './IResult';
import { ISection } from './ISection';
import { IStepData } from './IStepData';
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
export declare class Questionnaire implements IQuestionnaire {
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
//# sourceMappingURL=Questionnaire.d.ts.map