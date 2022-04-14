import { kebabCase } from 'lodash';
import {
  useState,
} from 'react';
import { TDateOfBirthCore } from '@usds.gov/questionable-core';
import { noel }             from '../../lib/noel';
import { useGlobal }        from '../../state/GlobalState';
import { StepLayout }       from '../wizard/StepLayout';
import {
  TDoBUtilParams,
  IInfoBox,
  getDateInputGroup,
} from './lib/DateOfBirthUtils';
import { Question }         from '../../composable';
import { QuestionComposer } from '../lib';

export const DateOfBirth = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => {
  const { questionnaire }     = useGlobal();
  const birthdate             = comp.getBirthdate();
  const dob: TDateOfBirthCore = {
    day:   birthdate?.day?.toString(),
    month: birthdate?.month?.toString(),
    year:  birthdate?.year?.toString(),
  };

  const [state, setState]           = useState(dob);
  const startMessage: IInfoBox      = { message: '', type: 'info' };
  const [error, setError]           = useState(startMessage);
  const [cookieName, setCookieName] = useState(kebabCase(questionnaire.questionnaire.header));

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
  return getDateInputGroup('date_of_birth', step, params, comp);
};

export const DateOfBirthStep = ({ step, comp }: {comp: QuestionComposer, step: Question}): JSX.Element => (
  <StepLayout step={step} comp={comp}>
    <DateOfBirth step={step} comp={comp}/>
  </StepLayout>
);
