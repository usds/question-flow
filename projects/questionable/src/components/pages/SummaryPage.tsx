import { Link }       from '@trussworks/react-uswds';
import { ReactNode }  from 'react';
import { CSS_CLASS }  from '../../lib/enums';
import { IPageData }  from '../../survey/IPageData';
import { IQuestion }  from '../../survey';
import { noel }       from '../../lib/noop';
import { StepLayout } from '../wizard/StepLayout';
import { Steps }      from '../lib';
/* eslint-disable no-script-url */

/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
const getAnswers = (props: IPageData, onClick: (question: IQuestion) => void): ReactNode => {
  const answers = props.form.responses.map((question) => (
      <li key={question.id} className={CSS_CLASS.SUMMARY_QA_LIST}>
        <span className="text-light">
          <Link href={'javascript:void(0)'}
          onClick={() => {
            onClick(question);
            return false;
          }}
          >
            {question.title}
          </Link>
          {'  '}
          <span className="text-bold">{question.answer}</span>
        </span>
      </li>
  ));

  return <ul className={`${CSS_CLASS.SUMMARY_LIST} usa-list usa-list--unstyled`}>{answers}</ul>;
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
