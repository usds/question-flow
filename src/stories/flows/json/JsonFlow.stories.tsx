import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../../components/Questionable';
import { QuestionableConfig } from '../../../composable/Config';
import { IQuestionable } from '../../../state/GlobalState';
import '../../styles';
import { complexFlow } from './complex.flow';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/JSON Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const JSON = Template.bind({});
JSON.args = {
  config: new QuestionableConfig({
    dev: false,
    steps: {
      showStepId: false,
    },
    progressBar: {
      bgColor: '#1DC2AE',
    },
  }),
  questionnaire: complexFlow,
};
