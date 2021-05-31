/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResult } from '../../../survey/IResult';

const name = 'Badge name';

/**
 * All possible results with their requirements
 */
export const results: IResult[] = [
  {
    id:           '1',
    label:        name,
    name:         'Participation Badge',
    requirements: [
      {
        answers: {
          A: [1, 0], // Answered a question
        },
        explanation:
          'You completed our survey.',
      },
    ],
  },
  {
    id:    '2',
    label: name,
    name:
      'Confused Choices Badge',
    requirements: [
      {
        answers: {
          A: [0], // likes surveys,
          C: [1], // does not like surveys
        },
        explanation:
          'You changed your mind from liking surveys to disliking them.',
      },
      {
        answers: {
          A: [1], // does not like surveys,
          B: [0], // likes surveys
        },
        explanation:
          'You changed your mind from not liking surveys to liking them.',
      },
    ],
  },
  {
    id:           '3',
    label:        name,
    name:         'Daredevil Badge',
    requirements: [
      {
        answers: {
          D: [
            0, // Would do it all over
          ],
        },
        explanation:
          'You have the guts to put it all on the line again.',
      },
    ],
  },
];
