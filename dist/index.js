(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
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
    var __spreadArray = (this && this.__spreadArray) || function (to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function(m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    define("lib/enums", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.isEnum = exports.MODE = exports.DATE_UNIT = exports.ACTION_TYPE = exports.ACTION = exports.PROGRESS_BAR_STATUS = exports.DIRECTION = exports.STEP_TYPE = exports.PAGE_TYPE = exports.QUESTION_TYPE = void 0;
        /**
         * Defines the known component types for questions
         */
        var QUESTION_TYPE;
        (function (QUESTION_TYPE) {
            QUESTION_TYPE["DOB"] = "dob";
            QUESTION_TYPE["MULTIPLE_CHOICE"] = "multiple_choice";
            QUESTION_TYPE["MULTIPLE_SELECT"] = "multiple_select";
        })(QUESTION_TYPE = exports.QUESTION_TYPE || (exports.QUESTION_TYPE = {}));
        /**
         * Defines the known component types for pages
         */
        var PAGE_TYPE;
        (function (PAGE_TYPE) {
            PAGE_TYPE["LANDING"] = "Landing";
            PAGE_TYPE["NO_RESULTS"] = "No Results";
            PAGE_TYPE["RESULTS"] = "Results";
            PAGE_TYPE["SUMMARY"] = "Summary";
        })(PAGE_TYPE = exports.PAGE_TYPE || (exports.PAGE_TYPE = {}));
        /**
         * Defines the type of step for UI rendering
         */
        exports.STEP_TYPE = __assign(__assign({}, PAGE_TYPE), QUESTION_TYPE);
        /**
         * Navigation direction for steps by array index (+1 or -1)
         */
        var DIRECTION;
        (function (DIRECTION) {
            DIRECTION[DIRECTION["FORWARD"] = 1] = "FORWARD";
            DIRECTION[DIRECTION["BACKWARD"] = -1] = "BACKWARD";
        })(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
        /**
         * Progress Bar status
         */
        var PROGRESS_BAR_STATUS;
        (function (PROGRESS_BAR_STATUS) {
            PROGRESS_BAR_STATUS["COMPLETE"] = "complete";
            PROGRESS_BAR_STATUS["CURRENT"] = "current";
        })(PROGRESS_BAR_STATUS = exports.PROGRESS_BAR_STATUS || (exports.PROGRESS_BAR_STATUS = {}));
        var ACTION;
        (function (ACTION) {
            ACTION["CALL"] = "call";
            ACTION["HYBRID"] = "hybrid";
            ACTION["ONLINE"] = "online";
        })(ACTION = exports.ACTION || (exports.ACTION = {}));
        var ACTION_TYPE;
        (function (ACTION_TYPE) {
            ACTION_TYPE["RESET"] = "RESET";
            ACTION_TYPE["UPDATE"] = "UPDATE";
        })(ACTION_TYPE = exports.ACTION_TYPE || (exports.ACTION_TYPE = {}));
        var DATE_UNIT;
        (function (DATE_UNIT) {
            DATE_UNIT["DAY"] = "day";
            DATE_UNIT["MONTH"] = "month";
            DATE_UNIT["YEAR"] = "year";
        })(DATE_UNIT = exports.DATE_UNIT || (exports.DATE_UNIT = {}));
        var MODE;
        (function (MODE) {
            MODE["EDIT"] = "edit";
            MODE["VIEW"] = "view";
        })(MODE = exports.MODE || (exports.MODE = {}));
        // eslint-disable-next-line @typescript-eslint/ban-types
        var isEnum = function (enm, value) {
            return Object.values(enm).includes(value);
        };
        exports.isEnum = isEnum;
    });
    define("lib/types", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/IRequirement", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/IStep", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/IAnswer", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/Answer", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Answer = void 0;
        var Answer = /** @class */ (function () {
            function Answer(form) {
                if (form === void 0) { form = {}; }
                this.answers = {};
                Object.assign(this, form);
                this.started = new Date();
            }
            return Answer;
        }());
        exports.Answer = Answer;
    });
    define("state/stepReducer", ["require", "exports", "lodash", "lib/enums", "survey/Answer"], function (require, exports, lodash_1, enums_1, Answer_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.stepReducer = void 0;
        /**
         * Merges the form's answer state as the user progresses through the survey
         * @param previousState
         * @param action
         * @returns
         */
        var stepReducer = function (previousState, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        action) {
            // Action should never be null,
            // except when we attempt to storybook/test individual components in isolation
            switch (action === null || action === void 0 ? void 0 : action.type) {
                case enums_1.ACTION_TYPE.RESET:
                    return new Answer_1.Answer();
                case enums_1.ACTION_TYPE.UPDATE:
                    return lodash_1.merge(__assign({}, previousState), __assign({}, action.value));
                default:
                    return previousState;
            }
        };
        exports.stepReducer = stepReducer;
    });
    /*
      eslint-disable no-console,
                     @typescript-eslint/no-explicit-any,
                     @typescript-eslint/explicit-module-boundary-types,
    */
    define("lib/log", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.log = void 0;
        /**
         * Logs to the console. All arguments logged as an array.
         * @param params
         * @returns
         */
        var log = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return console.log(__spreadArray([], params));
        };
        exports.log = log;
    });
    define("lib/noop", ["require", "exports", "react/jsx-runtime", "lib/log"], function (require, exports, jsx_runtime_1, log_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.noel = exports.noop = void 0;
        /**
         * Generic no-operation
         */
        var noop = function () { };
        exports.noop = noop;
        /**
         * Generic no-element
         * @returns empty element
         */
        var noel = function (message, context) {
            if (message === void 0) { message = ''; }
            if (context === void 0) { context = ''; }
            log_1.log('Created an empty element', message, context);
            return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: message }, void 0));
        };
        exports.noel = noel;
    });
    define("survey/DefaultPages", ["require", "exports", "lib/enums"], function (require, exports, enums_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DEFAULT_PAGES = void 0;
        /**
         * Default landing step if none is defined
         */
        var landingPage = {
            buttons: {
                next: {
                    label: 'Get Started',
                },
            },
            id: enums_2.PAGE_TYPE.LANDING,
            sectionId: enums_2.PAGE_TYPE.LANDING,
            title: enums_2.PAGE_TYPE.LANDING,
            type: enums_2.PAGE_TYPE.LANDING,
        };
        /**
         * Default result step if none is defined
         */
        var resultsPage = {
            id: enums_2.PAGE_TYPE.RESULTS,
            sectionId: enums_2.PAGE_TYPE.RESULTS,
            title: enums_2.PAGE_TYPE.RESULTS,
            type: enums_2.PAGE_TYPE.RESULTS,
        };
        /**
         * Default no results step if none is defined
         */
        var noResultsPage = {
            id: enums_2.PAGE_TYPE.NO_RESULTS,
            sectionId: enums_2.PAGE_TYPE.RESULTS,
            title: enums_2.PAGE_TYPE.NO_RESULTS,
            type: enums_2.PAGE_TYPE.NO_RESULTS,
        };
        /**
         * Default result step if none is defined
         */
        var summaryPage = {
            buttons: {
                next: {
                    label: 'Submit',
                },
            },
            id: enums_2.PAGE_TYPE.SUMMARY,
            sectionId: enums_2.PAGE_TYPE.RESULTS,
            title: enums_2.PAGE_TYPE.SUMMARY,
            type: enums_2.PAGE_TYPE.SUMMARY,
        };
        exports.DEFAULT_PAGES = {
            landingPage: landingPage,
            noResultsPage: noResultsPage,
            resultsPage: resultsPage,
            summaryPage: summaryPage,
        };
    });
    define("survey/IAction", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/IResult", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/ISection", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/IStepData", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("survey/Questionnaire", ["require", "exports", "class-validator", "lib/enums", "survey/DefaultPages"], function (require, exports, class_validator_1, enums_3, DefaultPages_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Questionnaire = void 0;
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
                if (!enums_3.isEnum(enums_3.PAGE_TYPE, ret.type)) {
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
                if (!enums_3.isEnum(enums_3.QUESTION_TYPE, ret.type)) {
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
                if (nextStep === enums_3.STEP_TYPE.RESULTS && this.getResults(form).length === 0) {
                    return enums_3.STEP_TYPE.NO_RESULTS;
                }
                if (nextStep === enums_3.STEP_TYPE.NO_RESULTS && this.getResults(form).length > 0) {
                    return enums_3.STEP_TYPE.RESULTS;
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
                return this.getStep(thisStep, props.form, enums_3.DIRECTION.FORWARD);
            };
            Questionnaire.prototype.getPreviousStep = function (props) {
                var thisStep = props.stepId;
                return this.getStep(thisStep, props.form, enums_3.DIRECTION.BACKWARD);
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
                        section.status = enums_3.PROGRESS_BAR_STATUS.CURRENT;
                    }
                    if (section.lastStep < thisQuestionIdx) {
                        section.status = enums_3.PROGRESS_BAR_STATUS.COMPLETE;
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
                if (this.steps[0].type !== enums_3.PAGE_TYPE.LANDING) {
                    this.steps.unshift(this.pages.landingPage);
                }
                if (this.steps.filter(function (q) { return q.type === enums_3.PAGE_TYPE.LANDING; }).length !== 1) {
                    throw new Error(enums_3.PAGE_TYPE.LANDING + " " + error + ".");
                }
                // Ensure the wizard has a no results step at the end
                if (this.steps[this.steps.length - 1].type !== enums_3.PAGE_TYPE.NO_RESULTS) {
                    // No results is last
                    this.steps.push(this.pages.noResultsPage);
                }
                if (this.steps.filter(function (q) { return q.type === enums_3.PAGE_TYPE.NO_RESULTS; }).length
                    !== 1) {
                    throw new Error(enums_3.PAGE_TYPE.NO_RESULTS + " " + error + ".");
                }
                // Ensure the wizard has a result step before the no results step
                if (this.steps[this.steps.length - 2].type !== enums_3.PAGE_TYPE.RESULTS) {
                    this.steps.splice(this.steps.length - 1, 0, this.pages.resultsPage);
                }
                if (this.steps.filter(function (q) { return q.type === enums_3.PAGE_TYPE.RESULTS; }).length !== 1) {
                    throw new Error(enums_3.PAGE_TYPE.RESULTS + " " + error + ".");
                }
                // Ensure the wizard has a summary step before results
                if (this.steps[this.steps.length - 3].type !== enums_3.PAGE_TYPE.SUMMARY) {
                    // Create wizard's summary step as the default step
                    this.steps.splice(this.steps.length - 2, 0, this.pages.summaryPage);
                }
                if (this.steps.filter(function (q) { return q.type === enums_3.PAGE_TYPE.SUMMARY; }).length !== 1) {
                    throw new Error(enums_3.PAGE_TYPE.SUMMARY + " " + error + ".");
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
    });
    define("lib/date", ["require", "exports", "luxon", "moment"], function (require, exports, luxon_1, moment_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getAge = exports.getDateTimeAge = exports.getDateTime = exports.isValidDate = void 0;
        moment_1 = __importDefault(moment_1);
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
    });
    define("lib/index", ["require", "exports", "lib/date", "lib/enums", "lib/log", "lib/types"], function (require, exports, date_1, enums_4, log_2, types_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(date_1, exports);
        __exportStar(enums_4, exports);
        __exportStar(log_2, exports);
        __exportStar(types_1, exports);
    });
    define("survey/Config", ["require", "exports", "lib/index"], function (require, exports, lib_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.QuestionableConfig = void 0;
        var QuestionableConfig = /** @class */ (function () {
            function QuestionableConfig(config) {
                if (config === void 0) { config = {}; }
                this.dev = false;
                this.mode = lib_1.MODE.VIEW;
                this.showSteps = false;
                Object.assign(this, config);
            }
            return QuestionableConfig;
        }());
        exports.QuestionableConfig = QuestionableConfig;
    });
    define("state/GlobalState", ["require", "exports", "react/jsx-runtime", "react"], function (require, exports, jsx_runtime_2, react_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.useGlobal = exports.GlobalStateProvider = void 0;
        var GlobalStateContext = react_1.createContext({
            setState: {},
            state: {},
        });
        var useGlobalState = function () {
            var context = react_1.useContext(GlobalStateContext);
            if (!context) {
                throw new Error('useGlobalState must be used within a GlobalStateContext');
            }
            return context;
        };
        var GlobalStateProvider = function (_a) {
            var children = _a.children, _b = _a.value, value = _b === void 0 ? {} : _b;
            var _c = react_1.useState(value), state = _c[0], setState = _c[1];
            return (jsx_runtime_2.jsx(GlobalStateContext.Provider, __assign({ value: { setState: setState, state: state } }, { children: children }), void 0));
        };
        exports.GlobalStateProvider = GlobalStateProvider;
        var useQuestionnaire = function () {
            var questionnaire = useGlobalState().state.questionnaire;
            if (!questionnaire) {
                throw new Error('useQuestionnaire has no data');
            }
            return questionnaire;
        };
        var useConfig = function () {
            var config = useGlobalState().state.config;
            if (!config) {
                throw new Error('useConfig has no data');
            }
            return config;
        };
        var useGlobal = function () { return ({
            config: useConfig(),
            questionnaire: useQuestionnaire(),
        }); };
        exports.useGlobal = useGlobal;
    });
    define("components/lib/Steps", ["require", "exports", "lodash", "lib/enums"], function (require, exports, lodash_2, enums_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Steps = void 0;
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
                if (props.stepId === enums_5.STEP_TYPE.LANDING)
                    return true;
                if (props.stepId === enums_5.STEP_TYPE.SUMMARY)
                    return true;
                if (!props.form)
                    return false;
                // KLUDGE Alert: this is not an elegant way to solve this
                if (((_a = props.step) === null || _a === void 0 ? void 0 : _a.type) === enums_5.QUESTION_TYPE.DOB) {
                    return undefined !== ((_c = (_b = props.form) === null || _b === void 0 ? void 0 : _b.age) === null || _c === void 0 ? void 0 : _c.years) && props.form.age.years >= 0;
                }
                return Steps.isValid(props.form, props.step.id);
            };
            Steps.isValid = function (form, question) {
                var _a;
                if (!form.answers[question])
                    return false;
                var q = form.answers[question];
                var answers = lodash_2.values(q.answers);
                switch (q.type) {
                    case enums_5.STEP_TYPE.DOB:
                        return undefined !== ((_a = form === null || form === void 0 ? void 0 : form.age) === null || _a === void 0 ? void 0 : _a.years) && form.age.years > 0;
                    case enums_5.STEP_TYPE.MULTIPLE_CHOICE:
                        return q.answer !== undefined && (answers === null || answers === void 0 ? void 0 : answers.indexOf(q.answer)) !== -1;
                    // case STEP_TYPE.LANDING || STEP_TYPE.RESULTS || STEP_TYPE.SUMMARY:
                    //   return true;
                    default:
                        return true;
                }
            };
            Steps.getFieldSetName = function (props) {
                return lodash_2.kebabCase(props.step.title);
            };
            Steps.getDomId = function (answer, props) {
                var name = Steps.getFieldSetName(props);
                return name + "-" + lodash_2.kebabCase(answer);
            };
            return Steps;
        }());
        exports.Steps = Steps;
    });
    define("components/wizard/Navbar", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "lib/enums", "state/GlobalState", "components/lib/Steps"], function (require, exports, jsx_runtime_3, react_uswds_1, enums_6, GlobalState_1, Steps_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Navbar = void 0;
        /**
         * Generates the Previous/Next buttons for Wizard navigation
         * @param props
         * @returns
         */
        var Navbar = function (props) {
            var _a, _b, _c, _d;
            var questionnaire = GlobalState_1.useGlobal().questionnaire;
            var step = props.step;
            // We can go back only once past the Landing step and the first actual step.
            // Once past Summary, back is disabled
            var showPrevStep = props.stepId !== enums_6.STEP_TYPE.LANDING
                && props.stepId !== enums_6.STEP_TYPE.RESULTS
                && props.stepId !== enums_6.STEP_TYPE.NO_RESULTS
                && props.stepId !== questionnaire.flow[1];
            // Results will be the last step; nothing follows
            var showNextStep = props.stepId !== enums_6.STEP_TYPE.RESULTS
                && props.stepId !== enums_6.STEP_TYPE.NO_RESULTS;
            var backLabel = ((_b = (_a = step === null || step === void 0 ? void 0 : step.buttons) === null || _a === void 0 ? void 0 : _a.prev) === null || _b === void 0 ? void 0 : _b.label) || 'Previous';
            var nextLabel = ((_d = (_c = step === null || step === void 0 ? void 0 : step.buttons) === null || _c === void 0 ? void 0 : _c.next) === null || _d === void 0 ? void 0 : _d.label) || 'Next';
            var next = function () { return Steps_1.Steps.goToNextStep(props, questionnaire); };
            var prev = function () { return Steps_1.Steps.goToPrevStep(props, questionnaire); };
            var disabled = function () { return !Steps_1.Steps.isNextEnabled(props); };
            return (jsx_runtime_3.jsxs("nav", __assign({ className: "wizard-layout__navbar" }, { children: [showPrevStep && (jsx_runtime_3.jsx(react_uswds_1.Button, __assign({ type: "button", outline: true, onClick: prev, "data-testid": "prev-button-" + props.stepId }, { children: backLabel }), void 0)),
                    !showPrevStep && jsx_runtime_3.jsx("div", {}, void 0),
                    showNextStep && (jsx_runtime_3.jsx(react_uswds_1.Button, __assign({ type: "button", onClick: next, disabled: disabled(), "data-testid": "next-button-" + props.stepId }, { children: nextLabel }), void 0)),
                    !showNextStep && jsx_runtime_3.jsx("div", {}, void 0)] }), void 0));
        };
        exports.Navbar = Navbar;
    });
    define("components/lib/Wizard", ["require", "exports", "react/jsx-runtime", "lib/noop", "lib/enums"], function (require, exports, jsx_runtime_4, noop_1, enums_7) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Wizard = void 0;
        var Wizard = /** @class */ (function () {
            function Wizard() {
            }
            Wizard.getHeader = function (props, config) {
                var _a, _b;
                var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.title;
                if (!text) {
                    return noop_1.noel();
                }
                if (config.showSteps) {
                    text = ((_b = props.step) === null || _b === void 0 ? void 0 : _b.id) + ": " + text;
                }
                return jsx_runtime_4.jsx("h3", __assign({ className: "usa-card__heading" }, { children: text }), void 0);
            };
            Wizard.getSupportingDetails = function (props) {
                var _a;
                var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.subTitle;
                if (!text) {
                    return noop_1.noel();
                }
                return jsx_runtime_4.jsx("p", { className: "font-sans-6", dangerouslySetInnerHTML: { __html: text } }, void 0);
            };
            Wizard.getQuestionHelp = function (props) {
                var _a;
                var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.info;
                if (!text) {
                    return noop_1.noel();
                }
                return jsx_runtime_4.jsx("p", __assign({ className: "font-sans-6" }, { children: text }), void 0);
            };
            Wizard.getFooter = function (props) {
                var _a;
                var text = (_a = props.step) === null || _a === void 0 ? void 0 : _a.footer;
                if (!text) {
                    return noop_1.noel();
                }
                return jsx_runtime_4.jsx("p", { className: "font-sans-6", dangerouslySetInnerHTML: { __html: text } }, void 0);
            };
            Wizard.resetQuestionable = function (props) {
                props.dispatchForm({
                    type: enums_7.ACTION_TYPE.RESET,
                });
                props.wizard.goToStep('A');
            };
            return Wizard;
        }());
        exports.Wizard = Wizard;
    });
    define("components/wizard/StepLayout", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "components/wizard/Navbar", "components/lib/Wizard", "state/GlobalState"], function (require, exports, jsx_runtime_5, react_uswds_2, Navbar_1, Wizard_1, GlobalState_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.StepLayout = void 0;
        /**
         * Generates the Card layout for each step's contents
         * @param props
         * @returns
         */
        var StepLayout = function (props) {
            var config = GlobalState_2.useGlobal().config;
            return (jsx_runtime_5.jsxs("div", { children: [jsx_runtime_5.jsx("section", { children: jsx_runtime_5.jsx(react_uswds_2.CardGroup, { children: jsx_runtime_5.jsxs(react_uswds_2.Card, __assign({ headerFirst: true, gridLayout: { tablet: { col: 12 } }, containerProps: { className: 'border-ink' } }, { children: [jsx_runtime_5.jsxs(react_uswds_2.CardHeader, __assign({ className: "bg-base-lightest" }, { children: [Wizard_1.Wizard.getHeader(props, config),
                                            Wizard_1.Wizard.getSupportingDetails(props),
                                            Wizard_1.Wizard.getQuestionHelp(props)] }), void 0),
                                    jsx_runtime_5.jsx(react_uswds_2.CardBody, __assign({ className: "padding-top-3" }, { children: props.children }), void 0),
                                    jsx_runtime_5.jsx(react_uswds_2.CardFooter, { children: Wizard_1.Wizard.getFooter(props) }, void 0)] }), void 0) }, void 0) }, void 0),
                    jsx_runtime_5.jsx(Navbar_1.Navbar, __assign({}, props), void 0)] }, void 0));
        };
        exports.StepLayout = StepLayout;
    });
    define("components/pages/LandingPage", ["require", "exports", "react/jsx-runtime", "lib/noop", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_6, noop_2, StepLayout_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.LandingPage = void 0;
        /**
         * Generates the first page of the Wizard, "aka Landing"
         * @param props
         * @returns
         */
        var LandingPage = function (props) {
            var step = props.step;
            if (!step) {
                return noop_2.noel();
            }
            return (jsx_runtime_6.jsx(StepLayout_1.StepLayout, __assign({}, props, { children: jsx_runtime_6.jsx("p", { children: step.body }, void 0) }), void 0));
        };
        exports.LandingPage = LandingPage;
    });
    define("components/pages/NoResultsPage", ["require", "exports", "react/jsx-runtime", "lib/noop", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_7, noop_3, StepLayout_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.NoResultsPage = void 0;
        /**
         * Displays the wizard results
         * @param props
         * @returns
         */
        var NoResultsPage = function (props) {
            var page = props.step;
            if (!page) {
                return noop_3.noel();
            }
            return (jsx_runtime_7.jsx(StepLayout_2.StepLayout, __assign({}, props), void 0));
        };
        exports.NoResultsPage = NoResultsPage;
    });
    define("components/lib/Pages", ["require", "exports", "react/jsx-runtime"], function (require, exports, jsx_runtime_8) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Pages = void 0;
        /**
         * Static utility methods for page components
         */
        var Pages = /** @class */ (function () {
            function Pages() {
            }
            /**
             * Internal method to compute reason for a result
             * @param props
             * @param result
             * @returns
             */
            Pages.getReason = function (props, result, global) {
                var _a, _b, _c;
                var reason = (_a = result.match) === null || _a === void 0 ? void 0 : _a.explanation;
                var questionnaire = global.questionnaire, config = global.config;
                if (!reason) {
                    return '';
                }
                if ((config === null || config === void 0 ? void 0 : config.dev) && result.match) {
                    reason += '<br><br>';
                    if (result.match.ageCalc !== undefined
                        || result.match.minAge !== undefined
                        || result.match.maxAge !== undefined) {
                        reason += "You are " + ((_b = props.form.age) === null || _b === void 0 ? void 0 : _b.years) + " years ";
                        reason += "and " + ((_c = props.form.age) === null || _c === void 0 ? void 0 : _c.months) + " months old. ";
                    }
                    Object.keys(result.match.answers).forEach(function (id) {
                        var q = questionnaire.getQuestionById(id);
                        reason += "You answered \"<b>" + q.answer + "</b>\" to the question \"<i>" + q.title + ".</i>\" ";
                    });
                }
                return reason;
            };
            /**
             * Internal method to generate list of results
             * @param props
             * @returns
             */
            Pages.getResults = function (props, global) {
                var questionnaire = global.questionnaire;
                return (questionnaire.getResults(props.form).map(function (result) { return (jsx_runtime_8.jsxs("li", __assign({ className: "padding-bottom-2" }, { children: [jsx_runtime_8.jsxs("span", { children: [result.label, ":", '  ',
                                jsx_runtime_8.jsx("b", { children: result.name }, void 0)] }, void 0),
                        jsx_runtime_8.jsx("div", { className: "text-light", dangerouslySetInnerHTML: { __html: Pages.getReason(props, result, global) } }, void 0)] }), props.stepId + "_" + result.id)); }));
            };
            return Pages;
        }());
        exports.Pages = Pages;
    });
    define("components/lib/Questions", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "lib/enums", "components/lib/Steps", "lib/date"], function (require, exports, jsx_runtime_9, react_uswds_3, enums_8, Steps_2, date_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Questions = void 0;
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
                    type: enums_8.ACTION_TYPE.UPDATE,
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
                var id = Steps_2.Steps.getDomId(answer, props);
                return (jsx_runtime_9.jsx(react_uswds_3.Radio, { id: id, name: Steps_2.Steps.getFieldSetName(props), label: answer, value: answer, checked: Questions.isSelected(answer, props) === true, className: 'multipleChoice', onChange: handler, onClick: handler }, id));
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
                return Steps_2.Steps.isValid(props.form, props.step.id) && q.answer === answer;
            };
            /**
             * Gets a collection of radio buttons
             * @param props
             * @returns
             */
            Questions.getRadios = function (props) {
                return (jsx_runtime_9.jsx(react_uswds_3.Fieldset, __assign({ legend: props.step.title, className: "multipleChoice", legendStyle: "srOnly" }, { children: Object.keys(props.step.answers).map(function (a) {
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
                var id = Steps_2.Steps.getDomId(answer, props);
                return (jsx_runtime_9.jsx(react_uswds_3.Checkbox, { id: id, name: Steps_2.Steps.getFieldSetName(props), label: answer, value: answer, checked: Questions.isSelected(answer, props) === true, className: 'multipleSelect', onChange: handler, onClick: handler }, id));
            };
            /**
           * Gets a collection of checkboxes
           * @param props
           * @returns
           */
            Questions.getCheckboxes = function (props) {
                return (jsx_runtime_9.jsx(react_uswds_3.Fieldset, __assign({ legend: props.step.title, className: "multipleChoice", legendStyle: "srOnly" }, { children: Object.keys(props.step.answers).map(function (a) {
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
                    return date_2.getDateTime(props.form.birthdate);
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
    });
    define("components/lib/index", ["require", "exports", "components/lib/Pages", "components/lib/Questions", "components/lib/Steps", "components/lib/Wizard"], function (require, exports, Pages_1, Questions_1, Steps_3, Wizard_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(Pages_1, exports);
        __exportStar(Questions_1, exports);
        __exportStar(Steps_3, exports);
        __exportStar(Wizard_2, exports);
    });
    define("components/pages/ResultsPage", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "components/wizard/StepLayout", "components/lib/index", "state/GlobalState", "lib/noop"], function (require, exports, jsx_runtime_10, react_uswds_4, StepLayout_3, lib_2, GlobalState_3, noop_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.ResultsPage = void 0;
        /**
         * Displays the wizard results
         * @param props
         * @returns
         */
        var ResultsPage = function (props) {
            var step = props.step;
            var global = GlobalState_3.useGlobal();
            var questionnaire = global.questionnaire;
            if (!step) {
                return noop_4.noel();
            }
            var action = questionnaire.getAction();
            return (jsx_runtime_10.jsx(StepLayout_3.StepLayout, __assign({}, props, { children: jsx_runtime_10.jsxs(react_uswds_4.SummaryBox, __assign({ heading: step.bodyHeader || '', style: { paddingTop: '20px' } }, { children: [jsx_runtime_10.jsx("p", { children: step.bodySubHeader }, void 0),
                        jsx_runtime_10.jsx("ul", __assign({ className: "usa-list usa-list--unstyled", style: { textAlign: 'left' } }, { children: lib_2.Pages.getResults(props, global) }), void 0),
                        jsx_runtime_10.jsx("p", { dangerouslySetInnerHTML: { __html: (step === null || step === void 0 ? void 0 : step.body) || '' } }, void 0),
                        jsx_runtime_10.jsx("h2", { children: action.title }, void 0),
                        jsx_runtime_10.jsx("p", { children: action.description }, void 0),
                        jsx_runtime_10.jsx("p", { dangerouslySetInnerHTML: { __html: action.action } }, void 0), "."] }), void 0) }), void 0));
        };
        exports.ResultsPage = ResultsPage;
    });
    define("components/pages/SummaryPage", ["require", "exports", "react/jsx-runtime", "lib/noop", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_11, noop_5, StepLayout_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.SummaryPage = void 0;
        /**
         * Internal method to generate a list of the survey answers
         * @param props
         * @returns
         */
        var getAnswers = function (props) {
            var answers = Object.keys(props.form.answers).map(function (key) { return (jsx_runtime_11.jsx("li", __assign({ className: "padding-bottom-2" }, { children: jsx_runtime_11.jsxs("span", __assign({ className: "text-light" }, { children: [props.form.answers[key].title, ":\u00A0\u00A0", jsx_runtime_11.jsx("b", { children: props.form.answers[key].answer }, void 0)] }), void 0) }), key)); });
            return jsx_runtime_11.jsx("ul", __assign({ className: "usa-list usa-list--unstyled" }, { children: answers }), void 0);
        };
        /**
         * Displays a summary of the wizard prior to showing results
         * @param props
         * @returns
         */
        var SummaryPage = function (props) {
            var page = props.step;
            if (!page) {
                return noop_5.noel();
            }
            return jsx_runtime_11.jsx(StepLayout_4.StepLayout, __assign({}, props, { children: getAnswers(props) }), void 0);
        };
        exports.SummaryPage = SummaryPage;
    });
    define("components/pages/index", ["require", "exports", "components/pages/LandingPage", "components/pages/NoResultsPage", "components/pages/ResultsPage", "components/pages/SummaryPage"], function (require, exports, LandingPage_1, NoResultsPage_1, ResultsPage_1, SummaryPage_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(LandingPage_1, exports);
        __exportStar(NoResultsPage_1, exports);
        __exportStar(ResultsPage_1, exports);
        __exportStar(SummaryPage_1, exports);
    });
    define("components/wizard/PageFactory", ["require", "exports", "react/jsx-runtime", "lib/enums", "lib/noop", "state/GlobalState", "components/pages/index"], function (require, exports, jsx_runtime_12, enums_9, noop_6, GlobalState_4, pages_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.PageFactory = void 0;
        /**
         * Given a step of a known page type, returns a page component
         * @param props
         * @returns
         */
        var PageFactory = function (props) {
            var stepId = props.stepId;
            var questionnaire = GlobalState_4.useGlobal().questionnaire;
            var step = questionnaire.getStepById("" + stepId);
            if (!enums_9.isEnum(enums_9.PAGE_TYPE, step.type)) {
                return noop_6.noel('Not a page');
            }
            var page = questionnaire.getPageById(step.id);
            var stepData = __assign({}, __assign({ step: page }, props));
            switch (page.type) {
                case enums_9.PAGE_TYPE.LANDING:
                    return jsx_runtime_12.jsx(pages_1.LandingPage, __assign({}, stepData), void 0);
                case enums_9.PAGE_TYPE.NO_RESULTS:
                    return jsx_runtime_12.jsx(pages_1.NoResultsPage, __assign({}, stepData), void 0);
                case enums_9.PAGE_TYPE.RESULTS:
                    return jsx_runtime_12.jsx(pages_1.ResultsPage, __assign({}, stepData), void 0);
                case enums_9.PAGE_TYPE.SUMMARY:
                    return jsx_runtime_12.jsx(pages_1.SummaryPage, __assign({}, stepData), void 0);
                default:
                    return noop_6.noel('Page does not exist', 'PageFactory');
            }
        };
        exports.PageFactory = PageFactory;
    });
    define("components/questions/DateOfBirth", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "lodash", "react", "lib/date", "lib/enums", "lib/noop", "components/lib/Questions", "components/lib/Steps", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_13, react_uswds_5, lodash_3, react_2, date_3, enums_10, noop_7, Questions_2, Steps_4, StepLayout_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DateOfBirthStep = exports.DateOfBirth = void 0;
        var DateOfBirth = function (props) {
            var _a, _b, _c, _d, _e, _f;
            var step = props.step;
            var dob = {
                day: (_b = (_a = Questions_2.Questions.getBirthdate(props)) === null || _a === void 0 ? void 0 : _a.day) === null || _b === void 0 ? void 0 : _b.toString(),
                month: (_d = (_c = Questions_2.Questions.getBirthdate(props)) === null || _c === void 0 ? void 0 : _c.month) === null || _d === void 0 ? void 0 : _d.toString(),
                year: (_f = (_e = Questions_2.Questions.getBirthdate(props)) === null || _e === void 0 ? void 0 : _e.year) === null || _f === void 0 ? void 0 : _f.toString(),
            };
            var _g = react_2.useState(dob), state = _g[0], setState = _g[1];
            if (!step) {
                return noop_7.noel();
            }
            var onDateOfBirthChange = function (e, unit) {
                var val = e.target.value;
                if (!val) {
                    return;
                }
                state[unit] = val;
                setState(__assign({}, state));
                var bd = Questions_2.Questions.toBirthdate(state);
                var age = date_3.getAge(bd);
                if (age) {
                    props.dispatchForm({
                        type: enums_10.ACTION_TYPE.UPDATE,
                        value: {
                            age: age,
                            birthdate: bd,
                        },
                    });
                }
            };
            var getDateInput = function (unit, label) {
                var length = 2;
                if (unit === enums_10.DATE_UNIT.YEAR) {
                    length = 4;
                }
                return (jsx_runtime_13.jsx(react_uswds_5.DateInput, { id: Steps_4.Steps.getDomId(unit, props), name: label, label: lodash_3.capitalize(unit), unit: unit, maxLength: length, minLength: length, defaultValue: state[unit], onChange: function (e) { return onDateOfBirthChange(e, unit); } }, void 0));
            };
            var getDateInputGroup = function (label) { return (jsx_runtime_13.jsxs(react_uswds_5.DateInputGroup, { children: [getDateInput(enums_10.DATE_UNIT.MONTH, label),
                    getDateInput(enums_10.DATE_UNIT.DAY, label),
                    getDateInput(enums_10.DATE_UNIT.YEAR, label)] }, void 0)); };
            return getDateInputGroup('date_of_birth');
        };
        exports.DateOfBirth = DateOfBirth;
        var DateOfBirthStep = function (props) { return (jsx_runtime_13.jsx(StepLayout_5.StepLayout, __assign({}, props, { children: jsx_runtime_13.jsx(exports.DateOfBirth, __assign({}, props), void 0) }), void 0)); };
        exports.DateOfBirthStep = DateOfBirthStep;
    });
    define("components/questions/MultipleChoice", ["require", "exports", "react/jsx-runtime", "lib/noop", "components/lib/Questions", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_14, noop_8, Questions_3, StepLayout_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.MultipleChoiceStep = exports.MultipleChoice = void 0;
        /**
         * Renders a question and a radio list of allowed answers
         * @param props
         * @returns
         */
        var MultipleChoice = function (props) {
            var _a;
            if (((_a = props === null || props === void 0 ? void 0 : props.step) === null || _a === void 0 ? void 0 : _a.answers) === undefined) {
                return noop_8.noel('Question and answer are not defined');
            }
            return Questions_3.Questions.getRadios(props);
        };
        exports.MultipleChoice = MultipleChoice;
        /**
         * Renders a question and a radio list of allowed answers
         * @param props
         * @returns
         */
        var MultipleChoiceStep = function (props) { return (jsx_runtime_14.jsx(StepLayout_6.StepLayout, __assign({}, props, { children: jsx_runtime_14.jsx(exports.MultipleChoice, __assign({}, props), void 0) }), void 0)); };
        exports.MultipleChoiceStep = MultipleChoiceStep;
    });
    define("components/questions/MultiSelect", ["require", "exports", "react/jsx-runtime", "lib/noop", "components/lib/Questions", "components/wizard/StepLayout"], function (require, exports, jsx_runtime_15, noop_9, Questions_4, StepLayout_7) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.MultipleSelectStep = exports.MultipleSelect = void 0;
        /**
         * Renders a question and a radio list of allowed answers
         * @param props
         * @returns
         */
        var MultipleSelect = function (props) {
            var _a;
            if (((_a = props === null || props === void 0 ? void 0 : props.step) === null || _a === void 0 ? void 0 : _a.answers) === undefined) {
                return noop_9.noel();
            }
            return Questions_4.Questions.getCheckboxes(props);
        };
        exports.MultipleSelect = MultipleSelect;
        /**
         * Renders a question and a radio list of allowed answers
         * @param props
         * @returns
         */
        var MultipleSelectStep = function (props) { return (jsx_runtime_15.jsx(StepLayout_7.StepLayout, __assign({}, props, { children: jsx_runtime_15.jsx(exports.MultipleSelect, __assign({}, props), void 0) }), void 0)); };
        exports.MultipleSelectStep = MultipleSelectStep;
    });
    define("components/questions/index", ["require", "exports", "components/questions/DateOfBirth", "components/questions/MultipleChoice", "components/questions/MultiSelect"], function (require, exports, DateOfBirth_1, MultipleChoice_1, MultiSelect_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(DateOfBirth_1, exports);
        __exportStar(MultipleChoice_1, exports);
        __exportStar(MultiSelect_1, exports);
    });
    define("components/wizard/QuestionFactory", ["require", "exports", "react/jsx-runtime", "lib/enums", "lib/noop", "state/GlobalState", "components/questions/index"], function (require, exports, jsx_runtime_16, enums_11, noop_10, GlobalState_5, questions_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.QuestionFactory = void 0;
        /**
         * Given a step of a known question type, generates a question component
         * @param props
         * @returns
         */
        var QuestionFactory = function (props) {
            var stepId = props.stepId;
            var questionnaire = GlobalState_5.useGlobal().questionnaire;
            var step = questionnaire.getStepById("" + stepId);
            if (!enums_11.isEnum(enums_11.QUESTION_TYPE, step.type)) {
                return noop_10.noel('Not a question');
            }
            var question = questionnaire.getQuestionById(step.id);
            var stepData = __assign({}, __assign({ step: question }, props));
            switch (question.type) {
                case enums_11.QUESTION_TYPE.DOB:
                    return jsx_runtime_16.jsx(questions_1.DateOfBirthStep, __assign({}, stepData), void 0);
                case enums_11.QUESTION_TYPE.MULTIPLE_CHOICE:
                    return jsx_runtime_16.jsx(questions_1.MultipleChoiceStep, __assign({}, stepData), void 0);
                case enums_11.QUESTION_TYPE.MULTIPLE_SELECT:
                    return jsx_runtime_16.jsx(questions_1.MultipleSelectStep, __assign({}, stepData), void 0);
                default:
                    return noop_10.noel('Question does not exist', 'QuestionFactory');
            }
        };
        exports.QuestionFactory = QuestionFactory;
    });
    define("components/wizard/StepFactory", ["require", "exports", "lib/enums", "lib/noop", "state/GlobalState", "components/wizard/PageFactory", "components/wizard/QuestionFactory"], function (require, exports, enums_12, noop_11, GlobalState_6, PageFactory_1, QuestionFactory_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.StepFactory = void 0;
        /**
         * Core UI factory for generating steps
         * @param props
         * @returns
         */
        var StepFactory = function (props) {
            var stepId = props.stepId;
            var questionnaire = GlobalState_6.useGlobal().questionnaire;
            var step = questionnaire.getStepById("" + stepId);
            if (enums_12.isEnum(enums_12.QUESTION_TYPE, step.type)) {
                return QuestionFactory_1.QuestionFactory(props);
            }
            if (enums_12.isEnum(enums_12.PAGE_TYPE, step.type)) {
                return PageFactory_1.PageFactory(props);
            }
            return noop_11.noel('Step does not exist', 'StepFactory');
        };
        exports.StepFactory = StepFactory;
    });
    define("components/wizard/DevPanel", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "lib/noop", "state/GlobalState", "components/lib/Wizard"], function (require, exports, jsx_runtime_17, react_uswds_6, noop_12, GlobalState_7, Wizard_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DevPanel = void 0;
        var DevPanel = function (props) {
            var config = GlobalState_7.useGlobal().config;
            if (!config.dev) {
                return noop_12.noel();
            }
            var reset = function () { return Wizard_3.Wizard.resetQuestionable(props); };
            return (jsx_runtime_17.jsxs(jsx_runtime_17.Fragment, { children: [jsx_runtime_17.jsx(react_uswds_6.Accordion, { items: [
                            {
                                content: (jsx_runtime_17.jsx("pre", { children: jsx_runtime_17.jsx("code", { children: JSON.stringify(props.form, null, 4) }, void 0) }, void 0)),
                                expanded: false,
                                id: 'developer-output',
                                title: 'Temporary developer panel',
                            },
                        ] }, void 0),
                    jsx_runtime_17.jsx("br", {}, void 0),
                    jsx_runtime_17.jsx("nav", __assign({ className: "wizard-layout__navbar" }, { children: jsx_runtime_17.jsx(react_uswds_6.Button, __assign({ type: "reset", secondary: true, onClick: reset }, { children: "Reset" }), void 0) }), void 0)] }, void 0));
        };
        exports.DevPanel = DevPanel;
    });
    define("components/wizard/ProgressBar", ["require", "exports", "react/jsx-runtime", "@trussworks/react-uswds", "state/GlobalState", "lib/noop"], function (require, exports, jsx_runtime_18, react_uswds_7, GlobalState_8, noop_13) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.ProgressBar = void 0;
        var getIndicatorStep = function (s) { return (jsx_runtime_18.jsx(react_uswds_7.StepIndicatorStep, { label: s.name, status: s.status }, s.id)); };
        var ProgressBar = function (props) {
            var questionnaire = GlobalState_8.useGlobal().questionnaire;
            var sections = questionnaire.getSections(props);
            if (sections.length === 0) {
                return noop_13.noel();
            }
            return (jsx_runtime_18.jsx(react_uswds_7.StepIndicator, __assign({ centered: true, counters: "small" }, { children: questionnaire.getSections(props).map(getIndicatorStep) }), void 0));
        };
        exports.ProgressBar = ProgressBar;
    });
    define("components/Questionable", ["require", "exports", "react/jsx-runtime", "react", "use-wizard", "state/stepReducer", "survey/Answer", "components/wizard/StepFactory", "components/wizard/DevPanel", "components/wizard/ProgressBar", "state/GlobalState"], function (require, exports, jsx_runtime_19, react_3, use_wizard_1, stepReducer_1, Answer_2, StepFactory_1, DevPanel_1, ProgressBar_1, GlobalState_9) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Questionable = void 0;
        var Questionable = function (q) {
            var questionnaire = q.questionnaire;
            if (!questionnaire) {
                throw new Error('questionable is undefined');
            }
            var _a = use_wizard_1.useWizard(questionnaire.flow), step = _a[0], wizard = _a[1];
            // This is only used to store user inputs
            var _b = react_3.useReducer(stepReducer_1.stepReducer, new Answer_2.Answer()), form = _b[0], dispatchForm = _b[1];
            return (jsx_runtime_19.jsxs(GlobalState_9.GlobalStateProvider, __assign({ value: q }, { children: [jsx_runtime_19.jsx("section", { children: jsx_runtime_19.jsx(ProgressBar_1.ProgressBar, __assign({}, {
                            dispatchForm: dispatchForm,
                            form: form,
                            stepId: step,
                            wizard: wizard,
                        }), void 0) }, void 0),
                    jsx_runtime_19.jsx("section", __assign({ className: "section" }, { children: jsx_runtime_19.jsx(StepFactory_1.StepFactory, __assign({}, {
                            dispatchForm: dispatchForm,
                            form: form,
                            stepId: step,
                            wizard: wizard,
                        }), void 0) }), void 0),
                    jsx_runtime_19.jsx("section", __assign({ className: "section" }, { children: jsx_runtime_19.jsx(DevPanel_1.DevPanel, __assign({}, {
                            dispatchForm: dispatchForm,
                            form: form,
                            stepId: step,
                            wizard: wizard,
                        }), void 0) }), void 0)] }), void 0));
        };
        exports.Questionable = Questionable;
    });
    define("index", ["require", "exports", "components/Questionable"], function (require, exports, Questionable_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(Questionable_1, exports);
    });
    define("components/index", ["require", "exports", "components/questions/index", "components/Questionable", "components/wizard/StepFactory", "components/wizard/StepLayout", "components/wizard/DevPanel", "components/wizard/Navbar", "components/wizard/ProgressBar"], function (require, exports, questions_2, Questionable_2, StepFactory_2, StepLayout_8, DevPanel_2, Navbar_2, ProgressBar_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(questions_2, exports);
        __exportStar(Questionable_2, exports);
        __exportStar(StepFactory_2, exports);
        __exportStar(StepLayout_8, exports);
        __exportStar(DevPanel_2, exports);
        __exportStar(Navbar_2, exports);
        __exportStar(ProgressBar_2, exports);
    });
    define("components/wizard/index", ["require", "exports", "components/wizard/StepFactory", "components/wizard/StepLayout", "components/wizard/DevPanel", "components/wizard/Navbar", "components/wizard/ProgressBar"], function (require, exports, StepFactory_3, StepLayout_9, DevPanel_3, Navbar_3, ProgressBar_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(StepFactory_3, exports);
        __exportStar(StepLayout_9, exports);
        __exportStar(DevPanel_3, exports);
        __exportStar(Navbar_3, exports);
        __exportStar(ProgressBar_3, exports);
    });
    define("flows/complex/data/actions.flow", ["require", "exports", "lib/enums"], function (require, exports, enums_13) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.actions = void 0;
        exports.actions = [
            {
                action: '<a href="#">Start application</a>',
                description: 'Answer more questions and upload documents to apply for the benefits you may be eligible for.',
                name: 'Apply Online',
                title: 'How to apply',
                type: enums_13.ACTION.ONLINE,
            },
            {
                action: 'Call <a href="#">1-800-772-1213</a> to schedule an appointment',
                description: "Call us to schedule an appointment to apply for the benefits you may be eligible for. When it's time for your appointment, we'll call you to complete your application over the phone.",
                name: 'Technician Assisted',
                title: 'How to apply',
                type: enums_13.ACTION.CALL,
            },
            {
                action: '<a href="#">Start application</a>',
                description: "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
                name: 'Apply Online & Technician Assisted',
                title: 'How to apply',
                type: enums_13.ACTION.HYBRID,
            },
        ];
    });
    define("flows/complex/data/calculator.flow", ["require", "exports", "lib/date"], function (require, exports, date_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.isFraCalculator = void 0;
        /**
         * Custom benefits calculator to compute Full Retirement Age (FRA)
         * @param dob Date of Birth as a string
         * @param monthOffset optional number of months to adjust calculation
         * @returns true if the given date is FRA as of now
         */
        var isFraCalculator = function (dob, monthOffset) {
            if (monthOffset === void 0) { monthOffset = 0; }
            var dateOfBirth = date_4.getDateTime(dob);
            if (!dateOfBirth)
                return false;
            var fra = dateOfBirth;
            // If the birthday is on the 1st of the month, FRA is calculated from the previous month
            // NOTE: if on 01/01, this will roll birthday back to the previous year
            if (dateOfBirth.day === 1) {
                fra = dateOfBirth.minus({ day: 1 });
            }
            // Frequently, calculations are in the form of FRA + 12 months or FRA - n months
            fra = fra.plus({ months: monthOffset });
            var age = date_4.getDateTimeAge(fra);
            if (!age)
                return false;
            // Anyone 67 or more is always FRA
            if (age.years >= 67) {
                return true;
            }
            // No one has an FRA before 66
            if (age.years < 66) {
                return false;
            }
            // Everyone born on or before 1954 retires at 66
            if (fra.year <= 1954) {
                return age.years >= 66;
            }
            // Everyone born after 1960 retires at 67
            if (fra.year >= 1960) {
                return age.years >= 67;
            }
            // The edge cases for FRA for 2021
            // In 2022, the 1955 case will drop; in 2023, the 1956, etc.
            switch (fra.year) {
                case 1955:
                    return age.years === 66 && age.months >= 2;
                case 1956:
                    return age.years === 66 && age.months >= 4;
                case 1957:
                    return age.years === 66 && age.months >= 6;
                case 1958:
                    return age.years === 66 && age.months >= 8;
                case 1959:
                    return age.years === 66 && age.months >= 10;
                default:
                    throw new Error("Year " + fra.year + " is not valid");
            }
        };
        exports.isFraCalculator = isFraCalculator;
    });
    define("survey/index", ["require", "exports", "survey/Answer", "survey/DefaultPages", "survey/IAnswer", "survey/IStep", "survey/IRequirement", "survey/IResult", "survey/IStepData", "survey/Questionnaire"], function (require, exports, Answer_3, DefaultPages_2, IAnswer_1, IStep_1, IRequirement_1, IResult_1, IStepData_1, Questionnaire_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(Answer_3, exports);
        __exportStar(DefaultPages_2, exports);
        __exportStar(IAnswer_1, exports);
        __exportStar(IStep_1, exports);
        __exportStar(IRequirement_1, exports);
        __exportStar(IResult_1, exports);
        __exportStar(IStepData_1, exports);
        __exportStar(Questionnaire_1, exports);
    });
    define("flows/complex/data/pages.flow", ["require", "exports", "lib/index"], function (require, exports, lib_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.pages = void 0;
        exports.pages = {
            landingPage: {
                body: 'To receive benefits, you have to meet certain requirements. We\'ll guide you through a series of questions to determine if you may be eligible.',
                buttons: {
                    next: {
                        label: 'Get Started',
                    },
                },
                id: lib_3.PAGE_TYPE.LANDING,
                sectionId: lib_3.PAGE_TYPE.LANDING,
                title: 'Check eligibility for benefits',
                type: lib_3.PAGE_TYPE.LANDING,
            },
            noResultsPage: {
                footer: 'The information you shared today tells us about your current situation. In the future, you may become eligible for benefits as you age or things in your life change.',
                id: lib_3.PAGE_TYPE.NO_RESULTS,
                sectionId: 'results',
                subTitle: 'You can <a href="#">apply for benefits</a> but based on what you told us today, you may not be eligible at this time.',
                title: 'You may not be eligible for benefits.',
                type: lib_3.PAGE_TYPE.NO_RESULTS,
            },
            resultsPage: {
                body: "This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll analyze more details during the application process to provide a definite answer.\n<p/>\nThe information you shared today tells us about your current situation. In the future, you may become eligible for other benefits as you age or things in your life change.",
                bodyHeader: 'Benefits you may be eligible for',
                bodySubHeader: 'Here\'s what you may be eligible for and why',
                id: lib_3.PAGE_TYPE.RESULTS,
                info: 'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
                sectionId: 'results',
                title: 'You may be eligible for benefits.',
                type: lib_3.PAGE_TYPE.RESULTS,
            },
            summaryPage: {
                buttons: {
                    next: {
                        label: 'Submit',
                    },
                },
                id: lib_3.PAGE_TYPE.SUMMARY,
                sectionId: 'results',
                subTitle: 'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
                title: 'Review your answers',
                type: lib_3.PAGE_TYPE.SUMMARY,
            },
        };
    });
    define("flows/complex/data/questions.flow", ["require", "exports", "lib/enums", "flows/complex/data/calculator.flow"], function (require, exports, enums_14, calculator_flow_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.questions = void 0;
        /**
         * All of the questions, their answers and dependencies
         */
        exports.questions = [
            {
                answers: {
                    0: 'An adult (age 18 and over)',
                    1: 'A child (under age 18)',
                },
                id: 'A',
                internalNotes: 'Anyone',
                sectionId: 'introduction',
                subTitle: 'To check eligibility for someone else, answer the questions based on their situation.',
                title: 'Who do you want to check eligibility for?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {},
                id: 'B',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'introduction',
                subTitle: "Most benefits have age requirements, so we'll use your birthday to see how old you are.",
                title: 'Enter your birthday.',
                type: enums_14.QUESTION_TYPE.DOB,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'C',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
                sectionId: 'a0_work',
                title: 'Do you attend high school full time?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'D',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'a0_work',
                subTitle: "When you work, part of your paycheck goes into benefits. That's why your work history is a primary consideration.",
                title: 'Have you ever had a job in the United States?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'E',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            D: [0], // Has worked at all
                        },
                        minAge: {
                            months: 8,
                            years: 61,
                        },
                    },
                ],
                sectionId: 'a0_work',
                subTitle: "How long you've worked is also important. Ten years is often the magic number that's required.",
                title: "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'F',
                info: 'If your answer is "Yes", you may have heard doctors, social workers, and others say you have a disability.',
                internalNotes: 'Adults age 18 and over, but below FRA + 12 months',
                requirements: [
                    {
                        // The customer must be younger than FRA + 12 months
                        ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday, 12); },
                        answers: {},
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
                sectionId: 'a0_work',
                title: 'Do you have a condition, illness, or injury that limits the type of work you can do, or prevents you from working altogether? ',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'G',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            F: [0], // Is disabled and younger than FRA + 12
                        },
                    },
                ],
                sectionId: 'a0_work',
                subTitle: 'benefits are there for you when your work is impacted for a long period of time.',
                title: 'Do you expect the condition, illness, or injury to affect your ability to work for a year or more, or be terminal?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Before my 22nd birthday',
                    1: 'After my 22nd birthday',
                },
                id: 'H',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            G: [0],
                        },
                        minAge: {
                            months: 0,
                            years: 22,
                        },
                    },
                ],
                sectionId: 'a0_work',
                subTitle: 'Some benefits consider if it started to affect you when you were a kid, teenager, or young adult.',
                title: 'When did the condition, illness, or injury start to affect your daily activities and ability to work?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: "Yes, but I'm separated from my spouse.",
                    2: 'No, but I was in the past.',
                    3: "No, I've never been married.",
                },
                id: 'I',
                info: "You may be eligible for certain benefits if you're legally married now or were in the past.",
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: 'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
                title: 'Are you married?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'J',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                            I: [0],
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: 'Your own eligibility for certain benefits depends on whether your spouse gets payments right now.',
                title: 'Does your spouse get benefits checks every month?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'K',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                            J: [1], // Spouse does not get SS
                        },
                        minAge: {
                            months: 0,
                            years: 60,
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: 'Did you marry your spouse before you turned 60?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'L',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                            I: [2],
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: "You may be eligible for benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
                title: 'Are you divorced?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'M',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            L: [0], // Divorced
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: 'How long you were married is an important factor. If you\'ve gotten divorced more than once, choose "Yes" if one of your marriages lasted for 10 years or more.',
                title: 'Were you married for 10 years or more before you got divorced?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                    2: "I don't know",
                },
                id: 'N',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            M: [0], // Married > 10 years before divorce
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: "How long they've worked is also important. Ten years is often the magic number that's required.",
                title: 'Has your former spouse worked for 10 years or more in the United States?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'O',
                info: '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. This may have happened recently or a long time ago.',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            K: [1], // Married before 60
                        },
                    },
                    {
                        answers: {
                            L: [1], // Not divorced
                        },
                    },
                    {
                        answers: {
                            M: [1], // Married >= 10 years before divorce
                        },
                    },
                    {
                        answers: {
                            N: [
                                1,
                                2, // Former spouse work history unknown
                            ],
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: 'Are you widowed?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'P',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            O: [0], // Widowed
                        },
                    },
                ],
                sectionId: 'a0_family',
                subTitle: "You may be eligible for benefits based on your former spouse's work history.",
                title: 'Did your spouse ever have a job in the United States before they passed away?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes, I have kids under the age of 16 who I take care of.',
                    1: 'Yes, I have kids over the age of 16 who I take care of.',
                    2: "No, I don't have kids who I take care of.",
                },
                id: 'Q',
                info: 'Some benefits consider your role as a birth, adoptive, or step parent.',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: 'Do you have kids who you take care of?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'R',
                info: 'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            Q: [
                                0,
                                1, // Have childred >= 16
                            ],
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: 'Do any of your kids have a condition or illness that significantly affects their daily activities?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'S',
                info: 'They may have been your birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            C: [0], // Attends high school
                        },
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            C: [1],
                            G: [0], // Is disabled
                        },
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            H: [0], // Disabled before 22nd birthday
                        },
                        minAge: {
                            months: 0,
                            years: 19,
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: 'Have you experienced the loss of a parent?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'T',
                info: 'Choose "No" if a grandparent, aunt, uncle, or someone else who isn\'t your parent takes care of you.',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            S: [0], // Has lost a parent
                        },
                    },
                ],
                sectionId: 'a0_family',
                title: "We're sorry you lost a loved one. Do you have one or multiple surviving parents who take care of you?",
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                    2: "I don't know",
                },
                id: 'U',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            T: [0], // Has surving parent
                        },
                    },
                    {
                        answers: {
                            S: [1], // Has not lost a parent
                        },
                    },
                ],
                sectionId: 'a1_family',
                subTitle: 'Your own eligibility depends on whether your parent(s) get payments right now.',
                title: 'Do your parent(s) receive benefits checks every month?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: "Yes. I'm able to pay for food and my home without difficulty.",
                    1: "No. I make some money, but it's still difficult to pay for food and my home.",
                    2: "No. I don't make any money, so it's difficult to pay for food and my home.",
                },
                id: 'V',
                internalNotes: 'Adults age 18 and over',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'a0_finances',
                subTitle: "One of our benefits considers whether it's difficult to cover basic daily needs.",
                title: 'Are you able to pay for food and a home without difficulty?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'W',
                info: 'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            A: [1],
                        },
                    },
                ],
                sectionId: 'a1_disability',
                title: 'Does the child have a condition or illness that significantly affects their daily activities?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'X',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            A: [1],
                            W: [0], // Child has disability
                        },
                    },
                ],
                sectionId: 'a1_disability',
                subTitle: "benefits are there for you when the child's daily activities are affected for a long period of time.",
                title: 'Do you expect the condition or illness to significantly affect their daily activities for a year or longer, or be terminal?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'Y',
                info: 'The parent may have been their birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            A: [1], // Applying for someone who is <= 18
                        },
                    },
                ],
                sectionId: 'a1_family',
                title: 'Has the child experienced the loss of a birth, adoptive, or step parent?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'Z',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            Y: [0], // Child has lost a parent
                        },
                    },
                ],
                sectionId: 'a1_family',
                subTitle: 'We realize you may be the surviving parent if you experienced the loss of your spouse.',
                title: "We're sorry they've lost a loved one. Do they have one or multiple surviving parents who take care of them?",
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                    2: "I don't know",
                },
                id: 'AA',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            Z: [0], // Has surviving parent
                        },
                    },
                ],
                sectionId: 'a1_family',
                subTitle: "The child's eligibility depends on whether their parent(s) get payments right now.",
                title: 'Do their parent(s) get benefits checks every month?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: "Yes, they're able to pay for food and a home without difficulty.",
                    1: "No, they make some money but it's difficult for them to pay for food and a home.",
                    2: "No, they don't make any money and it's very difficult for them to pay for food and a home.",
                    3: "I don't know if it's difficult for them to pay for food and a home.",
                },
                id: 'AB',
                internalNotes: 'Children under 18',
                requirements: [
                    {
                        answers: {
                            AA: [
                                0,
                                1,
                                2, // Parents SS status unknown
                            ],
                        },
                    },
                    {
                        answers: {
                            Z: [0], // Has surving parent
                        },
                    },
                ],
                sectionId: 'a1_family',
                subTitle: "One of our benefits considers whether it's difficult to cover basic daily needs.",
                title: 'Are the parent(s) who take care of them able to pay for food and a home without difficulty?',
                type: enums_14.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
        ];
    });
    define("flows/complex/data/results.flow", ["require", "exports", "flows/complex/data/calculator.flow"], function (require, exports, calculator_flow_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.results = void 0;
        var name = 'Benefit name';
        /**
         * All possible results with their requirements
         */
        exports.results = [
            {
                id: 'RS.00201.001',
                label: name,
                name: 'Retirement',
                requirements: [
                    {
                        answers: {
                            E: [0], // Has worked for >= 10 years
                        },
                        explanation: "You've worked for 10 years or more and meet our age requirements.",
                        minAge: {
                            months: 8,
                            years: 61,
                        },
                    },
                ],
            },
            {
                id: 'DI.10105.060',
                label: name,
                name: 'Disability, also referred to as benefits Disability Insurance (SSDI)',
                requirements: [
                    {
                        ageCalc: function (birthday) { return !calculator_flow_2.isFraCalculator(birthday, 12); },
                        answers: {
                            G: [0], // Is between 18 to FRA and is disabled
                        },
                        explanation: 'You expect a condition, illness, or injury to affect your ability to work for a year or more.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'SI.00501.001',
                label: name,
                name: 'Supplemental Security Income (SSI)',
                requirements: [
                    {
                        answers: {
                            V: [
                                1,
                                2, // Cannot make ends meet
                            ],
                        },
                        explanation: "You're 65 or older and said you have difficulty paying for food and a home.",
                        minAge: {
                            months: 0,
                            years: 65,
                        },
                    },
                    {
                        answers: {
                            G: [0],
                            V: [
                                1,
                                2, // Cannot make ends meet
                            ],
                        },
                        explanation: 'You said you have difficulty paying for food and a home. And, a disability affects your ability to work.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            A: [1],
                            X: [1], // Is disabled
                        },
                        explanation: "You expect a condition or illness to significantly affect the child's daily activities for a year or more. And, their parent(s) have difficulty paying for food and a home.",
                    },
                ],
            },
            {
                id: 'HI.00801.006 / .191 / .146, HI.00805.005',
                label: name,
                name: 'Medicare',
                requirements: [
                    {
                        answers: {},
                        explanation: 'You are between 64 years and 65 years and 3 months old.',
                        maxAge: {
                            months: 3,
                            years: 65,
                        },
                        minAge: {
                            months: 0,
                            years: 64,
                        },
                    },
                ],
            },
            {
                id: 'RS.00202.001',
                label: name,
                name: 'Spouse',
                requirements: [
                    {
                        answers: {
                            I: [
                                0,
                                1, // Is married but separated
                            ],
                            J: [0], // Spouse has benefits
                        },
                        explanation: "You're 62 or older and your spouse gets benefits checks every month.",
                        minAge: {
                            months: 0,
                            years: 62,
                        },
                    },
                ],
            },
            {
                id: 'RS.01310.001, RS. 00208.005',
                label: name,
                name: 'Spouse with Child in Care',
                requirements: [
                    {
                        ageCalc: function (birthday) { return !calculator_flow_2.isFraCalculator(birthday); },
                        answers: {
                            I: [0],
                            J: [0],
                            Q: [0],
                            R: [
                                0,
                                1, // Children are disabled
                            ],
                        },
                        explanation: 'Your spouse gets benefits checks every month and you take care of kids under the age of 16.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        ageCalc: function (birthday) { return !calculator_flow_2.isFraCalculator(birthday); },
                        answers: {
                            I: [0],
                            J: [0],
                            Q: [1],
                            R: [1], // Children are disabled
                        },
                        explanation: 'Your spouse gets benefits checks every month and you take care of disabled kids over the age of 16.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        ageCalc: function (birthday) { return !calculator_flow_2.isFraCalculator(birthday); },
                        answers: {
                            I: [2],
                            N: [
                                0,
                                2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
                            ],
                            Q: [0],
                            R: [
                                0,
                                1, // Children are disabled
                            ],
                        },
                        explanation: 'You were married for 10 years or more in the past and your former spouse worked. And, you take care of kids under the age of 16.',
                        minAge: {
                            months: 0,
                            years: 62,
                        },
                    },
                    {
                        ageCalc: function (birthday) { return !calculator_flow_2.isFraCalculator(birthday); },
                        answers: {
                            I: [2],
                            N: [
                                0,
                                2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
                            ],
                            Q: [1],
                            R: [1], // Children are disabled
                        },
                        explanation: 'You were married for 10 years or more in the past and your former spouse worked. And, you take care of disabled kids over the age of 16.',
                        minAge: {
                            months: 0,
                            years: 62,
                        },
                    },
                ],
            },
            {
                id: 'RS.00202.005',
                label: name,
                name: 'Divorced Spouse',
                requirements: [
                    {
                        answers: {
                            I: [2],
                            N: [
                                0,
                                2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
                            ],
                            Q: [0],
                            R: [
                                0,
                                1, // Children are disabled
                            ],
                        },
                        explanation: "You're 62 or older, were married for 10 years or more in the past, and your former spouse worked.",
                        minAge: {
                            months: 0,
                            years: 62,
                        },
                    },
                ],
            },
            {
                id: 'RS.00207.001',
                label: name,
                name: 'Widowers',
                requirements: [
                    {
                        answers: {
                            I: [2],
                            O: [0],
                            P: [0], // Deceased spouse worked
                        },
                        explanation: "You're 60 or older and lost your spouse.  And, your spouse worked before they passed away.",
                        minAge: {
                            months: 0,
                            years: 60,
                        },
                    },
                ],
            },
            {
                id: 'RS.00207.001',
                label: name,
                name: 'Disabled Widowers',
                requirements: [
                    {
                        answers: {
                            G: [0],
                            I: [2],
                            O: [0],
                            P: [0], // Deceased spouse worked
                        },
                        explanation: "You're between the ages of 50 and 60 and lost your spouse. And, you expect a condition, illness, or injury to affect your ability to work for a year or more.",
                        maxAge: {
                            months: 11,
                            years: 59,
                        },
                        minAge: {
                            months: 0,
                            years: 50,
                        },
                    },
                ],
            },
            {
                id: 'RS.00210.001',
                label: name,
                name: 'Lump Sum Death Payment, a one-time payment',
                requirements: [
                    {
                        answers: {
                            A: [1],
                            Y: [0], // Child has experienced loss of parent
                        },
                        explanation: 'The child lost a parent.',
                    },
                    {
                        answers: {
                            O: [0],
                            P: [0], // Deceased spouse worked
                        },
                        explanation: 'You lost your spouse.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            S: [0], // Has lost a parent
                        },
                        explanation: 'You lost a parent.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'RS.00203.001',
                label: name,
                name: "Child's Auxiliary",
                requirements: [
                    {
                        answers: {
                            A: [1],
                            AA: [
                                0,
                                2, // Unknown if parents receive SS
                            ],
                        },
                        explanation: "The child's parent(s) may get benefits checks every month.",
                    },
                    {
                        answers: {
                            C: [1],
                            U: [
                                0,
                                2, // Unknown if parents receive SS
                            ],
                        },
                        explanation: 'You go to high school full time and your parent(s) may get benefits checks every month.',
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            G: [0],
                            H: [0],
                            U: [
                                0,
                                2, // Unknown if parents receive SS
                            ],
                        },
                        explanation: 'You expect a condition, illness, or injury to affect your ability to work for a year or more. And it started to affect you before your 22nd birthday. Your parent(s) may get benefits checks every month.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'RS.00203.001',
                label: name,
                name: "Child's Survivor",
                requirements: [
                    {
                        answers: {
                            C: [1],
                            S: [0], // Has lost a parent
                        },
                        explanation: 'The child lost a parent.',
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                    {
                        answers: {
                            A: [1],
                            Y: [0], // Child has experienced loss of parent
                        },
                        explanation: 'The child lost a parent.',
                    },
                    {
                        answers: {
                            G: [0],
                            H: [0],
                            S: [0], // Has lost a parent
                        },
                        explanation: 'You expect a condition, illness, or injury to affect your ability to work for a year or more. And it started to affect you before your 22nd birthday. You also lost a parent.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'DI.10115.001',
                label: name,
                name: 'Childhood Disability',
                requirements: [
                    {
                        answers: {
                            A: [1],
                            X: [0], // Child is disabled
                        },
                        explanation: "A condition or illness is expected to significantly affect the child's daily activities for a year or more.",
                    },
                ],
            },
            {
                id: 'RS.00205.001',
                label: name,
                name: 'Student Auxiliary',
                requirements: [
                    {
                        answers: {
                            C: [1],
                            U: [
                                0,
                                2, // Unknown if parents receive SS
                            ],
                        },
                        explanation: 'You go to high school full time and your parent(s) may get benefits checks every month.',
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'RS.00205.001',
                label: name,
                name: 'Student Survivor',
                requirements: [
                    {
                        answers: {
                            C: [1],
                            S: [0], // Has lost a parent
                        },
                        explanation: 'You go to high school full time and lost a parent.',
                        maxAge: {
                            months: 1,
                            years: 19,
                        },
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
            {
                id: 'RS.00208.001',
                label: name,
                name: "Mothers and Father's",
                requirements: [
                    {
                        answers: {
                            P: [0],
                            Q: [0], // Has children < 16
                        },
                        explanation: 'You lost your spouse and they worked before they passed away. And, you take care of disabled kids over the age of 16.',
                        minAge: {
                            months: 0,
                            years: 18,
                        },
                    },
                ],
            },
        ];
    });
    define("flows/complex/data/sections.flow", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.sections = void 0;
        exports.sections = [
            {
                id: 'introduction',
                name: 'Introduction',
                requirements: [
                    {
                        answers: {
                            A: [0, 1], // All
                        },
                    },
                ],
            },
            {
                id: 'a0_work',
                name: 'Work',
                requirements: [
                    {
                        answers: {
                            A: [0], // Only for adults
                        },
                    },
                ],
            },
            {
                id: 'a0_family',
                name: 'Family',
                requirements: [
                    {
                        answers: {
                            A: [0], // Adults
                        },
                    },
                ],
            },
            {
                id: 'a0_finances',
                name: 'Finances',
                requirements: [
                    {
                        answers: {
                            A: [0], // Only for adults
                        },
                    },
                ],
            },
            {
                id: 'a1_disability',
                name: 'Disability',
                requirements: [
                    {
                        answers: {
                            A: [1], // < 18
                        },
                    },
                ],
            },
            {
                id: 'a1_family',
                name: 'Family',
                requirements: [
                    {
                        answers: {
                            A: [1], // < 18
                        },
                    },
                ],
            },
            {
                id: 'results',
                name: 'Results',
                requirements: [
                    {
                        answers: {
                            A: [0, 1], // All ages
                        },
                    },
                ],
            },
        ];
    });
    define("flows/complex/data/index", ["require", "exports", "flows/complex/data/actions.flow", "flows/complex/data/calculator.flow", "flows/complex/data/pages.flow", "flows/complex/data/questions.flow", "flows/complex/data/results.flow", "flows/complex/data/sections.flow"], function (require, exports, actions_flow_1, calculator_flow_3, pages_flow_1, questions_flow_1, results_flow_1, sections_flow_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(actions_flow_1, exports);
        __exportStar(calculator_flow_3, exports);
        __exportStar(pages_flow_1, exports);
        __exportStar(questions_flow_1, exports);
        __exportStar(results_flow_1, exports);
        __exportStar(sections_flow_1, exports);
    });
    define("flows/complex/complex.flow", ["require", "exports", "survey/Questionnaire", "flows/complex/data/index"], function (require, exports, Questionnaire_2, data_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.complexFlow = void 0;
        var header = 'Complex Eligibility Survey';
        exports.complexFlow = new Questionnaire_2.Questionnaire({
            actions: data_1.actions,
            header: header,
            pages: data_1.pages,
            questions: data_1.questions,
            results: data_1.results,
            sections: data_1.sections,
        });
    });
    define("flows/index", ["require", "exports", "flows/complex/complex.flow"], function (require, exports, complex_flow_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(complex_flow_1, exports);
    });
    define("flows/simple/data/actions.flow", ["require", "exports", "lib/enums"], function (require, exports, enums_15) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.actions = void 0;
        exports.actions = [
            {
                action: '<a href="#">Restart survey</a>',
                description: 'Try our survey again to see what other badges you can earn.',
                name: 'Try Again',
                title: 'Try Again',
                type: enums_15.ACTION.ONLINE,
            },
        ];
    });
    define("flows/simple/data/pages.flow", ["require", "exports", "lib/index"], function (require, exports, lib_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.pages = void 0;
        exports.pages = {
            landingPage: {
                body: 'Complete this series of questions to earn badges!',
                buttons: {
                    next: {
                        label: 'Begin',
                    },
                },
                id: lib_4.PAGE_TYPE.LANDING,
                sectionId: lib_4.PAGE_TYPE.LANDING,
                subTitle: 'This is a simple survey',
                title: 'Welcome',
                type: lib_4.PAGE_TYPE.LANDING,
            },
            noResultsPage: {
                footer: 'While you can try again, we cannot guarantee you\'ll get a badge.',
                id: lib_4.PAGE_TYPE.NO_RESULTS,
                sectionId: 'results',
                subTitle: 'Try again to earn some.',
                title: 'You earned no badges.',
                type: lib_4.PAGE_TYPE.NO_RESULTS,
            },
            resultsPage: {
                id: lib_4.PAGE_TYPE.RESULTS,
                info: 'Each badge has an official name. You may see these names referenced in other resources online.',
                sectionId: 'results',
                title: 'You have earned these badges.',
                type: lib_4.PAGE_TYPE.RESULTS,
            },
            summaryPage: {
                buttons: {
                    next: {
                        label: 'See your results',
                    },
                },
                id: lib_4.PAGE_TYPE.SUMMARY,
                sectionId: 'results',
                subTitle: 'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
                title: 'Review your answers',
                type: lib_4.PAGE_TYPE.SUMMARY,
            },
        };
    });
    define("flows/simple/data/questions.flow", ["require", "exports", "lib/enums"], function (require, exports, enums_16) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.questions = void 0;
        /**
         * All of the questions, their answers and dependencies
         */
        exports.questions = [
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'A',
                internalNotes: 'everone',
                sectionId: 'introduction',
                subTitle: 'Surveys, questionnaires, slides, decks, polls--they\'re all linear questions/statements.',
                title: 'Do you like surveys?',
                type: enums_16.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'B',
                internalNotes: 'users who don\'t like surveys',
                requirements: [
                    {
                        answers: {
                            A: [1], // no
                        },
                    },
                ],
                sectionId: 'confirmation',
                subTitle: 'Surveys can be important tools to help guide user interactions.',
                title: 'Are you sure you don\'t like surveys?',
                type: enums_16.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'C',
                internalNotes: 'users who do like surveys',
                requirements: [
                    {
                        answers: {
                            A: [0],
                        },
                    },
                ],
                sectionId: 'confirmation',
                subTitle: 'Surveys can be wastes of time. Do you honestly like them?',
                title: 'Are you sure you like surveys?',
                type: enums_16.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
            {
                answers: {
                    0: 'Yes',
                    1: 'No',
                },
                id: 'D',
                internalNotes: 'users who do like surveys',
                requirements: [
                    {
                        answers: {
                            C: [0, 1],
                        },
                    },
                    {
                        answers: {
                            B: [0, 1],
                        },
                    },
                ],
                sectionId: 'satisfaction',
                subTitle: 'Given the chance to do it all over, wouldn\'t you like to try?',
                title: 'Would you take this survey again?',
                type: enums_16.QUESTION_TYPE.MULTIPLE_CHOICE,
            },
        ];
    });
    define("flows/simple/data/results.flow", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.results = void 0;
        var name = 'Badge name';
        /**
         * All possible results with their requirements
         */
        exports.results = [
            {
                id: '1',
                label: name,
                name: 'Participation Badge',
                requirements: [
                    {
                        answers: {
                            A: [1, 0], // Answered a question
                        },
                        explanation: 'You completed our survey.',
                    },
                ],
            },
            {
                id: '2',
                label: name,
                name: 'Confused Choices Badge',
                requirements: [
                    {
                        answers: {
                            A: [0],
                            C: [1], // does not like surveys
                        },
                        explanation: 'You changed your mind from liking surveys to disliking them.',
                    },
                    {
                        answers: {
                            A: [1],
                            B: [0], // likes surveys
                        },
                        explanation: 'You changed your mind from not liking surveys to liking them.',
                    },
                ],
            },
            {
                id: '3',
                label: name,
                name: 'Daredevil Badge',
                requirements: [
                    {
                        answers: {
                            D: [
                                0, // Would do it all over
                            ],
                        },
                        explanation: 'You have the guts to put it all on the line again.',
                    },
                ],
            },
        ];
    });
    define("flows/simple/data/sections.flow", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.sections = void 0;
        exports.sections = [
            {
                id: 'introduction',
                name: 'Introduction',
                requirements: [{
                        answers: {
                            A: [0, 1],
                        },
                    }],
            },
            {
                id: 'confirmation',
                name: 'Confirmation',
                requirements: [{
                        answers: {
                            A: [0, 1],
                        },
                    }],
            },
            {
                id: 'satisfaction',
                name: 'Satisfaction',
                requirements: [{
                        answers: {
                            A: [0, 1],
                        },
                    }],
            },
        ];
    });
    define("flows/simple/data/index", ["require", "exports", "flows/simple/data/actions.flow", "flows/simple/data/pages.flow", "flows/simple/data/questions.flow", "flows/simple/data/results.flow", "flows/simple/data/sections.flow"], function (require, exports, actions_flow_2, pages_flow_2, questions_flow_2, results_flow_2, sections_flow_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(actions_flow_2, exports);
        __exportStar(pages_flow_2, exports);
        __exportStar(questions_flow_2, exports);
        __exportStar(results_flow_2, exports);
        __exportStar(sections_flow_2, exports);
    });
    define("flows/simple/simple.flow", ["require", "exports", "survey/Questionnaire", "flows/simple/data/index"], function (require, exports, Questionnaire_3, data_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.simpleFlow = void 0;
        var header = 'Simple Eligibility Survey';
        exports.simpleFlow = new Questionnaire_3.Questionnaire({
            actions: data_2.actions,
            header: header,
            pages: data_2.pages,
            questions: data_2.questions,
            results: data_2.results,
            sections: data_2.sections,
        });
    });
    define("state/index", ["require", "exports", "state/stepReducer"], function (require, exports, stepReducer_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(stepReducer_2, exports);
    });
    define("styles/index", ["require", "exports", "./index.css"], function (require, exports, index_css_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(index_css_1, exports);
    });
    //# sourceMappingURL=index.js.map
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();