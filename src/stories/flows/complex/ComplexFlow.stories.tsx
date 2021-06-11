import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../../components/Questionable';
import { complexFlow } from './complex.flow';
import { QuestionableConfig } from '../../../composable/Config';
import { IQuestionable } from '../../../state/GlobalState';
import '../../styles';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Complex Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Complex = Template.bind({});
Complex.args = {
  config: new QuestionableConfig({
    dev: false,
    steps: {
      showStepId: false,
    }
  }),
  questionnaire: complexFlow,
};
