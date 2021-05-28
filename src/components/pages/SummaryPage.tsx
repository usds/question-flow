import { ReactNode } from 'react';
import { IStep } from '../../survey/IStep';
import { StepLayout } from '../wizard/StepLayout';

/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
const getAnswers = (props: IStep): ReactNode => {
  const answers = Object.keys(props.form.answers).map((key) => (
    <li key={key} className="padding-bottom-2">
      <span className="text-light">
        {props.form.answers[key].questionText}:&nbsp;&nbsp;
        <b>{props.form.answers[key].answer}</b>
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
export const SummaryPage = (props: IStep): JSX.Element => {
  const { question } = props;
  if (!question) {
    return <></>;
  }

  return <StepLayout {...props}>{getAnswers(props)}</StepLayout>;
};
