import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IStepData';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Generates the first page of the Wizard, "aka Landing"
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
      <p>{step.body}</p>
    </StepLayout>
  );
};
