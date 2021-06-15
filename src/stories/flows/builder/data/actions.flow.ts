/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION }  from '../../../../lib/enums';
import { IAction } from '../../../../survey/IAction';
import { SurveyBuilder } from '../../../../composable/SurveyBuilder';
import { Action } from 'src/composable/lib/Action';


export const actions: IAction[] = [
  {
    action:      '<a href="#">Start application</a>',
    description:
      'Answer more questions and upload documents to apply for the benefits you may be eligible for.',
    name:  'Apply Online',
    title: 'How to apply',
    type:  ACTION.ONLINE,
  },
  {
    action:      'Call <a href="#">1-800-772-1213</a> to schedule an appointment',
    description:
      "Call us to schedule an appointment to apply for the benefits you may be eligible for. When it's time for your appointment, we'll call you to complete your application over the phone.",
    name:  'Technician Assisted',
    title: 'How to apply',
    type:  ACTION.CALL,
  },
  {
    action:      '<a href="#">Start application</a>',
    description:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    name:  'Apply Online & Technician Assisted',
    title: 'How to apply',
    type:  ACTION.HYBRID,
  },
];

export type TActions = {
  online: Action;
  call: Action;
  hybrid: Action;
}

export const buildActions = (builder: SurveyBuilder): TActions => {
  const online = builder.
}