import { SummaryBox } from '@trussworks/react-uswds';
import { IPageData }  from '../../survey/IPageData';
import { StepLayout } from '../wizard/StepLayout';
import { Pages }      from '../lib';
import { useGlobal }  from '../../state/GlobalState';
import { noel }       from '../../lib/noop';
import { CSS_CLASS }  from '../../lib';
import { P }          from '../factories/NodeFactory';
import { Action }     from '../wizard/Action';

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

  const results = questionnaire.getResults(props.form);
  const action  = questionnaire.getAction(results);

  return (
    <StepLayout {...props}>
      <SummaryBox heading={step.bodyHeader || ''} className={CSS_CLASS.RESULTS_SUMMARY_HEADER}>
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
      </SummaryBox>
    </StepLayout>
  );
};
