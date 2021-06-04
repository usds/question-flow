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
//# sourceMappingURL=results.flow.js.map