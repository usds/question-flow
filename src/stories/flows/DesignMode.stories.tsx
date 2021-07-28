import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../components/Questionable';
import { QuestionableConfig } from '../../composable/Config';
import { MODE } from '../../lib';
import { simpleFlow } from '../flows/simple/simple.flow';
import '../styles';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Design Mode',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Design = Template.bind({});
Design.args = {
  questionnaire: simpleFlow,
};
