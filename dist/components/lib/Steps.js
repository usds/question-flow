"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = void 0;
var lodash_1 = require("lodash");
var enums_1 = require("../../lib/enums");
var Steps = /** @class */ (function () {
    function Steps() {
    }
    Steps.goToStep = function (step, props) {
        props.wizard.goToStep(step);
    };
    Steps.goToNextStep = function (props, questionnaire) {
        Steps.goToStep(questionnaire.getNextStep(props), props);
    };
    Steps.goToPrevStep = function (props, questionnaire) {
        Steps.goToStep(questionnaire.getPreviousStep(props), props);
    };
    /**
     * Determines whether the user should be allowed to continue
     * @param props
     * @returns
     */
    Steps.isNextEnabled = function (props) {
        var _a, _b, _c;
        if (!(props === null || props === void 0 ? void 0 : props.step))
            throw new Error('This survery is not defined');
        if (props.stepId === enums_1.STEP_TYPE.LANDING)
            return true;
        if (props.stepId === enums_1.STEP_TYPE.SUMMARY)
            return true;
        if (!props.form)
            return false;
        // KLUDGE Alert: this is not an elegant way to solve this
        if (((_a = props.step) === null || _a === void 0 ? void 0 : _a.type) === enums_1.QUESTION_TYPE.DOB) {
            return undefined !== ((_c = (_b = props.form) === null || _b === void 0 ? void 0 : _b.age) === null || _c === void 0 ? void 0 : _c.years) && props.form.age.years >= 0;
        }
        return Steps.isValid(props.form, props.step.id);
    };
    Steps.isValid = function (form, question) {
        var _a;
        if (!form.answers[question])
            return false;
        var q = form.answers[question];
        var answers = lodash_1.values(q.answers);
        switch (q.type) {
            case enums_1.STEP_TYPE.DOB:
                return undefined !== ((_a = form === null || form === void 0 ? void 0 : form.age) === null || _a === void 0 ? void 0 : _a.years) && form.age.years > 0;
            case enums_1.STEP_TYPE.MULTIPLE_CHOICE:
                return q.answer !== undefined && (answers === null || answers === void 0 ? void 0 : answers.indexOf(q.answer)) !== -1;
            // case STEP_TYPE.LANDING || STEP_TYPE.RESULTS || STEP_TYPE.SUMMARY:
            //   return true;
            default:
                return true;
        }
    };
    Steps.getFieldSetName = function (props) {
        return lodash_1.kebabCase(props.step.title);
    };
    Steps.getDomId = function (answer, props) {
        var name = Steps.getFieldSetName(props);
        return name + "-" + lodash_1.kebabCase(answer);
    };
    return Steps;
}());
exports.Steps = Steps;
//# sourceMappingURL=Steps.js.map