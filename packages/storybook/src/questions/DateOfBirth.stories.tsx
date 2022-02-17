import { DateOfBirth, Form, IQuestionData } from '@usds.gov/questionable';
import { Meta, Story } from '@storybook/react';
import { QUESTION_TYPE, stepReducer } from '@usds.gov/questionable';
import '../../styles';
/* eslint-disable max-len,
    import/no-extraneous-dependencies
*/

export default {
  argTypes: {
    step: { control: { type: 'object' } },
  },
  component: DateOfBirth,
  title: 'Questions/DateOfBirth',
} as Meta;

const Template: Story<IQuestionData> = (args) => <DateOfBirth {...args} />;

export const DoB = Template.bind({});
DoB.args = {
  dispatchForm: stepReducer,
  form: new Form(),
  step: {
    answers: [],
    id: 'B',
    internalNotes: 'Adults age 18 and over',
    entryRequirements: [],
    section: { id: 'introduction' },
    subTitle:
      "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
    title: 'Enter your birthday.',
    type: QUESTION_TYPE.DOB,
  },
  stepId: 'B',
};
