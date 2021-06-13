import { ReactNode }  from 'react';
import { noel }       from '../../lib/noop';
import { IPageData }  from '../../survey/IPageData';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
const getAnswers = (props: IPageData): ReactNode => {
  const answers = props.form.answers.map((question) => (
      <li key={question.id} className="padding-bottom-2">
        <span className="text-light">
          {question.title}:&nbsp;&nbsp;
          <b>{question.answer}</b>
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

  return <StepLayout {...props}>{getAnswers(props)}</StepLayout>;
};
