"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
var enums_1 = require("../../../lib/enums");
var calculator_flow_1 = require("./calculator.flow");
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.DOB,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
    },
];
//# sourceMappingURL=questions.flow.js.map