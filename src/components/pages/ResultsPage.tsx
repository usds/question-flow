import { SummaryBox } from '@trussworks/react-uswds';
import { IStep } from '../../survey/IStep';
import { StepLayout } from '../wizard/StepLayout';
import { Pages } from '../lib';
import { useGlobal } from '../../state/GlobalState';

/**
 * Displays the wizard results
 * @param props
 * @returns
 */
export const ResultsPage = (props: IStep): JSX.Element => {
  const { question } = props;
  const global = useGlobal();
  const { questionnaire } = global;

  if (!question) {
    return <></>;
  }

  const action = questionnaire.getAction();

  return (
    <StepLayout {...props}>
      <SummaryBox heading="Benefits you may be eligible for" style={{ paddingTop: '20px' }}>
        <p>Here{'\''}s what you may be eligible for and why</p>
        <ul
          className="usa-list usa-list--unstyled"
          style={{ textAlign: 'left' }}
        >
          {Pages.getResults(props, global)}
        </ul>
        <p dangerouslySetInnerHTML={{ __html: question?.body || '' }} />
        <h2>{action.title}</h2>
        <p>{action.description}</p>
        <p dangerouslySetInnerHTML={{ __html: action.action }} />.
      </SummaryBox>
    </StepLayout>
  );
};
