import { ISectionCore } from '@usds.gov/questionable-core';

export const sections: ISectionCore[] = [
  {
    id:           'introduction',
    requirements: [],
    title:        'Introduction',
  },
  {
    id:           'confirmation',
    requirements: [
      {
        responses: [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'C' },
          },
        ],
      },
    ],
    title: 'Confirmation',
  },
];
