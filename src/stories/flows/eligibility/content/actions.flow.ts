/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IButton }    from '../../../../survey';
import { TActionMap } from '../lib/contentMap';

const online: Partial<IButton> = {
  id:    'ab1',
  link:  'https://www.ssa.gov',
  title: 'Start Application',
};

const phone: Partial<IButton> = {
  id:    'ab2',
  link:  'tel:+18007721213',
  title: '1-800-772-1213',
  type:  'link',
};

const phoneTty: Partial<IButton> = {
  id:    'ab3',
  link:  'tel:+18003250778',
  title: 'TTY 1-800-325-0778',
  type:  'link',
};

export const actionContentMap: TActionMap = {
  a0: {
    buttons:  [online],
    id:       'a0',
    label:    'How to apply',
    subTitle:
      "First, enter your personal information to start an application online. Then, we'll call you to get more details and complete your application over the phone.",
    title: 'Start an application online and complete it by phone',
  },
  a1: {
    buttons:  [phone, phoneTty],
    id:       'a1',
    label:    'How to apply',
    subTitle:
      "Call us to schedule an appointment. When it's time for your appointment, we'll call you and complete your application over the phone.",
    title: 'Complete an application by phone',
  },
  a2: {
    buttons:  [online, phone, phoneTty],
    id:       'a2',
    label:    'How to apply',
    subTitle:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    title: 'Start online, then schedule an appointment by phone',
  },
  a3: {
    buttons: [online, phone, phoneTty],
    id:      'a3',
    label:   'How to apply',
    title:
      'Call us if you have questions or think you may be eligible for benefits',
  },
};
