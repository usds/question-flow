import { IStep } from '../../survey/IStep';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = (props: IStep): JSX.Element => {
  const { question } = props;
  if (!question) {
    return <></>;
  }

  return (
    <StepLayout {...props}>
    </StepLayout>
  );
};
