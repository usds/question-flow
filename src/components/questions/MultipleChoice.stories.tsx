/* eslint-disable max-len */
/*
  eslint-disable import/no-extraneous-dependencies
*/
import { Meta, Story } from '@storybook/react';
import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import { QUESTION_TYPE } from '../../lib';
import { Answer } from '../../state/Answer';
import { stepReducer } from '../../state/stepReducer';
import '../../styles';
import { IQuestionData } from '../../survey/IStepData';
import { MultipleChoice } from './MultipleChoice';

export default {
  argTypes: {
    step: { control: { type: 'object' } },
  },
  component: MultipleChoice,
  title: 'Questions/MultipleChoice',
} as Meta;

const Template: Story<IQuestionData> = (args) => <MultipleChoice {...args} />;

export const Radiolist = Template.bind({});
Radiolist.args = {
  dispatchForm: stepReducer,
  form: new Answer(),
  step: {
    answers: {
      0: 'Yes',
      1: "Yes, but I'm separated from my spouse.",
      2: 'No, but I was in the past.',
      3: "No, I've never been married.",
    },
    id: 'I',
    info: "You may be eligible for certain benefits if you're legally married now or were in the past.",
    internalNotes: 'Adults age 18 and over',
    requirements: [],
    sectionId: 'a0_family',
    subTitle:
      'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    title: 'Are you married?',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  stepId: 'B',
};
