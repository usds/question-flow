import { useGlobal }  from '../../state/GlobalState';
import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { P }          from '../factories/NodeFactory';
import { Action }     from '../wizard/Action';
import { StepLayout } from '../wizard/StepLayout';
import { ACTION }     from '../../lib';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = (props: IPageData): JSX.Element => {
  const { step }          = props;
  const global            = useGlobal();
  const { questionnaire } = global;

  if (!step) {
    return noel();
  }

  const action = questionnaire.getActionByType(ACTION.NONE);

  return (
    <StepLayout {...props}>
      <P node={step.bodyHeader} />
      <P node={step.bodySubHeader} />
      <P node={step.body} />
      <P node={step.children} />
      <Action {...action} />
    </StepLayout>
  );
};
