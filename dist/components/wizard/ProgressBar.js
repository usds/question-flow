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
exports.ProgressBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var GlobalState_1 = require("../../state/GlobalState");
var noop_1 = require("../../lib/noop");
var getIndicatorStep = function (s) { return (jsx_runtime_1.jsx(react_uswds_1.StepIndicatorStep, { label: s.name, status: s.status }, s.id)); };
var ProgressBar = function (props) {
    var questionnaire = GlobalState_1.useGlobal().questionnaire;
    var sections = questionnaire.getSections(props);
    if (sections.length === 0) {
        return noop_1.noel();
    }
    return (jsx_runtime_1.jsx(react_uswds_1.StepIndicator, __assign({ centered: true, counters: "small" }, { children: questionnaire.getSections(props).map(getIndicatorStep) }), void 0));
};
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map