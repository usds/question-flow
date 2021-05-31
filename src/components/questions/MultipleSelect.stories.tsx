/* eslint-disable max-len */
/*
  eslint-disable import/no-extraneous-dependencies
*/
import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '../../styles';

import { Story, Meta }           from '@storybook/react';
import { Answer, IQuestionData } from '../../survey';
import { MultipleSelect }        from './MultiSelect';
import { QUESTION_TYPE }         from '../../lib';
import { stepReducer }           from '../../state';

export default {
  argTypes: {
    step: { control: { type: 'object' } },
  },
  component: MultipleSelect,
  title:     'Questions/MultipleSelect',
} as Meta;

const Template: Story<IQuestionData> = (args) => <MultipleSelect {...args} />;

export const Checklist = Template.bind({});
Checklist.args = {
  dispatchForm: stepReducer,
  form:         new Answer(),
  step:         {
    answers: {
      0: 'Hamburgers',
      1: 'Tacos',
      2: 'Salads',
      3: 'Nacho cheese fountains',
    },
    id:            'I',
    info:          "You may be eligible for certain benefits if you're legally married now or were in the past.",
    internalNotes: 'Adults age 18 and over',
    requirements:  [],
    sectionId:     'a0_family',
    subTitle:      'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    title:         'What foods do you like?',
    type:          QUESTION_TYPE.MULTIPLE_SELECT,
  },
  stepId: 'B',
};
