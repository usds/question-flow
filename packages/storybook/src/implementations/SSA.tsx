import '../styles';
import { Meta, Story } from '@storybook/react';
import { App } from '@usds.gov/ssa-eligibility/src/App';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title:     'Questionable/Simple Flow',
} as Meta;

const Template: Story<App> = (args) => <Questionable {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  questionnaire: new Questionnaire(simpleFlow),
};
