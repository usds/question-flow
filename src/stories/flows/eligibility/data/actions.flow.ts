/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION }  from '../../../../lib';
import { IAction } from '../../../../survey';

export const actions: IAction[] = [
  {
    buttons: [
      {
        label: 'Start Application',
        link:  'https://www.ssa.gov',
        mode:  'button',
      },
    ],
    icon:     'fas fa-desktop',
    id:       '0',
    label:    'How to apply',
    subTitle:
      'First, enter your personal information to start an application online. Then, we\'ll call you to get more details and complete your application over the phone.',
    title: 'Start an application online and complete it by phone',
    type:  ACTION.ONLINE,
  },
  {
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
    icon:     'fas fa-phone fa-flip-horizontal',
    id:       '1',
    label:    'How to apply',
    subTitle:
      "Call us to schedule an appointment. When it's time for your appointment, we'll call you and complete your application over the phone.",
    title: 'Complete an application by phone',
    type:  ACTION.CALL,
  },
  {
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
    icon:     'fas fa-phone fa-flip-horizontal',
    id:       '2',
    label:    'How to apply',
    subTitle:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    title: 'Start online, then schedule an appointment by phone',
    type:  ACTION.HYBRID,
  },
  {
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
    icon:     'fas fa-phone fa-flip-horizontal',
    id:       '2',
    label:    'How to apply',
    subTitle:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    title: '',
    type:  ACTION.NONE,
  },
];
