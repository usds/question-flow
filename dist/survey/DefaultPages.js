"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PAGES = void 0;
var enums_1 = require("../lib/enums");
/**
 * Default landing step if none is defined
 */
var landingPage = {
    buttons: {
        next: {
            label: 'Get Started',
        },
    },
    id: enums_1.PAGE_TYPE.LANDING,
    sectionId: enums_1.PAGE_TYPE.LANDING,
    title: enums_1.PAGE_TYPE.LANDING,
    type: enums_1.PAGE_TYPE.LANDING,
};
/**
 * Default result step if none is defined
 */
var resultsPage = {
    id: enums_1.PAGE_TYPE.RESULTS,
    sectionId: enums_1.PAGE_TYPE.RESULTS,
    title: enums_1.PAGE_TYPE.RESULTS,
    type: enums_1.PAGE_TYPE.RESULTS,
};
/**
 * Default no results step if none is defined
 */
var noResultsPage = {
    id: enums_1.PAGE_TYPE.NO_RESULTS,
    sectionId: enums_1.PAGE_TYPE.RESULTS,
    title: enums_1.PAGE_TYPE.NO_RESULTS,
    type: enums_1.PAGE_TYPE.NO_RESULTS,
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
    id: enums_1.PAGE_TYPE.SUMMARY,
    sectionId: enums_1.PAGE_TYPE.RESULTS,
    title: enums_1.PAGE_TYPE.SUMMARY,
    type: enums_1.PAGE_TYPE.SUMMARY,
};
exports.DEFAULT_PAGES = {
    landingPage: landingPage,
    noResultsPage: noResultsPage,
    resultsPage: resultsPage,
    summaryPage: summaryPage,
};
//# sourceMappingURL=DefaultPages.js.map