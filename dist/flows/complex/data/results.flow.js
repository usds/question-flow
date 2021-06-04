"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.results = void 0;
var calculator_flow_1 = require("./calculator.flow");
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
                ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday, 12); },
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
                ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday); },
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
                ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday); },
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
                ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday); },
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
                ageCalc: function (birthday) { return !calculator_flow_1.isFraCalculator(birthday); },
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
//# sourceMappingURL=results.flow.js.map