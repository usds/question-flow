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
exports.DateOfBirthStep = exports.DateOfBirth = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_uswds_1 = require("@trussworks/react-uswds");
var lodash_1 = require("lodash");
var react_1 = require("react");
var date_1 = require("../../lib/date");
var enums_1 = require("../../lib/enums");
var noop_1 = require("../../lib/noop");
var Questions_1 = require("../lib/Questions");
var Steps_1 = require("../lib/Steps");
var StepLayout_1 = require("../wizard/StepLayout");
var DateOfBirth = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var step = props.step;
    var dob = {
        day: (_b = (_a = Questions_1.Questions.getBirthdate(props)) === null || _a === void 0 ? void 0 : _a.day) === null || _b === void 0 ? void 0 : _b.toString(),
        month: (_d = (_c = Questions_1.Questions.getBirthdate(props)) === null || _c === void 0 ? void 0 : _c.month) === null || _d === void 0 ? void 0 : _d.toString(),
        year: (_f = (_e = Questions_1.Questions.getBirthdate(props)) === null || _e === void 0 ? void 0 : _e.year) === null || _f === void 0 ? void 0 : _f.toString(),
    };
    var _g = react_1.useState(dob), state = _g[0], setState = _g[1];
    if (!step) {
        return noop_1.noel();
    }
    var onDateOfBirthChange = function (e, unit) {
        var val = e.target.value;
        if (!val) {
            return;
        }
        state[unit] = val;
        setState(__assign({}, state));
        var bd = Questions_1.Questions.toBirthdate(state);
        var age = date_1.getAge(bd);
        if (age) {
            props.dispatchForm({
                type: enums_1.ACTION_TYPE.UPDATE,
                value: {
                    age: age,
                    birthdate: bd,
                },
            });
        }
    };
    var getDateInput = function (unit, label) {
        var length = 2;
        if (unit === enums_1.DATE_UNIT.YEAR) {
            length = 4;
        }
        return (jsx_runtime_1.jsx(react_uswds_1.DateInput, { id: Steps_1.Steps.getDomId(unit, props), name: label, label: lodash_1.capitalize(unit), unit: unit, maxLength: length, minLength: length, defaultValue: state[unit], onChange: function (e) { return onDateOfBirthChange(e, unit); } }, void 0));
    };
    var getDateInputGroup = function (label) { return (jsx_runtime_1.jsxs(react_uswds_1.DateInputGroup, { children: [getDateInput(enums_1.DATE_UNIT.MONTH, label),
            getDateInput(enums_1.DATE_UNIT.DAY, label),
            getDateInput(enums_1.DATE_UNIT.YEAR, label)] }, void 0)); };
    return getDateInputGroup('date_of_birth');
};
exports.DateOfBirth = DateOfBirth;
var DateOfBirthStep = function (props) { return (jsx_runtime_1.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: jsx_runtime_1.jsx(exports.DateOfBirth, __assign({}, props), void 0) }), void 0)); };
exports.DateOfBirthStep = DateOfBirthStep;
//# sourceMappingURL=DateOfBirth.js.map