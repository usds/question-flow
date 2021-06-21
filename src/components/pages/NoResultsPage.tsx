import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { P }          from '../factories/NodeFactory';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = (props: IPageData): JSX.Element => {
  const { step } = props;
  if (!step) {
    return noel();
  }

  return (
    <StepLayout {...props}>
      <P node={step.children} />
    </StepLayout>
  );
};
