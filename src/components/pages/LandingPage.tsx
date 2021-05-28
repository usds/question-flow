import { IStep } from '../../survey/IStep';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Generates the first page of the Wizard, "aka Landing"
 * @param props
 * @returns
 */
export const LandingPage = (props: IStep): JSX.Element => {
  const { question } = props;
  if (!question) {
    return <></>;
  }

  return (
    <StepLayout {...props}>
      {/* TODO: update this logic. See: https://github.com/usds/ssa-eligibility/issues/57 */}
      <p>
        To receive Social Security benefits, you have to meet certain
        requirements. We&rsquo;ll guide you through a series of questions to
        determine if you may be eligible.
      </p>
    </StepLayout>
  );
};
