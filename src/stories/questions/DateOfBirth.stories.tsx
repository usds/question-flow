/* eslint-disable max-len */
/*
  eslint-disable import/no-extraneous-dependencies
*/
import { Meta, Story } from '@storybook/react';
import { QUESTION_TYPE } from '../../lib';
import { Answer } from '../../composable/Answer';
import { stepReducer } from '../../state/stepReducer';
import '../styles';
import { IQuestionData } from '../../survey/IStepData';
import { DateOfBirth } from '../../components/questions/DateOfBirth';

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
  form: new Answer(),
  step: {
    answers: [],
    id: 'B',
    internalNotes: 'Adults age 18 and over',
    requirements: [],
    section: { id: 'introduction' },
    subTitle:
      "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
    title: 'Enter your birthday.',
    type: QUESTION_TYPE.DOB,
  },
  stepId: 'B',
};
