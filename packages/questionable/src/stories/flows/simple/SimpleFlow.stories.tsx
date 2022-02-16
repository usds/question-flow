import '../../styles';
import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../../components/Questionable';
import { simpleFlow } from './simple.flow';
import { IQuestionable } from '../../../survey/IQuestionable';
import { Questionnaire } from '../../../composable/Questionnaire';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title: 'Questionable/Simple Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  questionnaire: new Questionnaire(simpleFlow),
}
