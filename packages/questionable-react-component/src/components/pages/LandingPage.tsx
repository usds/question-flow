import { Page }         from '../../composable/Page';
import { noel }         from '../../lib/noel';
import { Span }         from '../factories/NodeFactory';
import { PageComposer } from '../lib/Pages';
import { StepLayout }   from '../wizard/StepLayout';

/**
 * Generates the first/initial/landing page of the Wizard
 * @param props
 * @returns
 */
export const LandingPage = ({ step, comp }: {
  comp: PageComposer,
  step: Page
}): JSX.Element => {
  if (!step) {
    return noel();
  }

  return (
    <StepLayout step={step} comp={comp}>
      <Span node={step.body} />
      <Span node={step.children} />
    </StepLayout>
  );
};
