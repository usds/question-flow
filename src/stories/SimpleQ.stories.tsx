import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '../styles';

import { Story, Meta }        from '@storybook/react';
import { Questionable }       from '../components/Questionable';
import { IQuestionable }      from '../state/GlobalState';
import { simpleFlow }         from '../flows/simple/simple.flow';
import { QuestionableConfig } from '../survey/Config';

export default {
  argTypes: {
    config: { control: { type: 'object' } },
  },
  component: Questionable,
  title:     'Questionable/Simple',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  config: new QuestionableConfig({
    dev:       false,
    showSteps: false,
  }),
  questionnaire: simpleFlow,
};
