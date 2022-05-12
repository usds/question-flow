/* eslint-disable no-script-url */
import { ReactNode }     from 'react';
import { GateLogicCore } from '@usds.gov/questionable-core';
import { CSS_CLASS }     from '../../lib/enums';
import { Question }      from '../../composable/Question';
import { noel }          from '../../lib/noel';
import { StepLayout }    from '../wizard/StepLayout';
import { Step }          from '../../composable';
import { PageComposer }  from '../lib';

type tGa = {
  comp: PageComposer,
  gate: GateLogicCore,
  onClick?: (question: Question) => void,
  step: Step
}
/**
 * Internal method to generate a list of the survey answers
 * @param props
 * @returns
 */
const getAnswers = ({ onClick, gate }: tGa): ReactNode => {
  const answers = gate.form.responses.map((question, i) => (
      <li key={question.id} className={CSS_CLASS.SUMMARY_QA_LIST}>
        <span className="text-light">
        <span role={'link'} tabIndex={i}
          // eslint-disable-next-line max-len
          dangerouslySetInnerHTML={{ __html: `<a class="usa-link" href="javascript:void(0)">${question.title}</a>` }}
          onClick={() => {
            if (onClick) onClick(question);
            return false;
          }}
          onKeyDown={() => {
            if (onClick) onClick(question);
            return false;
          }}
          >
          </span>
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
export const SummaryPage = ({ step, gate, comp }: tGa): JSX.Element => {
  if (!step) {
    return noel();
  }

  const onClick = (question: Question) => {
    gate.goToStep(question);
  };

  return <StepLayout step={step} comp={comp}>{getAnswers({
    comp, gate, onClick, step,
  })}</StepLayout>;
};
