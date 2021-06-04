/**
 * Defines the known component types for questions
 */
export declare enum QUESTION_TYPE {
    DOB = "dob",
    MULTIPLE_CHOICE = "multiple_choice",
    MULTIPLE_SELECT = "multiple_select"
}
/**
 * Defines the known component types for pages
 */
export declare enum PAGE_TYPE {
    LANDING = "Landing",
    NO_RESULTS = "No Results",
    RESULTS = "Results",
    SUMMARY = "Summary"
}
/**
 * Defines the type of step for UI rendering
 */
export declare const STEP_TYPE: {
    DOB: QUESTION_TYPE.DOB;
    MULTIPLE_CHOICE: QUESTION_TYPE.MULTIPLE_CHOICE;
    MULTIPLE_SELECT: QUESTION_TYPE.MULTIPLE_SELECT;
    LANDING: PAGE_TYPE.LANDING;
    NO_RESULTS: PAGE_TYPE.NO_RESULTS;
    RESULTS: PAGE_TYPE.RESULTS;
    SUMMARY: PAGE_TYPE.SUMMARY;
};
export declare type TStepType = PAGE_TYPE | QUESTION_TYPE;
/**
 * Navigation direction for steps by array index (+1 or -1)
 */
export declare enum DIRECTION {
    FORWARD = 1,
    BACKWARD = -1
}
/**
 * Progress Bar status
 */
export declare enum PROGRESS_BAR_STATUS {
    COMPLETE = "complete",
    CURRENT = "current"
}
export declare enum ACTION {
    CALL = "call",
    HYBRID = "hybrid",
    ONLINE = "online"
}
export declare enum ACTION_TYPE {
    RESET = "RESET",
    UPDATE = "UPDATE"
}
export declare enum DATE_UNIT {
    DAY = "day",
    MONTH = "month",
    YEAR = "year"
}
export declare enum MODE {
    EDIT = "edit",
    VIEW = "view"
}
export declare const isEnum: (enm: object, value: string) => boolean;
//# sourceMappingURL=enums.d.ts.map