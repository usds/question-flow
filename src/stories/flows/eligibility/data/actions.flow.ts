/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION }  from '../../../../lib';
import { IAction } from '../../../../survey';

export const actions: IAction[] = [
  {
    action:  'Start an application online and complete it by phone',
    buttons: [
      {
        label: 'Start Application',
        link:  'https://www.ssa.gov',
        mode:  'button',
      },
    ],
    id:       '0',
    subTitle:
      'First, enter your personal information to start an application online. Then, we\'ll call you to get more details and complete your application over the phone.',
    title: 'How to apply',
    type:  ACTION.ONLINE,
  },
  {
    action:  'Complete an application by phone',
    buttons: [
      {
        label: '1-800-772-1213',
        link:  'tel:+18007721213',
        mode:  'link',
      },
      {
        label: 'TTY 1-800-325-0778',
        link:  'tel:+18003250778',
        mode:  'link',
      },
    ],
    id:       '1',
    subTitle:
      "Call us to schedule an appointment. When it's time for your appointment, we'll call you and complete your application over the phone.",
    title: 'How to apply',
    type:  ACTION.CALL,
  },
  {
    action:  'Start online, then schedule an appointment by phone',
    buttons: [
      {
        label: 'Start Application',
        link:  'https://www.ssa.gov',
        mode:  'button',
      },
      {
        label: '1-800-772-1213',
        link:  'tel:+18007721213',
        mode:  'link',
      },
      {
        label: 'TTY 1-800-325-0778',
        link:  'tel:+18003250778',
        mode:  'link',
      },
    ],
    id:       '2',
    subTitle:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    title: 'How to apply',
    type:  ACTION.HYBRID,
  },
];
