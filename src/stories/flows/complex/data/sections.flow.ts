/* eslint-disable sonarjs/no-duplicate-string */
import { ISection } from '../../../../survey/ISection';

export const sections: ISection[] = [
  {
    id:           'introduction',
    name:         'Introduction',
    requirements: [],
  },
  {
    id:           'a0_work',
    name:         'Work',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: '18 or older',
      },
    ],
  },
  {
    id:           'a0_family',
    name:         'Family',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: '18 or older',
      },
    ],
  },
  {
    id:           'a0_finances',
    name:         'Finances',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: '18 or older',
      },
    ],
  },
  {
    id:           'a1_disability',
    name:         'Disability',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Is younger than 18',
      },
    ],
  },
  {
    id:           'a1_family',
    name:         'Family',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Is younger than 18',
      },
    ],
  },
  {
    id:           'results',
    name:         'Results',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Has answered the age question',
      },
    ],
  },
];
