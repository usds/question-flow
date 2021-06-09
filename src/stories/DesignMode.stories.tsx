import { Meta, Story } from '@storybook/react';
import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import { Questionable } from '../components/Questionable';
import { simpleFlow } from '../flows/simple/simple.flow';
import { MODE } from '../lib';
import { QuestionableConfig } from '../composable/Config';
import { IQuestionable } from '../state/GlobalState';
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
  config: new QuestionableConfig({
    dev: false,
    mode: MODE.EDIT,
    steps: {
      showStepId: false,
    }
  }),
  questionnaire: simpleFlow,
};
