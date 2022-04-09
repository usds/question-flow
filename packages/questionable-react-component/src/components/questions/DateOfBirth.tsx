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
import type { TQst } from '../lib/types';

export const DateOfBirth = ({ props, comp }: TQst): JSX.Element => {
  const { config, questionnaire } = useGlobal();
  const { step }                  = props;
  const birthdate                 = comp.getBirthdate(props);
  const dob: TDateOfBirthCore     = {
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

export const DateOfBirthStep = ({ props, comp }: TQst): JSX.Element => (
  <StepLayout props={props} comp={comp}>
    <DateOfBirth props={props} comp={comp}/>
  </StepLayout>
);
