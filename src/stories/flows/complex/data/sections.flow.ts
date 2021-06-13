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
        explanation: '18 or older',
        responses:   [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
  },
  {
    id:           'a0_family',
    name:         'Family',
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
  },
  {
    id:           'a0_finances',
    name:         'Finances',
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
  },
  {
    id:           'a1_disability',
    name:         'Disability',
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
  },
  {
    id:           'a1_family',
    name:         'Family',
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
  },
  {
    id:           'results',
    name:         'Results',
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
  },
];
