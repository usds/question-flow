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
exports.Questionable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var use_wizard_1 = require("use-wizard");
var stepReducer_1 = require("../state/stepReducer");
var Answer_1 = require("../survey/Answer");
var StepFactory_1 = require("./wizard/StepFactory");
var DevPanel_1 = require("./wizard/DevPanel");
var ProgressBar_1 = require("./wizard/ProgressBar");
var GlobalState_1 = require("../state/GlobalState");
var Questionable = function (q) {
    var questionnaire = q.questionnaire;
    if (!questionnaire) {
        throw new Error('questionable is undefined');
    }
    var _a = use_wizard_1.useWizard(questionnaire.flow), step = _a[0], wizard = _a[1];
    // This is only used to store user inputs
    var _b = react_1.useReducer(stepReducer_1.stepReducer, new Answer_1.Answer()), form = _b[0], dispatchForm = _b[1];
    return (jsx_runtime_1.jsxs(GlobalState_1.GlobalStateProvider, __assign({ value: q }, { children: [jsx_runtime_1.jsx("section", { children: jsx_runtime_1.jsx(ProgressBar_1.ProgressBar, __assign({}, {
                    dispatchForm: dispatchForm,
                    form: form,
                    stepId: step,
                    wizard: wizard,
                }), void 0) }, void 0),
            jsx_runtime_1.jsx("section", __assign({ className: "section" }, { children: jsx_runtime_1.jsx(StepFactory_1.StepFactory, __assign({}, {
                    dispatchForm: dispatchForm,
                    form: form,
                    stepId: step,
                    wizard: wizard,
                }), void 0) }), void 0),
            jsx_runtime_1.jsx("section", __assign({ className: "section" }, { children: jsx_runtime_1.jsx(DevPanel_1.DevPanel, __assign({}, {
                    dispatchForm: dispatchForm,
                    form: form,
                    stepId: step,
                    wizard: wizard,
                }), void 0) }), void 0)] }), void 0));
};
exports.Questionable = Questionable;
//# sourceMappingURL=Questionable.js.map