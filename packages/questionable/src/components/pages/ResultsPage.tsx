import { Action }     from '../wizard/Action';
import { CSS_CLASS }  from '../../lib';
import { IPageData }  from '../../survey/IPageData';
import { noel }       from '../../lib/noop';
import { Pages }      from '../lib';
import { Span }       from '../factories/NodeFactory';
import { StepLayout } from '../wizard/StepLayout';
import { useGlobal }  from '../../state/GlobalState';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const ResultsPage = (props: IPageData): JSX.Element => {
  const { step }                  = props;
  const global                    = useGlobal();
  const { questionnaire, config } = global;

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
          <Action key={a?.id} action={action} page={props.form} />
        ))}
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const genResults = results as any;
  config.events.onResults({ ...props.form, results: genResults });

  return (
    <StepLayout {...props}>
      <div className={CSS_CLASS.RESULTS_SUMMARY_HEADER}>
        <Span
          node={step.bodyHeader}
          className={CSS_CLASS.RESULTS_BODY_HEADER}
        />
        <Span
          node={step.bodySubHeader}
          className={CSS_CLASS.RESULTS_BODY_SUBHEADER}
        />
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.RESULTS_SUMMARY_BOX}`}
        >
          {Pages.getResults(props, global)}
        </ul>
        <Span node={step.body} className={CSS_CLASS.RESULTS_BODY} />
        <Span node={step.children} className={CSS_CLASS.RESULTS_CHILDREN} />
        <Action action={action} page={props.form} />
        {followupActions}
      </div>
    </StepLayout>
  );
};
