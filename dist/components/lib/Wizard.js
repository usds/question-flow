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
exports.Wizard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var noop_1 = require("../../lib/noop");
var enums_1 = require("../../lib/enums");
var Wizard = /** @class */ (function () {
    function Wizard() {
    }
    Wizard.getHeader = function (props, config) {
        var _a, _b;
        var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.title;
        if (!text) {
            return noop_1.noel();
        }
        if (config.showSteps) {
            text = ((_b = props.step) === null || _b === void 0 ? void 0 : _b.id) + ": " + text;
        }
        return jsx_runtime_1.jsx("h3", __assign({ className: "usa-card__heading" }, { children: text }), void 0);
    };
    Wizard.getSupportingDetails = function (props) {
        var _a;
        var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.subTitle;
        if (!text) {
            return noop_1.noel();
        }
        return jsx_runtime_1.jsx("p", { className: "font-sans-6", dangerouslySetInnerHTML: { __html: text } }, void 0);
    };
    Wizard.getQuestionHelp = function (props) {
        var _a;
        var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.info;
        if (!text) {
            return noop_1.noel();
        }
        return jsx_runtime_1.jsx("p", __assign({ className: "font-sans-6" }, { children: text }), void 0);
    };
    Wizard.getFooter = function (props) {
        var _a;
        var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.footer;
        if (!text) {
            return noop_1.noel();
        }
        return jsx_runtime_1.jsx("p", { className: "font-sans-6", dangerouslySetInnerHTML: { __html: text } }, void 0);
    };
    Wizard.resetQuestionable = function (props) {
        props.dispatchForm({
            type: enums_1.ACTION_TYPE.RESET,
        });
        props.wizard.goToStep('A');
    };
    return Wizard;
}());
exports.Wizard = Wizard;
//# sourceMappingURL=Wizard.js.map