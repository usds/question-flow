import { Meta, Story } from '@storybook/react';
import { Questionable ,IQuestionable, Questionnaire } from '@usds.gov/questionable';
import { designFlow } from './design.flow';
import '../../styles';
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
  questionnaire: new Questionnaire(designFlow),
};
