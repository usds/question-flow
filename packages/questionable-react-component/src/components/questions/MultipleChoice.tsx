import { noel }       from '../../lib/noel';
import { useGlobal }  from '../../state';
import { TQst }       from '../lib/types';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleChoice = ({ props, comp }: TQst): JSX.Element => {
  const { config } = useGlobal();

  if (props?.step?.answers === undefined) {
    return noel('Question and answer are not defined');
  }

  return comp.getRadios(props, config);
};

/**
 * Renders a question and a radio list of allowed answers
 * @param props
 * @returns
 */
export const MultipleChoiceStep = ({ props, comp }: TQst): JSX.Element => (
  <StepLayout props={props} comp={comp}>
    <MultipleChoice props={props} comp={comp} />
  </StepLayout>
);
