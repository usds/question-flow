import { noel }          from '../../lib/noel';
import { useGlobal }     from '../../state/GlobalState';
import { IQuestionData } from '../../survey/IQuestionData';
import { Questions }     from '../lib/Questions';
import { StepLayout }    from '../wizard/StepLayout';

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultiSelect = (props: IQuestionData): JSX.Element => {
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
export const MultiSelectStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <MultiSelect {...props} />
  </StepLayout>
);
