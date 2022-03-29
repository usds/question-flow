import { ACTION, IActionCore } from '@usds.gov/questionable-core';

export const actions: IActionCore[] = [
  {
    buttons: [
      {
        id:    'b1',
        title: 'Start Over',
        type:  'button',
      },
    ],
    id:    '0',
    label: 'Restart survey',
    title: 'Restart',
    type:  ACTION.NONE,
  },
];
