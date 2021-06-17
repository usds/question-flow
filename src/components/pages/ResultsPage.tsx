import { SummaryBox } from '@trussworks/react-uswds';
import { IPageData }  from '../../survey/IPageData';
import { StepLayout } from '../wizard/StepLayout';
import { Pages }      from '../lib';
import { useGlobal }  from '../../state/GlobalState';
import { noel }       from '../../lib/noop';
import { CSS_CLASS }  from '../../lib';
import { H2, P }      from '../factories/NodeFactory';

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

  const action = questionnaire.getAction();

  return (
    <StepLayout {...props}>
      <SummaryBox heading={step.bodyHeader || ''} className={CSS_CLASS.RESULTS_SUMMARY_HEADER}>
        <P node={step.bodyHeader} />
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.RESULTS_SUMMARY_BOX}`}
        >
          {Pages.getResults(props, global)}
        </ul>
        <P node={step.body} />
        <H2 node={action.title}/>
        <P node={action.description} />
        <P node={action.action} />
      </SummaryBox>
    </StepLayout>
  );
};
