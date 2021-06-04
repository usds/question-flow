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
exports.MultipleSelectStep = exports.MultipleSelect = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var noop_1 = require("../../lib/noop");
var Questions_1 = require("../lib/Questions");
var StepLayout_1 = require("../wizard/StepLayout");
/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
var MultipleSelect = function (props) {
    var _a;
    if (((_a = props === null || props === void 0 ? void 0 : props.step) === null || _a === void 0 ? void 0 : _a.answers) === undefined) {
        return noop_1.noel();
    }
    return Questions_1.Questions.getCheckboxes(props);
};
exports.MultipleSelect = MultipleSelect;
/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
var MultipleSelectStep = function (props) { return (jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: jsx_runtime_1.jsx(exports.MultipleSelect, __assign({}, props), void 0) }), void 0)); };
exports.MultipleSelectStep = MultipleSelectStep;
//# sourceMappingURL=MultiSelect.js.map