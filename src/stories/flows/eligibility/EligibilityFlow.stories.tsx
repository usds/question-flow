import { Meta, Story } from '@storybook/react';
import { Questionnaire } from '../../../composable/Questionnaire';
import { Questionable } from '../../../components/Questionable';
import { QuestionableConfig } from '../../../composable/Config';
import { IQuestionable } from '../../../state/GlobalState';
import '../../styles';
import { eligibility } from './eligibility.flow';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Eligibility Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Eligibility = Template.bind({});
Eligibility.args = {
  config: new QuestionableConfig({
    dev: false,
    steps: {
      showStepId: false,
    },
    progressBar: {
      bgColor: '#1DC2AE',
    },
  }),
  questionnaire: new Questionnaire(eligibility),
};
