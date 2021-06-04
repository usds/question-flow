"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complexFlow = void 0;
var Questionnaire_1 = require("../../survey/Questionnaire");
var data_1 = require("./data");
var header = 'Complex Eligibility Survey';
exports.complexFlow = new Questionnaire_1.Questionnaire({
    actions: data_1.actions,
    header: header,
    pages: data_1.pages,
    questions: data_1.questions,
    results: data_1.results,
    sections: data_1.sections,
});
//# sourceMappingURL=complex.flow.js.map