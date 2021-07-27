import { Meta, Story } from '@storybook/react';
import { EventEmitter } from '../../../composable/EventEmitter';
import { Questionable } from '../../../components/Questionable';
import { QuestionableConfig } from '../../../composable/Config';
import { Questionnaire } from '../../../composable/Questionnaire';
import { IQuestionable } from '../../../state/GlobalState';
import '../../styles';
import { buildEligibility } from './eligibility.flow';

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
    events: new EventEmitter({ onEvent: console.log }),
    nav: {
    prev: {
        visible: false,
      },
    },
  }),
  questionnaire: new Questionnaire(buildEligibility()),
};
