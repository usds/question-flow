"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
var enums_1 = require("../../../lib/enums");
exports.actions = [
    {
        action: '<a href="#">Start application</a>',
        description: 'Answer more questions and upload documents to apply for the benefits you may be eligible for.',
        name: 'Apply Online',
        title: 'How to apply',
        type: enums_1.ACTION.ONLINE,
    },
    {
        action: 'Call <a href="#">1-800-772-1213</a> to schedule an appointment',
        description: "Call us to schedule an appointment to apply for the benefits you may be eligible for. When it's time for your appointment, we'll call you to complete your application over the phone.",
        name: 'Technician Assisted',
        title: 'How to apply',
        type: enums_1.ACTION.CALL,
    },
    {
        action: '<a href="#">Start application</a>',
        description: "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
        name: 'Apply Online & Technician Assisted',
        title: 'How to apply',
        type: enums_1.ACTION.HYBRID,
    },
];
//# sourceMappingURL=actions.flow.js.map