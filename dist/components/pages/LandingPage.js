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
exports.LandingPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var noop_1 = require("../../lib/noop");
var StepLayout_1 = require("../wizard/StepLayout");
/**
 * Generates the first page of the Wizard, "aka Landing"
 * @param props
 * @returns
 */
var LandingPage = function (props) {
    var step = props.step;
    if (!step) {
        return noop_1.noel();
    }
    return (jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: jsx_runtime_1.jsx("p", { children: step.body }, void 0) }), void 0));
};
exports.LandingPage = LandingPage;
//# sourceMappingURL=LandingPage.js.map