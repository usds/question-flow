/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { merge }                    from 'lodash';
import { ACTION, IAction, IButton } from '@usds.gov/questionable';
import { TActionMap }               from '../lib/contentMap';

const online = {
  id:   'ab1',
  type: 'button',
} as IButton;

export const buildActions = (json: TActionMap): IAction[] => {
  const first  = merge(
    {
      buttons: [online],
      icon:    '',
      id:      'a0',
      type:    ACTION.ONLINE,
    },
    json.a0,
  ) as IAction;
  const second = merge(
    {
      buttons: [],
      icon:    '',
      id:      'a3',
      type:    ACTION.NONE,
    },
    json.a3,
  ) as IAction;

  /**
   * Added for Medalia testing
   */
  const { drupalSettings } = window || {};
  let linkAddOn            = '';
  if (drupalSettings?.component?.eligibility?.survey === 1) {
    linkAddOn = '?clickedApply=1';
  }
  first.buttons[0].link += linkAddOn;

  return ([
    first,
    second,
  ]);
};
