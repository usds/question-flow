import { SummaryBox } from '@trussworks/react-uswds';
import { CSS_CLASS }  from '../../lib';
import { noel }       from '../../lib/noop';
import { useGlobal }  from '../../state/GlobalState';
import { IPageData }  from '../../survey/IPageData';
import { P }          from '../factories/NodeFactory';
import { Pages }      from '../lib';
import { Action }     from '../wizard/Action';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const ResultsPage = (props: IPageData): JSX.Element => {
  const { step }          = props;
  const global            = useGlobal();
  const { questionnaire } = global;

  if (!step) {
    return noel();
  }

  const results          = questionnaire.getResults(props.form);
  const action           = questionnaire.getAction(results);
  const secondaryActions = results
    .filter((r) => r.secondaryAction)
    .map((r) => r.secondaryAction);
  let followupActions    = noel();
  if (secondaryActions.length > 0) {
    followupActions = (
      <div className={CSS_CLASS.RESULTS_SECONDARY_ACTIONS}>
        {secondaryActions.map((a) => (
          <Action key={a?.id} {...a} />
        ))}
      </div>
    );
  }

  return (
    <StepLayout {...props}>
      <SummaryBox
        heading={step.bodyHeader || ''}
        className={CSS_CLASS.RESULTS_SUMMARY_HEADER}
      >
        <P node={step.bodyHeader} />
        <P node={step.bodySubHeader} />
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.RESULTS_SUMMARY_BOX}`}
        >
          {Pages.getResults(props, global)}
        </ul>
        <P node={step.body} />
        <P node={step.children} />
        <Action {...action} />
        {followupActions}
      </SummaryBox>
    </StepLayout>
  );
};
