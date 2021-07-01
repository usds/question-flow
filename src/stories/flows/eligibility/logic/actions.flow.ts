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

const phone = {
  id:   'ab2',
  type: 'link',
} as IButton;

const phoneTty = {
  id:   'ab3',
  type: 'link',
} as IButton;

export const buildActions = (json: TActionMap): IAction[] => [
  merge(
    {
      buttons: [online],
      icon:    'fas fa-desktop',
      id:      'a0',
      type:    ACTION.ONLINE,
    },
    json.a0,
  ) as IAction,
  merge(
    {
      buttons: [phone, phoneTty],
      icon:    'fas fa-phone fa-flip-horizontal',
      id:      'a1',
      type:    ACTION.CALL,
    },
    json.a1,
  ) as IAction,
  merge(
    {
      buttons: [online, phone, phoneTty],
      icon:    'fas fa-phone fa-flip-horizontal',
      id:      'a2',
      type:    ACTION.HYBRID,
    },
    json.a2,
  ) as IAction,
  merge(
    {
      buttons: [online, phone, phoneTty],
      icon:    'fas fa-phone fa-flip-horizontal',
      id:      'a3',
      type:    ACTION.NONE,
    },
    json.a3,
  ) as IAction,
];
