import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IStepData';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = (props: IPageData): JSX.Element => {
  const { step: page } = props;
  if (!page) {
    return noel();
  }

  return (
    <StepLayout {...props}>
    </StepLayout>
  );
};
