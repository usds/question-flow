"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
var enums_1 = require("../../../lib/enums");
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
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
        type: enums_1.QUESTION_TYPE.MULTIPLE_CHOICE,
    },
];
//# sourceMappingURL=questions.flow.js.map