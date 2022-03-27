import '../styles';
import { Meta, Story }  from '@storybook/react';
import { AppContainer } from '@usds.gov/ssa-eligibility/src/App';
import { sampleData }   from '@usds.gov/ssa-eligibility/src/data/sample';

export default {
  argTypes: {
    data: { control: { type: 'object' } },
  },
  component:  AppContainer,
  
  title: 'Implementations/SSA Eligibility',
} as Meta;

const Template: Story<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const SSA = Template.bind({});
SSA.args = {
  data: sampleData,
};
