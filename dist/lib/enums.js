"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnum = exports.MODE = exports.DATE_UNIT = exports.ACTION_TYPE = exports.ACTION = exports.PROGRESS_BAR_STATUS = exports.DIRECTION = exports.STEP_TYPE = exports.PAGE_TYPE = exports.QUESTION_TYPE = void 0;
/**
 * Defines the known component types for questions
 */
var QUESTION_TYPE;
(function (QUESTION_TYPE) {
    QUESTION_TYPE["DOB"] = "dob";
    QUESTION_TYPE["MULTIPLE_CHOICE"] = "multiple_choice";
    QUESTION_TYPE["MULTIPLE_SELECT"] = "multiple_select";
})(QUESTION_TYPE = exports.QUESTION_TYPE || (exports.QUESTION_TYPE = {}));
/**
 * Defines the known component types for pages
 */
var PAGE_TYPE;
(function (PAGE_TYPE) {
    PAGE_TYPE["LANDING"] = "Landing";
    PAGE_TYPE["NO_RESULTS"] = "No Results";
    PAGE_TYPE["RESULTS"] = "Results";
    PAGE_TYPE["SUMMARY"] = "Summary";
})(PAGE_TYPE = exports.PAGE_TYPE || (exports.PAGE_TYPE = {}));
/**
 * Defines the type of step for UI rendering
 */
exports.STEP_TYPE = __assign(__assign({}, PAGE_TYPE), QUESTION_TYPE);
/**
 * Navigation direction for steps by array index (+1 or -1)
 */
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["FORWARD"] = 1] = "FORWARD";
    DIRECTION[DIRECTION["BACKWARD"] = -1] = "BACKWARD";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
/**
 * Progress Bar status
 */
var PROGRESS_BAR_STATUS;
(function (PROGRESS_BAR_STATUS) {
    PROGRESS_BAR_STATUS["COMPLETE"] = "complete";
    PROGRESS_BAR_STATUS["CURRENT"] = "current";
})(PROGRESS_BAR_STATUS = exports.PROGRESS_BAR_STATUS || (exports.PROGRESS_BAR_STATUS = {}));
var ACTION;
(function (ACTION) {
    ACTION["CALL"] = "call";
    ACTION["HYBRID"] = "hybrid";
    ACTION["ONLINE"] = "online";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
var ACTION_TYPE;
(function (ACTION_TYPE) {
    ACTION_TYPE["RESET"] = "RESET";
    ACTION_TYPE["UPDATE"] = "UPDATE";
})(ACTION_TYPE = exports.ACTION_TYPE || (exports.ACTION_TYPE = {}));
var DATE_UNIT;
(function (DATE_UNIT) {
    DATE_UNIT["DAY"] = "day";
    DATE_UNIT["MONTH"] = "month";
    DATE_UNIT["YEAR"] = "year";
})(DATE_UNIT = exports.DATE_UNIT || (exports.DATE_UNIT = {}));
var MODE;
(function (MODE) {
    MODE["EDIT"] = "edit";
    MODE["VIEW"] = "view";
})(MODE = exports.MODE || (exports.MODE = {}));
// eslint-disable-next-line @typescript-eslint/ban-types
var isEnum = function (enm, value) {
    return Object.values(enm).includes(value);
};
exports.isEnum = isEnum;
//# sourceMappingURL=enums.js.map