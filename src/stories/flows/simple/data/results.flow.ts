/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResult } from '../../../../survey/IResult';

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
        // Answered a question
        explanation:
          'You completed our survey.',

        responses: [
          {
            answers:  [{ id: '1' }, { id: '0' }],
            question: { id: 'A' },
          },
        ],
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
        explanation:
          'You changed your mind from liking surveys to disliking them.',
        responses: [
          // likes surveys,
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
          // does not like surveys
          {
            answers:  [{ id: '1' }],
            question: { id: 'C' },
          },
        ],
      },
      {
        explanation:
          'You changed your mind from not liking surveys to liking them.',
        responses: [
          // does not like surveys,
          { answers: [{ id: '1' }], question: { id: 'A' } },
          // likes surveys
          { answers: [{ id: '0' }], question: { id: 'B' } },
        ],
      },
    ],
  },
  {
    id:           '3',
    label:        name,
    name:         'Daredevil Badge',
    requirements: [
      {
        explanation:
          'You have the guts to put it all on the line again.',
        responses: [
          // Would do it all over
          { answers: [{ id: '0' }], question: { id: 'D' } },
        ],
      },
    ],
  },
];