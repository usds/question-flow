import { Fieldset } from '@trussworks/react-uswds';
import { IStep } from '../../survey/IStep';
import { Steps } from '../lib/Steps';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleChoice = (props: IStep): JSX.Element => {
  if (props?.question?.answers === undefined) {
    return <></>;
  }

  return (
    <StepLayout {...props}>
      <Fieldset
        legend={props.question.questionText}
        className="multipleChoice"
        legendStyle="srOnly"
      >
        {Steps.getRadios(props)}
      </Fieldset>
    </StepLayout>
  );
};
