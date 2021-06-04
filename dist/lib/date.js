"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAge = exports.getDateTimeAge = exports.getDateTime = exports.isValidDate = void 0;
var luxon_1 = require("luxon");
var moment_1 = __importDefault(require("moment"));
/**
 * Determines if a string can be parsed into a valid Date
 * @param dt
 * @returns
 */
var isValidDate = function (dt) {
    if (!dt || dt.length < 8)
        return false;
    if (!moment_1.default(dt, 'MM/DD/YYYY', true).isValid())
        return false;
    return true;
};
exports.isValidDate = isValidDate;
/**
 * Gets a luxon DateTime object from a date string
 * @param dt DateTime as string- should always be in the format `MM/DD/YYYY`
 * @returns DateTime or undefined
 */
var getDateTime = function (dt) {
    if (!exports.isValidDate(dt))
        return undefined;
    var date = new Date(+dt.substring(6, 10), +dt.substring(0, 2) - 1, +dt.substring(3, 5));
    return luxon_1.DateTime.fromJSDate(date);
};
exports.getDateTime = getDateTime;
/**
 * Gets an age from a DateTime object
 * @param dob - luxon DateTime
 * @returns an age with years, months, days
 */
var getDateTimeAge = function (dob) {
    var now = luxon_1.DateTime.now();
    var yearNow = now.year;
    var monthNow = now.month;
    var dateNow = now.day;
    var yearDob = dob.year;
    var monthDob = dob.month;
    var dateDob = dob.day;
    var years = yearNow - yearDob;
    var months = 0;
    if (monthNow >= monthDob) {
        months = monthNow - monthDob;
    }
    else {
        years -= 1;
        months = 12 + monthNow - monthDob;
    }
    var days = 0;
    if (dateNow >= dateDob) {
        days = dateNow - dateDob;
    }
    else {
        // eslint-disable-next-line no-multi-spaces
        days = 31 + dateNow - dateDob;
        months += -1;
        if (months < 0) {
            months = 11;
            years -= 1;
        }
    }
    return {
        days: days,
        months: months,
        years: years,
    };
};
exports.getDateTimeAge = getDateTimeAge;
/**
 * Parses a date/time string and returns an Age object
 * @param dateOfBirth - should always be in the format `MM/DD/YYYY`
 * @returns an age, if the date is valid
 */
var getAge = function (dateOfBirth) {
    if (!dateOfBirth || !exports.isValidDate(dateOfBirth))
        return undefined;
    var dob = exports.getDateTime(dateOfBirth);
    if (!dob)
        return undefined;
    return exports.getDateTimeAge(dob);
};
exports.getAge = getAge;
//# sourceMappingURL=date.js.map