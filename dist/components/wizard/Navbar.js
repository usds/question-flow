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
exports.Navbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var enums_1 = require("../../lib/enums");
var GlobalState_1 = require("../../state/GlobalState");
// eslint-disable-next-line import/no-cycle
var Steps_1 = require("../lib/Steps");
/**
 * Generates the Previous/Next buttons for Wizard navigation
 * @param props
 * @returns
 */
var Navbar = function (props) {
    var _a, _b, _c, _d;
    var questionnaire = GlobalState_1.useGlobal().questionnaire;
    var step = props.step;
    // We can go back only once past the Landing step and the first actual step.
    // Once past Summary, back is disabled
    var showPrevStep = props.stepId !== enums_1.STEP_TYPE.LANDING
        && props.stepId !== enums_1.STEP_TYPE.RESULTS
        && props.stepId !== enums_1.STEP_TYPE.NO_RESULTS
        && props.stepId !== questionnaire.flow[1];
    // Results will be the last step; nothing follows
    var showNextStep = props.stepId !== enums_1.STEP_TYPE.RESULTS
        && props.stepId !== enums_1.STEP_TYPE.NO_RESULTS;
    var backLabel = ((_b = (_a = step === null || step === void 0 ? void 0 : step.buttons) === null || _a === void 0 ? void 0 : _a.prev) === null || _b === void 0 ? void 0 : _b.label) || 'Previous';
    var nextLabel = ((_d = (_c = step === null || step === void 0 ? void 0 : step.buttons) === null || _c === void 0 ? void 0 : _c.next) === null || _d === void 0 ? void 0 : _d.label) || 'Next';
    var next = function () { return Steps_1.Steps.goToNextStep(props, questionnaire); };
    var prev = function () { return Steps_1.Steps.goToPrevStep(props, questionnaire); };
    var disabled = function () { return !Steps_1.Steps.isNextEnabled(props); };
    return (jsx_runtime_1.jsxs("nav", __assign({ className: "wizard-layout__navbar" }, { children: [showPrevStep && (jsx_runtime_1.jsx(react_uswds_1.Button, __assign({ type: "button", outline: true, onClick: prev, "data-testid": "prev-button-" + props.stepId }, { children: backLabel }), void 0)),
            !showPrevStep && jsx_runtime_1.jsx("div", {}, void 0),
            showNextStep && (jsx_runtime_1.jsx(react_uswds_1.Button, __assign({ type: "button", onClick: next, disabled: disabled(), "data-testid": "next-button-" + props.stepId }, { children: nextLabel }), void 0)),
            !showNextStep && jsx_runtime_1.jsx("div", {}, void 0)] }), void 0));
};
exports.Navbar = Navbar;
//# sourceMappingURL=Navbar.js.map