import { DateInput, DateInputGroup } from '@trussworks/react-uswds';
import { capitalize }                from 'lodash';
import { ChangeEvent, useState }     from 'react';
import { getAge }                    from '../../lib/date';
import { ACTION_TYPE, DATE_UNIT }    from '../../lib/enums';
import { noel }                      from '../../lib/noop';
import { TDateOfBirth }              from '../../lib/types';
import { IQuestionData }             from '../../survey/IStepData';
import { Questions }                 from '../lib/Questions';
import { Steps }                     from '../lib/Steps';
import { StepLayout }                from '../wizard/StepLayout';

const toBirthdate = (dob: TDateOfBirth) => {
  if (dob.month && dob.day && dob.year) {
    return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${
      dob.year
    }`;
  }
  return undefined;
};

export const DateOfBirth = (props: IQuestionData): JSX.Element => {
  const { step }          = props;
  const dob: TDateOfBirth = {
    day:   Questions.getBirthdate(props)?.day?.toString(),
    month: Questions.getBirthdate(props)?.month?.toString(),
    year:  Questions.getBirthdate(props)?.year?.toString(),
  };
  const [state, setState] = useState(dob);

  if (!step) {
    return noel();
  }

  const onDateOfBirthChange = (
    e: ChangeEvent<HTMLInputElement>,
    unit: DATE_UNIT,
  ): void => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    state[unit] = val;
    setState({
      ...state,
    });
    const bd  = toBirthdate(state);
    const age = getAge(bd);
    if (age) {
      props.dispatchForm({
        type:  ACTION_TYPE.UPDATE,
        value: {
          age,
          birthdate: bd,
        },
      });
    }
  };

  const getDateInput = (
    unit: DATE_UNIT,
    label: string,
  ): JSX.Element => {
    let length = 2;
    if (unit === DATE_UNIT.year) {
      length = 4;
    }
    return (
      <DateInput
        id={Steps.getDomId(unit, props)}
        name={label}
        label={capitalize(unit)}
        unit={unit}
        maxLength={length}
        minLength={length}
        defaultValue={state[unit]}
        onChange={(e) => onDateOfBirthChange(e, unit)}
      />);
  };

  const getDateInputGroup = (label: string): JSX.Element => (
    <DateInputGroup>
      {getDateInput(DATE_UNIT.month, label)}
      {getDateInput(DATE_UNIT.day, label)}
      {getDateInput(DATE_UNIT.year, label)}
    </DateInputGroup>
  );

  return getDateInputGroup('date_of_birth');
};

export const DateOfBirthStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <DateOfBirth {...props} />
  </StepLayout>
);
