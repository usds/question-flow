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
exports.QuestionFactory = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var enums_1 = require("../../lib/enums");
var noop_1 = require("../../lib/noop");
var GlobalState_1 = require("../../state/GlobalState");
var questions_1 = require("../questions");
/**
 * Given a step of a known question type, generates a question component
 * @param props
 * @returns
 */
var QuestionFactory = function (props) {
    var stepId = props.stepId;
    var questionnaire = GlobalState_1.useGlobal().questionnaire;
    var step = questionnaire.getStepById("" + stepId);
    if (!enums_1.isEnum(enums_1.QUESTION_TYPE, step.type)) {
        return noop_1.noel('Not a question');
    }
    var question = questionnaire.getQuestionById(step.id);
    var stepData = __assign({}, __assign({ step: question }, props));
    switch (question.type) {
        case enums_1.QUESTION_TYPE.DOB:
            return jsx_runtime_1.jsx(questions_1.DateOfBirthStep, __assign({}, stepData), void 0);
        case enums_1.QUESTION_TYPE.MULTIPLE_CHOICE:
            return jsx_runtime_1.jsx(questions_1.MultipleChoiceStep, __assign({}, stepData), void 0);
        case enums_1.QUESTION_TYPE.MULTIPLE_SELECT:
            return jsx_runtime_1.jsx(questions_1.MultipleSelectStep, __assign({}, stepData), void 0);
        default:
            return noop_1.noel('Question does not exist', 'QuestionFactory');
    }
};
exports.QuestionFactory = QuestionFactory;
//# sourceMappingURL=QuestionFactory.js.map