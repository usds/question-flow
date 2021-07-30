import '../../styles';
import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../../components/Questionable';
import { simpleFlow } from './simple.flow';
import { IQuestionable } from '../../../survey/IQuestionable';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Simple Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args}></Questionable>;

export const Simple = Template.bind({});
Simple.args = {
  questionnaire: simpleFlow,
}
