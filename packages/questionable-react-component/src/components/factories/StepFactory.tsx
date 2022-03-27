import {
  isEnum, MODE, PAGE_TYPE, QUESTION_TYPE,
} from '@usds.gov/questionable-core';
import { noel }            from '../../lib/noel';
import { useGlobal }       from '../../state/GlobalState';
import { IStep }           from '../../survey/IStep';
import { IStepData }       from '../../survey/IStepData';
import { DesignFactory }   from './DesignFactory';
import { PageFactory }     from './PageFactory';
import { QuestionFactory } from './QuestionFactory';

const viewFactory = (props: IStepData, step: IStep): JSX.Element => {
  if (isEnum(QUESTION_TYPE, step.type)) {
    return QuestionFactory(props);
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    return PageFactory(props);
  }
  return noel('Step does not exist', 'StepFactory');
};

/**
 * Core UI factory for generating steps
 * @param props
 * @returns
 */
export const StepFactory = (props: IStepData): JSX.Element => {
  const { stepId }                = props;
  const { questionnaire, config } = useGlobal();
  const step                      = questionnaire.getStepById(`${stepId}`);

  if (config.mode === MODE.EDIT) {
    return DesignFactory(props, step);
  }
  return viewFactory(props, step);
};
