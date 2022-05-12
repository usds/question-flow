import {
  GateLogicCore,
  isEnum, MODE, PAGE_TYPE, QUESTION_TYPE,
} from '@usds.gov/questionable-core';
import { noel }            from '../../lib/noel';
import { useGlobal }       from '../../state/GlobalState';
import { Step }            from '../../composable';
import { DesignFactory }   from './DesignFactory';
import { PageFactory }     from './PageFactory';
import { QuestionFactory } from './QuestionFactory';

const viewFactory = ({ step, gate }: {gate: GateLogicCore, step: Step}): JSX.Element => {
  if (isEnum(QUESTION_TYPE, step.type)) {
    return QuestionFactory({ gate, step });
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    return PageFactory({ gate, step });
  }
  return noel('Step does not exist', 'StepFactory');
};

/**
 * Core UI factory for generating steps
 * @param props
 * @returns
 */
export const StepFactory = ({ step, gate }: {gate: GateLogicCore, step: Step}): JSX.Element => {
  const { questionnaire, config } = useGlobal();
  const s                         = questionnaire.getStepById(step.id);

  if (config.mode === MODE.EDIT) {
    return DesignFactory({ step: s });
  }
  return viewFactory({ gate, step: s });
};
