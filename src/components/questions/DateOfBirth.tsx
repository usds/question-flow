import { kebabCase } from 'lodash';
import {
  useState,
} from 'react';
import { noel }                                        from '../../lib/noop';
import { TDateOfBirth }                                from '../../lib/types';
import { useGlobal }                                   from '../../state/GlobalState';
import { IQuestionData }                               from '../../survey/IQuestionData';
import { Questions }                                   from '../lib/Questions';
import { StepLayout }                                  from '../wizard/StepLayout';
import { TDoBUtilParams, IInfoBox, getDateInputGroup } from './lib/DateOfBirthUtils';

export const DateOfBirth = (props: IQuestionData): JSX.Element => {
  const { config, questionnaire } = useGlobal();
  const { step }                  = props;
  const birthdate                 = Questions.getBirthdate(props);
  const dob: TDateOfBirth         = {
    day:   birthdate?.day?.toString(),
    month: birthdate?.month?.toString(),
    year:  birthdate?.year?.toString(),
  };

  const [state, setState]           = useState(dob);
  const startMessage: IInfoBox      = { message: '', type: 'info' };
  const [error, setError]           = useState(startMessage);
  const [cookieName, setCookieName] = useState(kebabCase(questionnaire.header));

  if (!step) {
    return noel();
  }

  const params: TDoBUtilParams = {
    cookieName,
    error,
    setCookieName,
    setError,
    setState,
    state,
  };
  return getDateInputGroup('date_of_birth', props, config, params);
};

export const DateOfBirthStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <DateOfBirth {...props} />
  </StepLayout>
);
