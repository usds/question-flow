import { noel }          from '../../lib/noop';
import { IQuestionData } from '../../survey/IStepData';
import { Questions }     from '../lib/Questions';
import { StepLayout }    from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleSelect = (props: IQuestionData): JSX.Element => {
  if (props?.step?.answers === undefined) {
    return noel();
  }

  return Questions.getCheckboxes(props);
};

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleSelectStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <MultipleSelect {...props} />
  </StepLayout>
);
