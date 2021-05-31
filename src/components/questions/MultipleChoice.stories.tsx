/*
  eslint-disable import/no-extraneous-dependencies
*/
import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '../../styles';

import { Story, Meta }    from '@storybook/react';
import { IQuestionData }  from '../../survey';
import { MultipleChoice } from './MultipleChoice';
import { QUESTION_TYPE }  from '../../lib';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: MultipleChoice,
  title:     'Questions/MultipleChoice',
} as Meta;

const Template: Story<IQuestionData> = (args) => <MultipleChoice {...args} />;

export const DoB = Template.bind({});
DoB.args = {
  step: {
    answers: {
      0: 'Yes',
      1: "Yes, but I'm separated from my spouse.",
      2: 'No, but I was in the past.',
      3: "No, I've never been married.",
    },
    id:            'I',
    info:          "You may be eligible for certain benefits if you're legally married now or were in the past.",
    internalNotes: 'Adults age 18 and over',
    requirements:  [],
    sectionId:     'a0_family',
    subTitle:      'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    title:         'Are you married?',
    type:          QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  stepId: 'B',
};
