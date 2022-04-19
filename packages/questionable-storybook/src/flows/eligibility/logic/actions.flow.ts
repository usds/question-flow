/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { merge }                    from 'lodash';
import { ACTION_TYPE, IAction, IButton } from '@usds.gov/questionable-react-component';
import { TActionMap }               from '../lib/contentMap';

const online = {
  id:   'ab1',
  type: 'button',
} as IButton;

export const buildActions = (json: TActionMap): IAction[] => [
  merge(
    {
      buttons: [online],
      icon:    '',
      id:      'a0',
      type:    ACTION_TYPE.ONLINE,
    },
    json.a0,
  ) as IAction,
  merge(
    {
      buttons: [],
      icon:    '',
      id:      'a3',
      type:    ACTION_TYPE.NONE,
    },
    json.a3,
  ) as IAction,
];
