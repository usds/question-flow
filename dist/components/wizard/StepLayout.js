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
exports.StepLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var Navbar_1 = require("./Navbar");
var Wizard_1 = require("../lib/Wizard");
var GlobalState_1 = require("../../state/GlobalState");
/**
 * Generates the Card layout for each step's contents
 * @param props
 * @returns
 */
var StepLayout = function (props) {
    var config = GlobalState_1.useGlobal().config;
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("section", { children: jsx_runtime_1.jsx(react_uswds_1.CardGroup, { children: jsx_runtime_1.jsxs(react_uswds_1.Card, __assign({ headerFirst: true, gridLayout: { tablet: { col: 12 } }, containerProps: { className: 'border-ink' } }, { children: [jsx_runtime_1.jsxs(react_uswds_1.CardHeader, __assign({ className: "bg-base-lightest" }, { children: [Wizard_1.Wizard.getHeader(props, config),
                                    Wizard_1.Wizard.getSupportingDetails(props),
                                    Wizard_1.Wizard.getQuestionHelp(props)] }), void 0),
                            jsx_runtime_1.jsx(react_uswds_1.CardBody, __assign({ className: "padding-top-3" }, { children: props.children }), void 0),
                            jsx_runtime_1.jsx(react_uswds_1.CardFooter, { children: Wizard_1.Wizard.getFooter(props) }, void 0)] }), void 0) }, void 0) }, void 0),
            jsx_runtime_1.jsx(Navbar_1.Navbar, __assign({}, props), void 0)] }, void 0));
};
exports.StepLayout = StepLayout;
//# sourceMappingURL=StepLayout.js.map