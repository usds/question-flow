import { ISection } from '@usds.gov/questionable-react-component';

export const sections: ISection[] = [
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
  {
    id:           'satisfaction',
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
    title: 'Satisfaction',
  },
];
