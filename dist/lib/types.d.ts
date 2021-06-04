export declare type TAge = {
    days?: number;
    months: number;
    years: number;
};
/**
 * Lambda that can be called to compute an age requirement
 */
export declare type TAgeCalc = (birthdate: string) => boolean;
/**
 * List of possible answers to the question.
 * Maps answer as string value to index number of question
 */
export declare type TAnswerMap = {
    [key: number]: string;
};
/**
 * Expresses a collection of answer requirements.
 * Unique keys are joined together by `AND`.
 * Keys represent a collection of allowed answer values joined by `OR`.
 */
export declare type TAnswers = {
    [key: string]: number[];
};
/**
 * Map sections to their last step by index
 */
export declare type TSectionMap = {
    [key: string]: number;
};
export declare type TReducer = (...params: any) => void;
export declare type TDateOfBirth = {
    day?: string | undefined;
    month?: string | undefined;
    year?: string | undefined;
};
//# sourceMappingURL=types.d.ts.map