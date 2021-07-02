import { Button }     from '@trussworks/react-uswds';
import { ReactNode }  from 'react';
import { IQuestion }  from '../../survey';
import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { StepLayout } from '../wizard/StepLayout';
import { Steps }      from '../lib';

/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
const getAnswers = (props: IPageData, onClick: (question: IQuestion) => void): ReactNode => {
  const answers = props.form.responses.map((question) => (
      <li key={question.id} className="padding-bottom-2">
        <span className="text-light">
          <Button
            type="button"
            unstyled
            onClick={() => onClick(question)}
          >
            {question.title}
          </Button>
          :&nbsp;&nbsp;
          <span className="text-bold">{question.answer}</span>
        </span>
      </li>
  ));

  return <ul className="usa-list usa-list--unstyled">{answers}</ul>;
};

/**
 * Displays a summary of the wizard prior to showing results
 * @param props
 * @returns
 */
export const SummaryPage = (props: IPageData): JSX.Element => {
  const { step: page } = props;

  if (!page) {
    return noel();
  }

  const onClick = (question: IQuestion) => {
    Steps.goToStep(question.id, props);
  };

  return <StepLayout {...props}>{getAnswers(props, onClick)}</StepLayout>;
};
