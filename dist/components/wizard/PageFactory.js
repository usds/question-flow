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
exports.PageFactory = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var enums_1 = require("../../lib/enums");
var noop_1 = require("../../lib/noop");
var GlobalState_1 = require("../../state/GlobalState");
var pages_1 = require("../pages");
/**
 * Given a step of a known page type, returns a page component
 * @param props
 * @returns
 */
var PageFactory = function (props) {
    var stepId = props.stepId;
    var questionnaire = GlobalState_1.useGlobal().questionnaire;
    var step = questionnaire.getStepById("" + stepId);
    if (!enums_1.isEnum(enums_1.PAGE_TYPE, step.type)) {
        return noop_1.noel('Not a page');
    }
    var page = questionnaire.getPageById(step.id);
    var stepData = __assign({}, __assign({ step: page }, props));
    switch (page.type) {
        case enums_1.PAGE_TYPE.LANDING:
            return jsx_runtime_1.jsx(pages_1.LandingPage, __assign({}, stepData), void 0);
        case enums_1.PAGE_TYPE.NO_RESULTS:
            return jsx_runtime_1.jsx(pages_1.NoResultsPage, __assign({}, stepData), void 0);
        case enums_1.PAGE_TYPE.RESULTS:
            return jsx_runtime_1.jsx(pages_1.ResultsPage, __assign({}, stepData), void 0);
        case enums_1.PAGE_TYPE.SUMMARY:
            return jsx_runtime_1.jsx(pages_1.SummaryPage, __assign({}, stepData), void 0);
        default:
            return noop_1.noel('Page does not exist', 'PageFactory');
    }
};
exports.PageFactory = PageFactory;
//# sourceMappingURL=PageFactory.js.map