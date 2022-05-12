import { ACTION, GateLogicCore } from '@usds.gov/questionable-core';
import { CSS_CLASS }             from '../../lib/enums';
import { Action }                from '../wizard/Action';
import { noel }                  from '../../lib/noel';
import { Span }                  from '../factories/NodeFactory';
import { StepLayout }            from '../wizard/StepLayout';
import { useGlobal }             from '../../state/GlobalState';
import { PageComposer }          from '../lib';
import { Page }                  from '../../composable';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = ({ step, comp, gate }: {
  comp: PageComposer,
  gate: GateLogicCore,
  step: Page
}): JSX.Element => {
  const  { questionnaire, config } = useGlobal();

  if (!step) {
    return noel();
  }

  config.events.noResult(gate.form);

  const action = questionnaire.getActionByType(ACTION.NONE);

  return (
    <StepLayout step={step} comp={comp}>
      <Span node={step.bodyHeader} className={CSS_CLASS.NO_RESULTS_HEADER} />
      <Span
        node={step.bodySubHeader}
        className={CSS_CLASS.NO_RESULTS_SUBHEADER}
      />
      <Span node={step.body} className={CSS_CLASS.NO_RESULTS_BODY} />
      <Span node={step.children} />
      <Action action={action} page={gate.form} />
    </StepLayout>
  );
};
