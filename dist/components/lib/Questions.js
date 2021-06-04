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
exports.Questions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable no-param-reassign */
var react_uswds_1 = require("@trussworks/react-uswds");
var enums_1 = require("../../lib/enums");
var Steps_1 = require("./Steps");
var date_1 = require("../../lib/date");
/**
 * Static utility methods for question components
 */
var Questions = /** @class */ (function () {
    function Questions() {
    }
    /**
     * Updates the form with the current selected answer(s)
     * @param answer
     * @param props
     * @returns
     */
    Questions.updateForm = function (answer, props) {
        var _a;
        Object.assign(props.step, { answer: answer });
        var value = {
            answers: (_a = {},
                _a[props.step.id] = props.step,
                _a),
        };
        return props.dispatchForm({
            type: enums_1.ACTION_TYPE.UPDATE,
            value: value,
        });
    };
    /**
     * Generates a radio button given a question definition
     * @param answer
     * @param props
     * @returns
     */
    Questions.getRadio = function (answer, props) {
        var handler = function () { return Questions.updateForm(answer, props); };
        var id = Steps_1.Steps.getDomId(answer, props);
        return (jsx_runtime_1.jsx(react_uswds_1.Radio, { id: id, name: Steps_1.Steps.getFieldSetName(props), label: answer, value: answer, checked: Questions.isSelected(answer, props) === true, className: 'multipleChoice', onChange: handler, onClick: handler }, id));
    };
    /**
     * Determines if the answer is valid and selected
     * @param answer
     * @param props
     * @returns
     */
    Questions.isSelected = function (answer, props) {
        if (!(props === null || props === void 0 ? void 0 : props.form)) {
            return undefined;
        }
        var q = props.form.answers[props.step.id];
        return Steps_1.Steps.isValid(props.form, props.step.id) && q.answer === answer;
    };
    /**
     * Gets a collection of radio buttons
     * @param props
     * @returns
     */
    Questions.getRadios = function (props) {
        return (jsx_runtime_1.jsx(react_uswds_1.Fieldset, __assign({ legend: props.step.title, className: "multipleChoice", legendStyle: "srOnly" }, { children: Object.keys(props.step.answers).map(function (a) {
                return Questions.getRadio(props.step.answers[+a], props);
            }) }), void 0));
    };
    /**
     * Generates a checkbox given a question definition
     * @param answer
     * @param props
     * @returns
     */
    Questions.getCheckbox = function (answer, props) {
        var handler = function () { return Questions.updateForm(answer, props); };
        var id = Steps_1.Steps.getDomId(answer, props);
        return (jsx_runtime_1.jsx(react_uswds_1.Checkbox, { id: id, name: Steps_1.Steps.getFieldSetName(props), label: answer, value: answer, checked: Questions.isSelected(answer, props) === true, className: 'multipleSelect', onChange: handler, onClick: handler }, id));
    };
    /**
   * Gets a collection of checkboxes
   * @param props
   * @returns
   */
    Questions.getCheckboxes = function (props) {
        return (jsx_runtime_1.jsx(react_uswds_1.Fieldset, __assign({ legend: props.step.title, className: "multipleChoice", legendStyle: "srOnly" }, { children: Object.keys(props.step.answers).map(function (a) {
                return Questions.getCheckbox(props.step.answers[+a], props);
            }) }), void 0));
    };
    /**
     * Gets a birthdate's DateTime from a form
     * @param props
     * @returns
     */
    Questions.getBirthdate = function (props) {
        var _a;
        if ((_a = props.form) === null || _a === void 0 ? void 0 : _a.birthdate) {
            return date_1.getDateTime(props.form.birthdate);
        }
        return undefined;
    };
    /**
     * Converts a Date of Birth type into a string
     * @param dob
     * @returns
     */
    Questions.toBirthdate = function (dob) {
        if (dob.month && dob.day && dob.year) {
            return dob.month.padStart(2, '0') + "/" + dob.day.padStart(2, '0') + "/" + dob.year;
        }
        return undefined;
    };
    return Questions;
}());
exports.Questions = Questions;
//# sourceMappingURL=Questions.js.map