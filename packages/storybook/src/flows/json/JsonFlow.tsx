import { Meta, Story }                 from '@storybook/react';
import { Questionable, IQuestionable } from '@usds.gov/questionable';
import '../../styles';
import { jsonFlow }                    from './json.flow';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title:     'Questionable/JSON Flow',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const JSON = Template.bind({});
JSON.args = {
  questionnaire: jsonFlow,
};
