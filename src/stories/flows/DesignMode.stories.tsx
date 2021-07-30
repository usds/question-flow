import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../components/Questionable';
import { IQuestionable } from '../../survey/IQuestionable';
import { simpleFlow } from '../flows/simple/simple.flow';
import '../styles';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Design Mode',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args}></Questionable>;

export const Design = Template.bind({});
Design.args = {
  questionnaire: simpleFlow,
};
