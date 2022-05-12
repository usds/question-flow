import { Question }         from '../../composable/Question';
import { noel }             from '../../lib/noel';
import { QuestionComposer } from '../lib/Questions';
import { StepLayout }       from '../wizard/StepLayout';

/**
 * Renders a question and a radio list of allowed answers
 * @param step
 * @returns
 */
export const MultipleChoice = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => {
  if (step?.answers === undefined) {
    return noel('Question and answer are not defined');
  }
  return comp.getRadios();
};

/**
 * Renders a question and a radio list of allowed answers
 * @param step
 * @returns
 */
export const MultipleChoiceStep = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => (
  <StepLayout step={step} comp={comp}>
    <MultipleChoice step={step} comp={comp} />
  </StepLayout>
);
