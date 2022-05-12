/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION_TYPE, IAction } from '@usds.gov/questionable-react-component';

export const actions: IAction[] = [
  {
    buttons: [
      {
        id:    'b1',
        title: 'Start Over',
        type:  'button',
      },
    ],
    id:       '0',
    label:    'Restart survey',
    subTitle: 'Try our survey again to see what other badges you can earn.',
    title:    'Try Again',
    type:     ACTION_TYPE.ONLINE,
  },
];
