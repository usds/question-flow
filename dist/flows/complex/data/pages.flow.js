"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
/* eslint-disable max-len */
var lib_1 = require("../../../lib");
exports.pages = {
    landingPage: {
        body: 'To receive benefits, you have to meet certain requirements. We\'ll guide you through a series of questions to determine if you may be eligible.',
        buttons: {
            next: {
                label: 'Get Started',
            },
        },
        id: lib_1.PAGE_TYPE.LANDING,
        sectionId: lib_1.PAGE_TYPE.LANDING,
        title: 'Check eligibility for benefits',
        type: lib_1.PAGE_TYPE.LANDING,
    },
    noResultsPage: {
        footer: 'The information you shared today tells us about your current situation. In the future, you may become eligible for benefits as you age or things in your life change.',
        id: lib_1.PAGE_TYPE.NO_RESULTS,
        sectionId: 'results',
        subTitle: 'You can <a href="#">apply for benefits</a> but based on what you told us today, you may not be eligible at this time.',
        title: 'You may not be eligible for benefits.',
        type: lib_1.PAGE_TYPE.NO_RESULTS,
    },
    resultsPage: {
        body: "This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll analyze more details during the application process to provide a definite answer.\n<p/>\nThe information you shared today tells us about your current situation. In the future, you may become eligible for other benefits as you age or things in your life change.",
        bodyHeader: 'Benefits you may be eligible for',
        bodySubHeader: 'Here\'s what you may be eligible for and why',
        id: lib_1.PAGE_TYPE.RESULTS,
        info: 'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
        sectionId: 'results',
        title: 'You may be eligible for benefits.',
        type: lib_1.PAGE_TYPE.RESULTS,
    },
    summaryPage: {
        buttons: {
            next: {
                label: 'Submit',
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