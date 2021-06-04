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
exports.ResultsPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var StepLayout_1 = require("../wizard/StepLayout");
var lib_1 = require("../lib");
var GlobalState_1 = require("../../state/GlobalState");
var noop_1 = require("../../lib/noop");
/**
 * Displays the wizard results
 * @param props
 * @returns
 */
var ResultsPage = function (props) {
    var step = props.step;
    var global = GlobalState_1.useGlobal();
    var questionnaire = global.questionnaire;
    if (!step) {
        return noop_1.noel();
    }
    var action = questionnaire.getAction();
    return (jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: jsx_runtime_1.jsxs(react_uswds_1.SummaryBox, __assign({ heading: step.bodyHeader || '', style: { paddingTop: '20px' } }, { children: [jsx_runtime_1.jsx("p", { children: step.bodySubHeader }, void 0),
                jsx_runtime_1.jsx("ul", __assign({ className: "usa-list usa-list--unstyled", style: { textAlign: 'left' } }, { children: lib_1.Pages.getResults(props, global) }), void 0),
                jsx_runtime_1.jsx("p", { dangerouslySetInnerHTML: { __html: (step === null || step === void 0 ? void 0 : step.body) || '' } }, void 0),
                jsx_runtime_1.jsx("h2", { children: action.title }, void 0),
                jsx_runtime_1.jsx("p", { children: action.description }, void 0),
                jsx_runtime_1.jsx("p", { dangerouslySetInnerHTML: { __html: action.action } }, void 0), "."] }), void 0) }), void 0));
};
exports.ResultsPage = ResultsPage;
//# sourceMappingURL=ResultsPage.js.map