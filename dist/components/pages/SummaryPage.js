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
exports.SummaryPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var noop_1 = require("../../lib/noop");
var StepLayout_1 = require("../wizard/StepLayout");
/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
var getAnswers = function (props) {
    var answers = Object.keys(props.form.answers).map(function (key) { return (jsx_runtime_1.jsx("li", __assign({ className: "padding-bottom-2" }, { children: jsx_runtime_1.jsxs("span", __assign({ className: "text-light" }, { children: [props.form.answers[key].title, ":\u00A0\u00A0", jsx_runtime_1.jsx("b", { children: props.form.answers[key].answer }, void 0)] }), void 0) }), key)); });
    return jsx_runtime_1.jsx("ul", __assign({ className: "usa-list usa-list--unstyled" }, { children: answers }), void 0);
};
/**
 * Displays a summary of the wizard prior to showing results
 * @param props
 * @returns
 */
var SummaryPage = function (props) {
    var page = props.step;
    if (!page) {
        return noop_1.noel();
    }
    return jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: getAnswers(props) }), void 0);
};
exports.SummaryPage = SummaryPage;
//# sourceMappingURL=SummaryPage.js.map