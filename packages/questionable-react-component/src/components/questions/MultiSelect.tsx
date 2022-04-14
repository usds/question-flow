import { noel }             from '../../lib/noel';
import { StepLayout }       from '../wizard/StepLayout';
import { QuestionComposer } from '../lib/Questions';
import { Question }         from '../../composable/Question';

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultiSelect = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => {
  if (step?.answers === undefined) {
    return noel();
  }
  return comp.getCheckboxes();
};

/**
 * Renders a question and a checkbox list of allowed answers
 * @param props
 * @returns
 */
export const MultiSelectStep = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => (
  <StepLayout step={step} comp={comp}>
    <MultiSelect step={step} comp={comp}/>
  </StepLayout>
);
