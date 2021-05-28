import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import '../styles';

import { Story, Meta }        from '@storybook/react';
import { Questionable }       from '../components/Questionable';
import { IQuestionable }      from '../state/GlobalState';
import { complexFlow }        from '../flows/complex/complex.flow';
import { QuestionableConfig } from '../survey/Config';

export default {
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  component: Questionable,
  title:     'Questionable/Complex',
} as Meta;

const Template: Story<IQuestionable> = (args) => <Questionable {...args} />;

export const Complex = Template.bind({});
Complex.args = {
  config: new QuestionableConfig({
    dev:       false,
    showSteps: false,
  }),
  questionnaire: complexFlow,
};
