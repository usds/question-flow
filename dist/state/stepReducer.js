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
exports.stepReducer = void 0;
var lodash_1 = require("lodash");
var enums_1 = require("../lib/enums");
var Answer_1 = require("../survey/Answer");
/**
 * Merges the form's answer state as the user progresses through the survey
 * @param previousState
 * @param action
 * @returns
 */
var stepReducer = function (previousState, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
action) {
    // Action should never be null,
    // except when we attempt to storybook/test individual components in isolation
    switch (action === null || action === void 0 ? void 0 : action.type) {
        case enums_1.ACTION_TYPE.RESET:
            return new Answer_1.Answer();
        case enums_1.ACTION_TYPE.UPDATE:
            return lodash_1.merge(__assign({}, previousState), __assign({}, action.value));
        default:
            return previousState;
    }
};
exports.stepReducer = stepReducer;
//# sourceMappingURL=stepReducer.js.map