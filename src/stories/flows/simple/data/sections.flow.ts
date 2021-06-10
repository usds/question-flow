import { ISection } from '../../../../survey/ISection';

export const sections: ISection[] = [
  {
    id:           'introduction',
    name:         'Introduction',
    requirements: [{
      answers: {
        A: [0, 1],
      },
    }],
  },
  {
    id:           'confirmation',
    name:         'Confirmation',
    requirements: [{
      answers: {
        A: [0, 1],
      },
    }],
  },
  {
    id:           'satisfaction',
    name:         'Satisfaction',
    requirements: [{
      answers: {
        A: [0, 1],
      },
    }],
  },
];
