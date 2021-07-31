/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION }  from '../../../../lib/enums';
import { IAction } from '../../../../survey/IAction';

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
    type:     ACTION.ONLINE,
  },
];
