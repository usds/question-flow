import { Form } from '../../composable/Form';
import { IQuestionData } from '../../survey/IQuestionData';
import { Meta, Story } from '@storybook/react';
import { MultipleSelect } from '../../components/questions/MultiSelect';
import { QUESTION_TYPE } from '../../lib';
import { stepReducer } from '../../state';
import '../../stories/styles';
/* eslint-disable max-len, import/no-extraneous-dependencies */

export default {
  argTypes: {
    step: { control: { type: 'object' } },
  },
  component: MultipleSelect,
  title: 'Questions/MultipleSelect',
} as Meta;

const Template: Story<IQuestionData> = (args) => <MultipleSelect {...args} />;

export const Checklist = Template.bind({});
Checklist.args = {
  dispatchForm: stepReducer,
  form: new Form(),
  step: {
    answers: [
      { id: '0', title: 'Hamburgers' },
      { id: '1', title: 'Tacos' },
      { id: '2', title: 'Salads' },
      { id: '3', title: 'Nacho cheese fountains' },
    ],
    id: 'I',
    info: "You may be eligible for certain benefits if you're legally married now or were in the past.",
    internalNotes: 'Adults age 18 and over',
    entryRequirements: [],
    section: { id: 'a0_family' },
    subTitle:
      'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    title: 'What foods do you like?',
    type: QUESTION_TYPE.MULTIPLE_SELECT,
  },
  stepId: 'B',
};
