import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { Span }       from '../factories/NodeFactory';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Generates the first/initial/landing page of the Wizard
 * @param props
 * @returns
 */
export const LandingPage = (props: IPageData): JSX.Element => {
  const { step } = props;
  if (!step) {
    return noel();
  }

  return (
    <StepLayout {...props}>
      <Span node={step.body} />
      <Span node={step.children} />
    </StepLayout>
  );
};
