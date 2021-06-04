"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleFlow = void 0;
var Questionnaire_1 = require("../../survey/Questionnaire");
var data_1 = require("./data");
var header = 'Simple Eligibility Survey';
exports.simpleFlow = new Questionnaire_1.Questionnaire({
    actions: data_1.actions,
    header: header,
    pages: data_1.pages,
    questions: data_1.questions,
    results: data_1.results,
    sections: data_1.sections,
});
//# sourceMappingURL=simple.flow.js.map