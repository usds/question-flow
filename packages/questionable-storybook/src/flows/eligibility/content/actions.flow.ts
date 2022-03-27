/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IButton }    from '@usds.gov/questionable-react-component';
import { TActionMap } from '../lib/contentMap';

const online: Partial<IButton> = {
  id:    'ab1',
  link:  'https://www.ssa.gov',
  title: 'Learn How to Apply',
};

export const actionContentMap: TActionMap = {
  a0: {
    buttons: [online],
    id:      'a0',
    label:   '',
    title:   '',
  },
};
