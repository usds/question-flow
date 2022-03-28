import {
  DateOfBirth, Form, IQuestionData, stepReducer,
} from '@usds.gov/questionable-react-component';
import { QUESTION_TYPE } from '@usds.gov/questionable-core';
import { Meta, Story }   from '@storybook/react';
import '../styles';
/* eslint-disable max-len,
    import/no-extraneous-dependencies
*/

export default {
  argTypes: {
    step: { control: { type: 'object' } },
  },
  component: DateOfBirth,
  title:     'Questions/DateOfBirth',
} as Meta;

const Template: Story<IQuestionData> = (args) => <DateOfBirth {...args} />;

export const DoB = Template.bind({});
DoB.args = {
  dispatchForm: stepReducer,
  form:         new Form(),
  step:         {
    answers:           [],
    entryRequirements: [],
    id:                'B',
    internalNotes:     'Adults age 18 and over',
    section:           { id: 'introduction' },
    subTitle:
      "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
    title: 'Enter your birthday.',
    type:  QUESTION_TYPE.DOB,
  },
  stepId: 'B',
};
