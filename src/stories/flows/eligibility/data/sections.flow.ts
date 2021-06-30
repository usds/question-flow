/* eslint-disable sonarjs/no-duplicate-string  */
import { ISection } from '../../../../survey';

export const sections: ISection[] = [
  {
    id:           'introduction',
    requirements: [{
      explanation: 'Answered the first question',
      responses:   [
        {
          answers:  [{ id: '0' }, { id: '1' }],
          question: { id: 'A' },
        },
      ],
    }],
    title: 'Introduction',
  },
  {
    id:           'a0_work',
    requirements: [
      {
        explanation: '18 or older',
        responses:   [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Work',
  },
  {
    id:           'a0_family',
    requirements: [
      {
        explanation: '18 or older',
        responses:   [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Family',
  },
  {
    id:           'a0_finances',
    requirements: [
      {
        explanation: '18 or older',
        responses:   [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Finances',
  },
  {
    id:           'a1_disability',
    requirements: [
      {
        explanation: 'Is younger than 18',
        responses:   [
          {
            answers:  [{ id: '1' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Disability',
  },
  {
    id:           'a1_family',
    requirements: [
      {
        explanation: 'Is younger than 18',
        responses:   [
          {
            answers:  [{ id: '1' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Family',
  },
  {
    id:           'results',
    requirements: [
      {
        explanation: 'Has answered the age question',
        responses:   [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
    title: 'Results',
  },
];
