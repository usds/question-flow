"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepFactory = void 0;
var enums_1 = require("../../lib/enums");
var noop_1 = require("../../lib/noop");
var GlobalState_1 = require("../../state/GlobalState");
var PageFactory_1 = require("./PageFactory");
var QuestionFactory_1 = require("./QuestionFactory");
/**
 * Core UI factory for generating steps
 * @param props
 * @returns
 */
var StepFactory = function (props) {
    var stepId = props.stepId;
    var questionnaire = GlobalState_1.useGlobal().questionnaire;
    var step = questionnaire.getStepById("" + stepId);
    if (enums_1.isEnum(enums_1.QUESTION_TYPE, step.type)) {
        return QuestionFactory_1.QuestionFactory(props);
    }
    if (enums_1.isEnum(enums_1.PAGE_TYPE, step.type)) {
        return PageFactory_1.PageFactory(props);
    }
    return noop_1.noel('Step does not exist', 'StepFactory');
};
exports.StepFactory = StepFactory;
//# sourceMappingURL=StepFactory.js.map