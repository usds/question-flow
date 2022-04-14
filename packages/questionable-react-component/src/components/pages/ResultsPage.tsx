import { GateLogicCore } from '@usds.gov/questionable-core';
import { Action }        from '../wizard/Action';
import { CSS_CLASS }     from '../../lib';
import { noel }          from '../../lib/noel';
import { Span }          from '../factories/NodeFactory';
import { StepLayout }    from '../wizard/StepLayout';
import { useGlobal }     from '../../state/GlobalState';
import { Page }          from '../../composable';
import { PageComposer }  from '../lib';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const ResultsPage = ({ step, comp, gate }: {
  comp: PageComposer,
  gate: GateLogicCore,
  step: Page
}): JSX.Element => {
  const { questionnaire, config } = useGlobal();

  if (!step) {
    return noel();
  }

  const results          = questionnaire.getResults();
  const action           = questionnaire.getAction(results);
  const secondaryActions = results
    .filter((r) => r.secondaryAction)
    .map((r) => r.secondaryAction);
  let followupActions    = noel();
  if (secondaryActions.length > 0) {
    followupActions = (
      <div className={CSS_CLASS.RESULTS_SECONDARY_ACTIONS}>
        {secondaryActions.map((a) => (
          <Action key={a?.id} action={action} page={gate.form} />
        ))}
      </div>
    );
  }
  config.events.onResults({ results, step });

  return (
    <StepLayout step={step} comp={comp}>
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
          {comp.getResults()}
        </ul>
        <Span node={step.body} className={CSS_CLASS.RESULTS_BODY} />
        <Span node={step.children} className={CSS_CLASS.RESULTS_CHILDREN} />
        <Action action={action} page={gate.form} />
        {followupActions}
      </div>
    </StepLayout>
  );
};
