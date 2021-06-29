/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION }  from '../../../../lib/enums';
import { IAction } from '../../../../survey/IAction';

export const actions: IAction[] = [
  {
    action:      '<a href="#">Restart survey</a>',
    subTitle: 'Try our survey again to see what other badges you can earn.',
    name:        'Try Again',
    title:       'Try Again',
    type:        ACTION.ONLINE,
  },
];
