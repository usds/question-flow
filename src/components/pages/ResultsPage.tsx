import { SummaryBox } from '@trussworks/react-uswds';
import { IPageData }  from '../../survey/IStepData';
import { StepLayout } from '../wizard/StepLayout';
import { Pages }      from '../lib';
import { useGlobal }  from '../../state/GlobalState';
import { noel }       from '../../lib/noop';
import { CSS_CLASS }  from '../../lib';

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
        <p>{step.bodySubHeader}</p>
        <ul
          className={`usa-list usa-list--unstyled ${CSS_CLASS.RESULTS_SUMMARY_BOX}`}
        >
          {Pages.getResults(props, global)}
        </ul>
        <p dangerouslySetInnerHTML={{ __html: step?.body || '' }} />
        <h2>{action.title}</h2>
        <p>{action.description}</p>
        <p dangerouslySetInnerHTML={{ __html: action.action }} />.
      </SummaryBox>
    </StepLayout>
  );
};
