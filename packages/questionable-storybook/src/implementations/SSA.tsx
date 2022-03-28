/* eslint-disable camelcase */
import '../styles';
import { Meta, Story }                    from '@storybook/react';
import { AppContainer }                   from '@usds.gov/ssa-eligibility/src/App';
import { ssa_eligibility_copy_questions } from '@usds.gov/questionable-mocks';

export default {
  component: AppContainer,
  title:     'Implementations/SSA Eligibility',
} as Meta;

const Template: Story<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const SSA = Template.bind({});
SSA.args = {
  data: ssa_eligibility_copy_questions,
};
