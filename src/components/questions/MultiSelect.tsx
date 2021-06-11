import { noel }          from '../../lib/noop';
import { useGlobal }     from '../../state/GlobalState';
import { IQuestionData } from '../../survey/IStepData';
import { Questions }     from '../lib/Questions';
import { StepLayout }    from '../wizard/StepLayout';

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultipleSelect = (props: IQuestionData): JSX.Element => {
  const { config } = useGlobal();

  if (props?.step?.answers === undefined) {
    return noel();
  }

  return Questions.getCheckboxes(props, config);
};

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultipleSelectStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <MultipleSelect {...props} />
  </StepLayout>
);
