import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { P }          from '../factories/NodeFactory';
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
      <P node={step.body} />
      <P node={step.children} />
    </StepLayout>
  );
};
