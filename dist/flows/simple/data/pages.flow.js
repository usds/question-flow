"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
/* eslint-disable max-len */
var lib_1 = require("../../../lib");
exports.pages = {
    landingPage: {
        body: 'Complete this series of questions to earn badges!',
        buttons: {
            next: {
                label: 'Begin',
            },
        },
        id: lib_1.PAGE_TYPE.LANDING,
        sectionId: lib_1.PAGE_TYPE.LANDING,
        subTitle: 'This is a simple survey',
        title: 'Welcome',
        type: lib_1.PAGE_TYPE.LANDING,
    },
    noResultsPage: {
        footer: 'While you can try again, we cannot guarantee you\'ll get a badge.',
        id: lib_1.PAGE_TYPE.NO_RESULTS,
        sectionId: 'results',
        subTitle: 'Try again to earn some.',
        title: 'You earned no badges.',
        type: lib_1.PAGE_TYPE.NO_RESULTS,
    },
    resultsPage: {
        id: lib_1.PAGE_TYPE.RESULTS,
        info: 'Each badge has an official name. You may see these names referenced in other resources online.',
        sectionId: 'results',
        title: 'You have earned these badges.',
        type: lib_1.PAGE_TYPE.RESULTS,
    },
    summaryPage: {
        buttons: {
            next: {
                label: 'See your results',
            },
        },
        id: lib_1.PAGE_TYPE.SUMMARY,
        sectionId: 'results',
        subTitle: 'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
        title: 'Review your answers',
        type: lib_1.PAGE_TYPE.SUMMARY,
    },
};
//# sourceMappingURL=pages.flow.js.map