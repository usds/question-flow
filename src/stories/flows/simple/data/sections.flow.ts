import { ISection } from '../../../../survey/ISection';

export const sections: ISection[] = [
  {
    id:           'introduction',
    name:         'Introduction',
    requirements: [],
  },
  {
    id:           'confirmation',
    name:         'Confirmation',
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
  },
  {
    id:           'satisfaction',
    name:         'Satisfaction',
    requirements: [
      {
        responses: [
          {
            answers:  [{ id: '0' }, { id: '1' }],
            question: { id: 'A' },
          },
        ],
      },
    ],
  },
];
