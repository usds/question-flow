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
exports.Pages = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Static utility methods for page components
 */
var Pages = /** @class */ (function () {
    function Pages() {
    }
    /**
     * Internal method to compute reason for a result
     * @param props
     * @param result
     * @returns
     */
    Pages.getReason = function (props, result, global) {
        var _a, _b, _c;
        var reason = (_a = result.match) === null || _a === void 0 ? void 0 : _a.explanation;
        var questionnaire = global.questionnaire, config = global.config;
        if (!reason) {
            return '';
        }
        if ((config === null || config === void 0 ? void 0 : config.dev) && result.match) {
            reason += '<br><br>';
            if (result.match.ageCalc !== undefined
                || result.match.minAge !== undefined
                || result.match.maxAge !== undefined) {
                reason += "You are " + ((_b = props.form.age) === null || _b === void 0 ? void 0 : _b.years) + " years ";
                reason += "and " + ((_c = props.form.age) === null || _c === void 0 ? void 0 : _c.months) + " months old. ";
            }
            Object.keys(result.match.answers).forEach(function (id) {
                var q = questionnaire.getQuestionById(id);
                reason += "You answered \"<b>" + q.answer + "</b>\" to the question \"<i>" + q.title + ".</i>\" ";
            });
        }
        return reason;
    };
    /**
     * Internal method to generate list of results
     * @param props
     * @returns
     */
    Pages.getResults = function (props, global) {
        var questionnaire = global.questionnaire;
        return (questionnaire.getResults(props.form).map(function (result) { return (jsx_runtime_1.jsxs("li", __assign({ className: "padding-bottom-2" }, { children: [jsx_runtime_1.jsxs("span", { children: [result.label, ":", '  ',
                        jsx_runtime_1.jsx("b", { children: result.name }, void 0)] }, void 0),
                jsx_runtime_1.jsx("div", { className: "text-light", dangerouslySetInnerHTML: { __html: Pages.getReason(props, result, global) } }, void 0)] }), props.stepId + "_" + result.id)); }));
    };
    return Pages;
}());
exports.Pages = Pages;
//# sourceMappingURL=Pages.js.map