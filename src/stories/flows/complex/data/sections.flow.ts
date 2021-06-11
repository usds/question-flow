import { ISection } from '../../../../survey/ISection';

export const sections: ISection[] = [
  {
    id:           'introduction',
    name:         'Introduction',
    requirements: [
      {
        answers: {
          A: [0, 1], // All
        },
      },
    ],
  },
  {
    id:           'a0_work',
    name:         'Work',
    requirements: [
      {
        answers: {
          A: [0], // Only for adults
        },
      },
    ],
  },
  {
    id:           'a0_family',
    name:         'Family',
    requirements: [
      {
        answers: {
          A: [0], // Adults
        },
      },
    ],
  },
  {
    id:           'a0_finances',
    name:         'Finances',
    requirements: [
      {
        answers: {
          A: [0], // Only for adults
        },
      },
    ],
  },
  {
    id:           'a1_disability',
    name:         'Disability',
    requirements: [
      {
        answers: {
          A: [1], // < 18
        },
      },
    ],
  },
  {
    id:           'a1_family',
    name:         'Family',
    requirements: [
      {
        answers: {
          A: [1], // < 18
        },
      },
    ],
  },
  {
    id:           'results',
    name:         'Results',
    requirements: [
      {
        answers: {
          A: [0, 1], // All ages
        },
      },
    ],
  },
];
