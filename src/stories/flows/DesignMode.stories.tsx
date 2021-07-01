import { Meta, Story } from '@storybook/react';
import { Questionable } from '../../components/Questionable';
import { QuestionableConfig } from '../../composable/Config';
import { MODE } from '../../lib';
import { IQuestionable } from '../../state/GlobalState';
import { simpleFlow } from '../flows/simple/simple.flow';
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
    },
    nav: {
      next: {
        verticalPos: 'top',
        type: 'button',
      },
      prev: {
        verticalPos: 'top',
        type: 'button',
      },
    },
  }),
  questionnaire: simpleFlow,
};
