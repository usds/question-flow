import { Meta, Story } from '@storybook/react';
import {
  IQuestionable,
  Questionable,
  Questionnaire
} from '@usds.gov/questionable';
import '../../../styles';
import { buildEligibility } from './eligibility.flow';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Eligibility Flow',
} as Meta;
const questionnaire = buildEligibility();
const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Eligibility = Template.bind({});
Eligibility.args = {
  questionnaire: new Questionnaire(questionnaire),
};
