/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResultCore } from '@usds.gov/questionable-core';

const name = 'Completed';

/**
 * All possible results with their requirements
 */
export const results: IResultCore[] = [
  {
    action:       { id: '0' },
    id:           '1',
    label:        name,
    requirements: [
      {
        explanation:
          'Scaffolding complete',

        responses: [
          {
            answers:  [{ id: '1' }, { id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Completed Tasks',
  },
];
