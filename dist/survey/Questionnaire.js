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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questionnaire = void 0;
var class_validator_1 = require("class-validator");
var enums_1 = require("../lib/enums");
var DefaultPages_1 = require("./DefaultPages");
/**
 * Utility wrapper for survey state
 */
var Questionnaire = /** @class */ (function () {
    function Questionnaire(data) {
        this.pages = DefaultPages_1.DEFAULT_PAGES;
        Object.assign(this, data);
        // Create a new collection for our flow logic
        this.steps = __spreadArray([], this.questions);
        this.init();
        // Wizard flow is defined as linear sequence of unique ids
        this.flow = this.steps.map(function (q) { return q.id; });
    }
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    Questionnaire.prototype.getStepById = function (id) {
        var ret = this.steps.find(function (q) { return q.id === id; });
        if (!ret) {
            throw new Error("Step id: " + id + " not found in survery");
        }
        return ret;
    };
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    Questionnaire.prototype.getPageById = function (id) {
        var ret = this.getStepById(id);
        if (!enums_1.isEnum(enums_1.PAGE_TYPE, ret.type)) {
            throw new Error("Step id: " + id + " is not a page");
        }
        return ret;
    };
    /**
     * Fetches a question by its id
     * @param id unique identifier of the question
     * @returns
     */
    Questionnaire.prototype.getQuestionById = function (id) {
        var ret = this.getStepById(id);
        if (!enums_1.isEnum(enums_1.QUESTION_TYPE, ret.type)) {
            throw new Error("Step id: " + id + " not a question");
        }
        return ret;
    };
    /**
     * Returns the next step in the sequence which is permitted by the current state of the form
     */
    Questionnaire.prototype.getStep = function (thisStep, form, direction) {
        var _this = this;
        var nextStep = this.flow.indexOf(thisStep) !== -1
            ? this.flow[this.flow.indexOf(thisStep) + direction]
            : undefined;
        // If there are no more steps, stay on current
        if (!nextStep)
            return thisStep;
        // Special handling for results
        if (nextStep === enums_1.STEP_TYPE.RESULTS && this.getResults(form).length === 0) {
            return enums_1.STEP_TYPE.NO_RESULTS;
        }
        if (nextStep === enums_1.STEP_TYPE.NO_RESULTS && this.getResults(form).length > 0) {
            return enums_1.STEP_TYPE.RESULTS;
        }
        var nextQuestion = this.getStepById(nextStep);
        if (!(nextQuestion === null || nextQuestion === void 0 ? void 0 : nextQuestion.requirements)) {
            return nextStep;
        }
        // match is a tri-state (undefined === unset)
        var match;
        // Each requirement is joined by `OR`
        nextQuestion.requirements.forEach(function (r) {
            // This safely handles cases where requirement parameters are undefined
            var next = _this.meetsAllRequirements(r, form);
            if (match === undefined) {
                match = next;
            }
            else {
                match = match || next;
            }
        });
        // If the requested step meets all requirements, return it
        if (match) {
            return nextStep;
        }
        // Get the next step whose requirements are met
        var n = this.getStep(nextStep, form, direction);
        if (n !== nextStep) {
            return n;
        }
        return thisStep;
    };
    Questionnaire.prototype.getNextStep = function (props) {
        var thisStep = props.stepId;
        return this.getStep(thisStep, props.form, enums_1.DIRECTION.FORWARD);
    };
    Questionnaire.prototype.getPreviousStep = function (props) {
        var thisStep = props.stepId;
        return this.getStep(thisStep, props.form, enums_1.DIRECTION.BACKWARD);
    };
    /**
     * Gets all of the currently available sections
     * @param props
     * @returns
     */
    Questionnaire.prototype.getSections = function (props) {
        var _this = this;
        if (!props) {
            return [];
        }
        // Get all sections that meet the requirements based on current answers
        var sections = this.sections.filter(function (s) {
            return s.requirements.length === 0
                || s.requirements.some(function (r) { return _this.meetsAllRequirements(r, props.form); });
        });
        var thisStep = props.stepId;
        var thisQuestion = this.getStepById(thisStep);
        var thisQuestionIdx = this.steps.indexOf(thisQuestion);
        return sections.map(function (s) {
            var section = __assign({}, s);
            section.lastStep = _this.questions.reduce(function (acc, q, index) { return (q.sectionId === s.id ? index : acc); }, -1);
            if (section.id === thisQuestion.sectionId) {
                section.status = enums_1.PROGRESS_BAR_STATUS.CURRENT;
            }
            if (section.lastStep < thisQuestionIdx) {
                section.status = enums_1.PROGRESS_BAR_STATUS.COMPLETE;
            }
            return section;
        });
    };
    /**
     * Get all the results compatible with the current answers of the form
     * @param form
     * @returns
     */
    Questionnaire.prototype.getResults = function (form) {
        var _this = this;
        return this.results.filter(function (r) {
            return r.requirements.some(function (match) {
                if (_this.meetsAllRequirements(match, form)) {
                    Object.assign(r, { match: match });
                    return true;
                }
                return false;
            });
        });
    };
    /**
     * Get a randomized action
     * @returns
     */
    Questionnaire.prototype.getAction = function () {
        var idx = Math.floor(Math.random() * this.actions.length);
        return this.actions[idx];
    };
    /**
     * Performs constructor validation on the survery inputs.
     * Sets step defaults for landing, summary and result if none are defined.
     */
    Questionnaire.prototype.init = function () {
        var _a, _b, _c;
        if (((_a = this.questions) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
            throw new Error('No questions have been defined.');
        }
        if (((_b = this.header) === null || _b === void 0 ? void 0 : _b.length) <= 0) {
            throw new Error('No header has been defined.');
        }
        if (((_c = this.results) === null || _c === void 0 ? void 0 : _c.length) <= 0) {
            throw new Error('No results have been defined.');
        }
        // NOTE: the following default assignment logic is not yet factored out.
        // This could be abstracted if repitions of this pattern emerge.
        var error = 'step is not correctly defined or defined more than once';
        // Ensure the wizard has a landing step at the beginning
        if (this.steps[0].type !== enums_1.PAGE_TYPE.LANDING) {
            this.steps.unshift(this.pages.landingPage);
        }
        if (this.steps.filter(function (q) { return q.type === enums_1.PAGE_TYPE.LANDING; }).length !== 1) {
            throw new Error(enums_1.PAGE_TYPE.LANDING + " " + error + ".");
        }
        // Ensure the wizard has a no results step at the end
        if (this.steps[this.steps.length - 1].type !== enums_1.PAGE_TYPE.NO_RESULTS) {
            // No results is last
            this.steps.push(this.pages.noResultsPage);
        }
        if (this.steps.filter(function (q) { return q.type === enums_1.PAGE_TYPE.NO_RESULTS; }).length
            !== 1) {
            throw new Error(enums_1.PAGE_TYPE.NO_RESULTS + " " + error + ".");
        }
        // Ensure the wizard has a result step before the no results step
        if (this.steps[this.steps.length - 2].type !== enums_1.PAGE_TYPE.RESULTS) {
            this.steps.splice(this.steps.length - 1, 0, this.pages.resultsPage);
        }
        if (this.steps.filter(function (q) { return q.type === enums_1.PAGE_TYPE.RESULTS; }).length !== 1) {
            throw new Error(enums_1.PAGE_TYPE.RESULTS + " " + error + ".");
        }
        // Ensure the wizard has a summary step before results
        if (this.steps[this.steps.length - 3].type !== enums_1.PAGE_TYPE.SUMMARY) {
            // Create wizard's summary step as the default step
            this.steps.splice(this.steps.length - 2, 0, this.pages.summaryPage);
        }
        if (this.steps.filter(function (q) { return q.type === enums_1.PAGE_TYPE.SUMMARY; }).length !== 1) {
            throw new Error(enums_1.PAGE_TYPE.SUMMARY + " " + error + ".");
        }
    };
    Questionnaire.prototype.meetsAllRequirements = function (requirement, form) {
        var minAge = requirement.minAge, maxAge = requirement.maxAge, answers = requirement.answers, ageCalc = requirement.ageCalc;
        // Internal to each requirement, all evaluations are `AND`
        // This safely handles cases where requirement parameters are undefined
        return (Questionnaire.meetsMinAgeRequirements(form, minAge)
            && Questionnaire.meetsMaxAgeRequirements(form, maxAge)
            && Questionnaire.meetsAgeCalcRequirements(form, ageCalc)
            && this.meetsAnswerRequirements(answers));
    };
    /**
     * Validates minimum age requirements
     * @param form The current state of the form
     * @param minAge a TAge object or undefined
     * @returns true if no min age, else true if age is >= min age
     */
    Questionnaire.meetsMinAgeRequirements = function (form, minAge) {
        if (!minAge)
            return true;
        if (form.age === undefined) {
            return false;
        }
        var _a = form.age, years = _a.years, months = _a.months;
        return (years > (minAge === null || minAge === void 0 ? void 0 : minAge.years)
            || (years >= (minAge === null || minAge === void 0 ? void 0 : minAge.years) && months >= (minAge === null || minAge === void 0 ? void 0 : minAge.months)));
    };
    /**
     * Validates maximum age requirements
     * @param form The current state of the form
     * @param maxAge a TAge object or undefined
     * @returns true if no max age, else true if age is <= max age
     */
    Questionnaire.meetsMaxAgeRequirements = function (form, maxAge) {
        if (!maxAge)
            return true;
        if (form.age === undefined) {
            return false;
        }
        var _a = form.age, years = _a.years, months = _a.months;
        return (years < (maxAge === null || maxAge === void 0 ? void 0 : maxAge.years)
            || (years <= (maxAge === null || maxAge === void 0 ? void 0 : maxAge.years) && months <= (maxAge === null || maxAge === void 0 ? void 0 : maxAge.months)));
    };
    /**
     * Executes an arbitrary function to determine age eligibility
     * @param form The current state of the form
     * @param ageCalc A callback function that operates on an age
     * @returns
     */
    Questionnaire.meetsAgeCalcRequirements = function (form, ageCalc) {
        if (!ageCalc)
            return true;
        if (form.birthdate === undefined) {
            return false;
        }
        var birthdate = form.birthdate;
        return ageCalc(birthdate);
    };
    /**
     * Determines if current answers in the form meet the step's requirements
     * @param answers Collection of required answer matches
     * @returns true if all answers are valid or if no answers are required
     */
    Questionnaire.prototype.meetsAnswerRequirements = function (answers) {
        var _this = this;
        if (!answers)
            return true;
        return Object.keys(answers).every(function (a) {
            var _a;
            var question = _this.getQuestionById(a);
            if (((_a = Object.keys(question.answers)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                // Allowed answers are an array. Any matched answer makes the response valid.
                return answers[a].some(function (i) {
                    return question.answer !== undefined
                        && question.answer === question.answers[i];
                });
            }
            // If no answers are defined, this passes
            return true;
        });
    };
    __decorate([
        class_validator_1.ArrayUnique(function (question) { return question.id; })
    ], Questionnaire.prototype, "questions", void 0);
    __decorate([
        class_validator_1.ArrayUnique(function (result) { return result.label; })
    ], Questionnaire.prototype, "results", void 0);
    __decorate([
        class_validator_1.ArrayUnique(function (section) { return section.id; })
    ], Questionnaire.prototype, "sections", void 0);
    return Questionnaire;
}());
exports.Questionnaire = Questionnaire;
//# sourceMappingURL=Questionnaire.js.map