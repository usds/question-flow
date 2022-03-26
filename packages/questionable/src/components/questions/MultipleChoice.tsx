import { noel }          from '../../lib/noel';
import { useGlobal }     from '../../state';
import { IQuestionData } from '../../survey/IQuestionData';
import { Questions }     from '../lib/Questions';
import { StepLayout }    from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleChoice = (props: IQuestionData): JSX.Element => {
  const { config } = useGlobal();

  if (props?.step?.answers === undefined) {
    return noel('Question and answer are not defined');
  }

  return Questions.getRadios(props, config);
};

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleChoiceStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <MultipleChoice {...props} />
  </StepLayout>
);
