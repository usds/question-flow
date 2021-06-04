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
exports.NoResultsPage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var noop_1 = require("../../lib/noop");
var StepLayout_1 = require("../wizard/StepLayout");
/**
 * Displays the wizard results
 * @param props
 * @returns
 */
var NoResultsPage = function (props) {
    var page = props.step;
    if (!page) {
        return noop_1.noel();
    }
    return (jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props), void 0));
};
exports.NoResultsPage = NoResultsPage;
//# sourceMappingURL=NoResultsPage.js.map