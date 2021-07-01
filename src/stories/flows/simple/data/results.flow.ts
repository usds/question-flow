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
    action:       { id: '0' },
    id:           '1',
    label:        name,
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
    title: 'Participation Badge',
  },
  {
    action:       { id: '0' },
    id:           '2',
    label:        name,
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
    title:
      'Confused Choices Badge',
  },
  {
    action:       { id: '0' },
    id:           '3',
    label:        name,
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
    title: 'Daredevil Badge',
  },
];
