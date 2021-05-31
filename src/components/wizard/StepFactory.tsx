import {
  isEnum, PAGE_TYPE, QUESTION_TYPE,
} from '../../lib/enums';
import { noel }            from '../../lib/noop';
import { useGlobal }       from '../../state/GlobalState';
import { IStepData }       from '../../survey/IStepData';
import { PageFactory }     from './PageFactory';
import { QuestionFactory } from './QuestionFactory';

/**
 * Core UI factory for generating steps
 * @param props
 * @returns
 */
export const StepFactory = (props: IStepData): JSX.Element => {
  const { stepId }        = props;
  const { questionnaire } = useGlobal();
  const step              = questionnaire.getStepById(`${stepId}`);

  if (isEnum(QUESTION_TYPE, step.type)) {
    return QuestionFactory(props);
  }
  if (isEnum(PAGE_TYPE, step.type)) {
    return PageFactory(props);
  }
  return noel('Step does not exist');
};
