import { ACTION }     from '@usds.gov/questionable-core';
import { CSS_CLASS }  from '../../lib/enums';
import { Action }     from '../wizard/Action';
import { TQst }       from '../../lib/types';
import { noel }       from '../../lib/noel';
import { Span }       from '../factories/NodeFactory';
import { StepLayout } from '../wizard/StepLayout';
import { useGlobal }  from '../../state/GlobalState';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const NoResultsPage = ({ props, comp }: TQst): JSX.Element => {
  const { step }                  = props;
  const global                    = useGlobal();
  const { questionnaire, config } = global;

  if (!step) {
    return noel();
  }

  config.events.noResult(props.form);

  const action = questionnaire.getActionByType(ACTION.NONE);

  return (
    <StepLayout {...props} comp={comp}>
      <Span node={step.bodyHeader} className={CSS_CLASS.NO_RESULTS_HEADER} />
      <Span
        node={step.bodySubHeader}
        className={CSS_CLASS.NO_RESULTS_SUBHEADER}
      />
      <Span node={step.body} className={CSS_CLASS.NO_RESULTS_BODY} />
      <Span node={step.children} />
      <Action action={action} page={props.form} />
    </StepLayout>
  );
};
