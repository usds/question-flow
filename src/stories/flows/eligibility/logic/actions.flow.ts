/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { merge }            from 'lodash';
import { ACTION }           from '../../../../lib';
import { IAction, IButton } from '../../../../survey';
import { TActionMap }       from '../lib/contentMap';

const online = {
  id:   'ab1',
  type: 'button',
} as IButton;

const noneOnline: Partial<IButton> = {
  id:    'ab1',
  link:  'https://www.ssa.gov',
  title: 'learn how to apply online',
  type:  'link',
};

const nonePhone: Partial<IButton> = {
  id:    'ab2',
  link:  'tel:+18007721213',
  title: '1-800-772-1213',
  type:  'link',
};

const nonePhoneTty: Partial<IButton> = {
  id:    'ab3',
  link:  'tel:+18003250778',
  title: 'TTY 1-800-325-0778',
  type:  'link',
};

export const buildActions = (json: TActionMap): IAction[] => [
  merge(
    {
      buttons: [online],
      icon:    '',
      id:      'a0',
      type:    ACTION.ONLINE,
    },
    json.a0,
  ) as IAction,
  merge(
    {
      buttons: [noneOnline, nonePhone, nonePhoneTty],
      icon:    '',
      id:      'a3',
      type:    ACTION.NONE,
    },
    json.a3,
  ) as IAction,
];
