import { noel }       from '../../lib/noel';
import { Span }       from '../factories/NodeFactory';
import { StepLayout } from '../wizard/StepLayout';
import type { TQst }  from '../lib/types';

/**
 * Generates the first/initial/landing page of the Wizard
 * @param props
 * @returns
 */
export const LandingPage = ({ props, comp }: TQst): JSX.Element => {
  const { step } = props;
  if (!step) {
    return noel();
  }

  return (
    <StepLayout {...props} comp={comp}>
      <Span node={step.body} />
      <Span node={step.children} />
    </StepLayout>
  );
};
