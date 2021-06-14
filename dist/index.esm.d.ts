/// <reference types="react" />
import { ReactNode } from "react";
import { IWizard } from "use-wizard/lib/cjs/useWizard/types/IWizard";
import { TStep } from "use-wizard/lib/cjs/useWizard/types/TStep";
import { DateTime } from "luxon";
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
/**
 * Defines the known component types for design
 */
declare enum DESIGN_TYPE {
    EDIT = "Edit"
}
/**
 * Defines the type of step for UI rendering
 */
declare const STEP_TYPE: {
    EDIT: DESIGN_TYPE.EDIT;
    DOB: QUESTION_TYPE.DOB;
    MULTIPLE_CHOICE: QUESTION_TYPE.MULTIPLE_CHOICE;
    MULTIPLE_SELECT: QUESTION_TYPE.MULTIPLE_SELECT;
    LANDING: PAGE_TYPE.LANDING;
    NO_RESULTS: PAGE_TYPE.NO_RESULTS;
    RESULTS: PAGE_TYPE.RESULTS;
    SUMMARY: PAGE_TYPE.SUMMARY;
};
type TStepType = PAGE_TYPE | QUESTION_TYPE | DESIGN_TYPE;
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
    CURRENT = "current",
    INCOMPLETE = "incomplete"
}
declare enum ACTION {
    CALL = "call",
    HYBRID = "hybrid",
    ONLINE = "online"
}
declare enum ACTION_TYPE {
    RESET = "RESET",
    UPDATE = "UPDATE"
}
declare enum DATE_UNIT {
    DAY = "day",
    MONTH = "month",
    YEAR = "year"
}
declare enum MODE {
    DEV = "dev",
    EDIT = "edit",
    VIEW = "view"
}
declare enum CSS_CLASS {
    BASE = "usds-q",
    DEV_PANEL_SECTION = "usds-q-dev-panel",
    DOB = "usds-q-dob",
    MULTI_CHOICE = "usds-q-multi-choice",
    MULTI_CHOICE_GROUP = "usds-q-multi-choice-group",
    MULTI_SELECT = "usds-q-multi-select",
    MULTI_SELECT_GROUP = "usds-q-multi-select-group",
    NAVBAR = "usds-q-navbar",
    NAVBAR_BUTTON = "usds-q-navbar-button",
    PROGRESS_BAR = "usds-q-progress-bar",
    PROGRESS_BAR_BOTTOM_SECTION = "usds-q-progress-bar-bottom-section",
    PROGRESS_BAR_TOP_SECTION = "usds-q-progress-bar-top-section",
    RESULTS_SUMMARY_BOX = "usds-q-results-summary-box",
    RESULTS_SUMMARY_HEADER = "usds-q-results-summary-header",
    STEP_FOOTER = "usds-q-step-footer",
    STEP_HEADER = "usds-q-step-header",
    STEP_INFO = "usds-q-step-info",
    STEP_LAYOUT = "usds-q-step-layout",
    STEP_LAYOUT_SECTION = "usds-q-step-layout-section",
    STEP_SUBTITLE = "usds-q-step-subtitle"
}
// eslint-disable-next-line @typescript-eslint/ban-types
declare const isEnum: (enm: object, value: string) => boolean;
/*
* Defines an age relative to a date
* @title Age Type
*/
type TAge = {
    /**
     * @minimum 0
     * @maximum 31
     * @nullable
     * @title Days
     */
    days?: number;
    /**
     * @minimum 0
     * @maximum 31
     * @nullable
     * @title Months
     */
    months: number;
    /**
     * @minimum 0
     * @maximum 100
     * @nullable
     * @title Years
     */
    years: number;
};
/**
 * Lambda that can be called to compute an age requirement
 * @hidden
 */
type TAgeCalc = (birthdate: string) => boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TReducer = (...params: any) => void;
type TDateOfBirth = {
    day?: string | undefined;
    month?: string | undefined;
    year?: string | undefined;
};
type TProgressBarType = "step-indicator" | "progress-bar";
type TVerticalPosition = "top" | "bottom";
type THorizontalPosition = "left" | "right";
type TButtonMode = "link" | "button";
/**
 * Configuration for customized behavior of Questionable
 */
interface IQuestionableConfig {
    /**
     * Enables all developer tools (NOT for production use!)
     *
     * @title Developer Mode
     * @default false
     * @hidden
     */
    readonly dev: boolean;
    /**
     * View or edit mode
     *
     * @title Mode
     * @default MODE.VIEW
     */
    mode: MODE;
    /**
     * Navigation configuration
     *
     * @title Navigation
     */
    nav: Partial<INavigationConfig>;
    /**
     * Progress Bar configuration
     *
     * @title Progress Bar
     */
    progressBar?: Partial<IProgressBarConfig>;
    /**
     * Question configuration
     *
     * @title Question Configuration
     */
    questions?: Partial<IQuestionConfig>;
    /**
     * Step configuration
     *
     * @title Step Configuration
     */
    steps?: Partial<IStepConfig>;
}
/**
 * Customizations for styling and formatting of the steps
 */
interface IStepConfig {
    /**
     * Class determines whether cards have borders
     *
     * @title Border Class
     * @default 'border-0'
     */
    borderClass: "border-ink" | "border-0";
    /**
     * Toggles whether steps' ids are shown next to the question text
     *
     * @title Show Step Id
     * @default false
     */
    showStepId: boolean;
    /**
     * Class to apply to title. Use to add background to question text
     *
     * @title Title Class
     * @default ''
     */
    titleClass: "bg-base-lightest" | "";
}
/**
 * Configuration options for the progress bar
 */
interface IProgressBarConfig {
    /**
     * Color of the non-completed pb
     *
     * @title Base Background Color
     */
    baseBgColor: string;
    /**
     * Color of the completed pb
     *
     * @title Background Color
     */
    bgColor: string;
    /**
     * Toggles whether to show progress bar
     *
     * @title Show Progress Bar
     * @default false
     */
    hide: boolean;
    /**
     * Vertical orientation of the progress bar
     *
     * @title Position
     * @default 'bottom'
     */
    position: TVerticalPosition;
    /**
     * Component type
     *
     * Can be one of two types:
     * (1) The USWDS Step Indicator @see https://trussworks.github.io/react-uswds/?path=/docs/components-step-indicator
     * (2) React progress bar @see https://katerinalupacheva.github.io/react-progress-bar/
     *
     * @title Type
     * @default 'progress-bar'
     */
    type: TProgressBarType;
}
/**
 * Configuration for question display
 */
interface IQuestionConfig {
    /**
     * Determines whether to show border on radios and checkboxes
     *
     * @title Show Answer Border
     * @default true
     */
    showAnswerBorder: boolean;
}
/**
 * Configuration for buttons
 */
interface IButtonConfig {
    /**
     * Default text to display if none is defined
     */
    defaultLabel: string;
    /**
     * Horizontal orientation (left or right)
     *
     * @title Horizontal Position
     * @default left
     */
    horizontalPos: THorizontalPosition;
    /**
     * Render mode (link or button)
     *
     * @title Mode
     */
    mode: TButtonMode;
    /**
     * Vertical orientation (top or bottom)
     *
     * @title Vertical Position
     */
    verticalPos: TVerticalPosition;
}
/**
 * Configuration for navigation
 */
interface INavigationConfig {
    /**
     * Next/Forward button
     */
    next: Partial<IButtonConfig>;
    /**
     * Previous/Go back button
     */
    prev: Partial<IButtonConfig>;
}
/**
 * Configuration class for customizing the Questionable components
 *
 * The config has opinionated defaults, but is easily modified using Partial updates
 */
declare class QuestionableConfig implements IQuestionableConfig {
    #private;
    constructor(config?: Partial<IQuestionableConfig>);
    get dev(): boolean;
    get mode(): MODE;
    set mode(val: MODE | string);
    get nav(): INavigationConfig;
    set nav(val: Partial<INavigationConfig>);
    get progressBar(): IProgressBarConfig;
    set progressBar(val: Partial<IProgressBarConfig>);
    get questions(): IQuestionConfig;
    set questions(val: Partial<IQuestionConfig>);
    get steps(): IStepConfig;
    set steps(val: Partial<IStepConfig>);
}
/**
 * Represents something the customer can do in response to receiving a result
 */
interface IAction {
    /**
     * @title Action
     */
    action: string;
    /**
     * @title Description
     */
    description: string;
    /**
     * @ttitle Name
     */
    name: string;
    /**
     * @title Title
     */
    title: string;
    /**
     * @title Type
     */
    type: ACTION;
}
/**
 * Represents a navigation button
 */
interface INavButton {
    /**
     * Text to display on button (e.g. 'Prev' or 'Next')
     */
    label: string;
}
/**
 * Definition for answers to questions
 */
interface IQuestionAnswer {
    id: string;
    order?: number;
    title: string;
}
/**
 * Acceptable responses
 */
interface IResponse {
    answers: Partial<IQuestionAnswer>[];
    question: Partial<IQuestion>;
}
/**
 * Generic step data definition. Applies to all types of steps.
 */
interface IStep {
    /**
     * Collection of navigation buttons
     *
     * @title Buttons
     */
    buttons?: {
        /**
         * Next button
         *
         * @title Next Button
         * @default { label: 'Next' }
         */
        next?: INavButton;
        /**
         * Previous / Back button
         *
         * @title Prev Button
         * @default { label: 'Prev' }
         */
        prev?: INavButton;
    };
    /**
     * Optional footer text to display at the bottom of the step
     *
     * @title Footer
     */
    footer?: string;
    /**
     * Unique identifier
     *
     * @title Id
     * @hidden Not viewable/editable in Design Mode
     */
    id: string;
    /**
     * Contextual content to display below the step contents and above the footer
     *
     * @title Info
     */
    info?: string;
    /**
     * Private/internal use only notes for documenting this step
     *
     * @title Internal Notes
     */
    internalNotes?: string;
    /**
     * Collection of requirements to view this step
     *
     * @title Requirements
     */
    requirements?: IRequirement[];
    /**
     * Section to which this step belongs
     *
     * @title Section
     */
    section: Partial<ISection>;
    /**
     * Text to display below the title
     *
     * @title Subtitle
     */
    subTitle?: string;
    /**
     * Display name of the step
     *
     * @title Title
     */
    title: string;
    /**
     * Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}
     *
     * @title Step Type
     */
    type: TStepType;
}
/**
 * Defines step content for Question type
 */
interface IQuestion extends IStep {
    /**
     * The current answer for this question
     *
     * @title Answer
     * @hidden Not viewable/editable in Design Mode
     */
    answer?: string;
    /**
     * Collection of allowed answers
     *
     * @title Answers
     */
    answers: IQuestionAnswer[];
    /**
     * Type of question
     *
     * @title Question Type
     */
    type: QUESTION_TYPE;
}
/**
 * Defines step content for Page types
 */
interface IPage extends IStep {
    /**
     * Defines the body content of the page
     *
     * @title Body
     */
    body?: string;
    /**
     * Optional header to display above body
     *
     * @title Body Heading
     */
    bodyHeader?: string;
    /**
     * Optional sub header to display below Body Heading
     *
     * @title Body Subheading
     */
    bodySubHeader?: string;
    /**
     * Type of page
     *
     * @title Page Type
     */
    type: PAGE_TYPE;
}
/**
 * Defines an individual requirement for accessing a step
 */
interface IRequirement {
    /**
     * Optional, custom calculator for performing age-specific validation
     * @hidden JSON schema does not support functions
     */
    ageCalc?: TAgeCalc;
    /**
     * User facing description of this requirement
     *
     * @title Exlanation
     */
    explanation?: string;
    /**
     * Optional maximum age allowed for this requirement
     *
     * @title Maximum Age
     */
    maxAge?: TAge;
    /**
     * Optional minimum age allowed for this requirement
     *
     * @title Minimum Age
     */
    minAge?: TAge;
    /**
     * Map of step id to required answer values
     *
     * @title Answers
     */
    responses: IResponse[];
}
/**
 * Defines a survey section, used in progress bar
 */
interface ISection {
    /**
     * Unique identifier
     *
     * @title Id
     * @hidden Not viewable/editable in Design Mode
     */
    id: string;
    /**
     * The last step id that is covered by this section
     *
     * @title Last Step
     * @hidden Not viewable/editable in Design Mode
     */
    lastStep?: number;
    /**
     * The display name of this section
     *
     * @title Name
     */
    name: string;
    /**
     * Collection of requirements to enable display of this status
     *
     * @title Requirements
     */
    requirements: IRequirement[];
    /**
     * Current display status of this section
     *
     * @title Status
     * @hidden Not viewable/editable in Design Mode
     */
    status?: PROGRESS_BAR_STATUS;
}
/**
 * Represents the survey as completed by the user
 */
interface IForm {
    /**
     * Customer's age in years/months/days
     *
     * @title Age
     */
    age?: TAge;
    /**
     * Customer's entered birthdate
     *
     * @title Birthdate
     */
    birthdate?: string;
    /**
     * Time the survey was completed
     *
     * @title Finished
     */
    finished?: Date;
    /**
     * All currently provided responses
     *
     * @title Responses
     */
    responses: IQuestion[];
    /**
     * Time the survey was started
     *
     * @title Started
     */
    readonly started: Date;
}
/**
 * Represents a potential result based on a customer's answers
 */
interface IResult {
    /**
     * Unique identifier
     *
     * @title Id
     * @hidden Not viewable/editable in Design Mode
     */
    id: string;
    /**
     * Identify the result (e.g. 'Benefit name')
     *
     * @title Label
     */
    label: string;
    /**
     * Requirement used for applying this result
     * Could have more than one, we only store the first
     *
     * @title Match
     * @hidden Not viewable/editable in Design Mode
     */
    match?: IRequirement;
    /**
     * Name of this result
     *
     * @title Name
     */
    name: string;
    /**
     * Collection of requirements required to achieve this result
     *
     * @title Requirements
     */
    requirements: IRequirement[];
}
/**
 * Defines required pages for the survey flow
 */
interface IPages {
    /**
     * First step of the survey
     *
     * @title Landing Page
     */
    readonly landingPage: IPage;
    /**
     * Last step of the survey if there are 0 results
     *
     * @title No Results Page
     */
    readonly noResultsPage: IPage;
    /**
     * Last step of the survey if there are 1 or more results
     *
     * @title Results Page
     */
    readonly resultsPage: IPage;
    /**
     * Preview of survery before submitting to receive results
     *
     * @title Summary Page
     */
    readonly summaryPage: IPage;
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
 * Data defintion for base wizard step
 */
interface IStepData {
    /**
     * Child component(s) to render
     *
     * @hidden JSON Schema doesn't support React components
     */
    children?: ReactNode;
    /**
     * Reducer to execute with form progression
     *
     * @hidden JSON Schema doesn't support functions
     */
    dispatchForm: TReducer;
    /**
     * The user's current form state
     *
     * @title Form
     */
    form: IForm;
    /**
     * Current step
     *
     * @title Step
     */
    step?: IStep;
    /**
     * Unique Id
     *
     * @title Step Id
     * @hidden Not viewable/editable in Design Mode
     */
    stepId: TStep;
    /**
     * `use-Wizard` instance for this instance of Questionable
     *
     * @title Wizard
     * @hidden Not viewable/editable in Design Mode
     */
    wizard: IWizard;
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
    getQuestion(q: Partial<IQuestion>): IQuestion;
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    getQuestionById(id: string): IQuestion;
    /**
     * Returns the next step in the sequence which is permitted by the current state of the form
     */
    getStep(thisStep: string, form: IForm, direction: DIRECTION, config?: QuestionableConfig): string;
    getNextStep(props: IStepData, config?: QuestionableConfig): string;
    getPreviousStep(props: IStepData, config?: QuestionableConfig): string;
    /**
     * Calculate the percent of survey completed
     * @param props
     * @returns
     */
    getProgressPercent(props: IStepData, config: IQuestionableConfig): number;
    /**
     * Gets all of the currently available sections
     * @param props
     * @returns
     */
    getSections(props: IStepData, config: IQuestionableConfig): ISection[];
    /**
     * Get all the results compatible with the current answers of the form
     * @param form
     * @returns
     */
    getResults(form: IForm): IResult[];
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
     * @param answers Collection of required answer Helpers.matches
     * @returns true if all answers are valid or if no answers are required
     */
    private meetsAnswerRequirements;
}
interface IQuestionable {
    config?: QuestionableConfig;
    questionnaire?: Questionnaire;
}
declare const Questionable: (q: IQuestionable) => JSX.Element;
/**
 * Determines if a string can be parsed into a valid Date
 * @param dt
 * @returns
 */
declare const isValidDate: (dt: string | undefined) => boolean;
/**
 * Gets a luxon DateTime object from a date string
 * @param dt DateTime as string- should always be in the format `MM/DD/YYYY`
 * @returns DateTime or undefined
 */
declare const getDateTime: (dt: string) => DateTime | undefined;
/**
 * Gets an age from a DateTime object
 * @param dob - luxon DateTime
 * @returns an age with years, months, days
 */
declare const getDateTimeAge: (dob: DateTime) => TAge;
/**
 * Parses a date/time string and returns an Age object
 * @param dateOfBirth - should always be in the format `MM/DD/YYYY`
 * @returns an age, if the date is valid
 */
declare const getAge: (dateOfBirth: string | undefined) => TAge | undefined;
declare const DEFAULT_PAGES: IPages;
/**
 * Collection of primitive helper methods
 */
declare abstract class Helpers {
    private static sanitize;
    /**
     * Determines if two strings are a fuzzy match
     */
    static matches(left?: string, right?: string): boolean;
}
declare const surveySchema: any;
/**
 * Data defintion for design step
 */
interface IDesignData extends IStepData {
    step: IStep;
}
/**
 * Data defintion for page step
 */
interface IPageData extends IStepData {
    step: IPage;
}
/**
 * Data defintion for question step
 */
interface IQuestionData extends IStepData {
    step: IQuestion;
}
export { Questionable, QuestionableConfig, Questionnaire, isValidDate, getDateTime, getDateTimeAge, getAge, DEFAULT_PAGES, QUESTION_TYPE, PAGE_TYPE, DESIGN_TYPE, STEP_TYPE, TStepType, DIRECTION, PROGRESS_BAR_STATUS, ACTION, ACTION_TYPE, DATE_UNIT, MODE, CSS_CLASS, isEnum, Helpers, TAge, TAgeCalc, TReducer, TDateOfBirth, TProgressBarType, TVerticalPosition, THorizontalPosition, TButtonMode, surveySchema, IAction, IForm, IDesignData, INavButton, IPageData, IPages, IQuestionAnswer, IQuestionData, IQuestionableConfig, IStepConfig, IProgressBarConfig, IQuestionConfig, IButtonConfig, INavigationConfig, IQuestionnaire, IResult, IResponse, IStep, IQuestion, IPage, IRequirement, ISection, IStepData };
//# sourceMappingURL=index.esm.d.ts.map