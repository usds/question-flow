import { DateInput, DateInputGroup } from '@trussworks/react-uswds';
import { capitalize }                from 'lodash';
import { ChangeEvent, useState }     from 'react';
import { useGlobal }                 from '../../state/GlobalState';
import { getAge }                    from '../../lib/date';
import { ACTION_TYPE, DATE_UNIT }    from '../../lib/enums';
import { noel }                      from '../../lib/noop';
import { TDateOfBirth }              from '../../lib/types';
import { IQuestionData }             from '../../survey/IQuestionData';
import { Questions }                 from '../lib/Questions';
import { Steps }                     from '../lib/Steps';
import { StepLayout }                from '../wizard/StepLayout';

export const DateOfBirth = (props: IQuestionData): JSX.Element => {
  const { config }        = useGlobal();
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
    const bd  = Questions.toBirthdate(state);
    const age = getAge(bd);
    if (age && bd) {
      props.dispatchForm({
        type:  ACTION_TYPE.UPDATE,
        value: {
          age,
          birthdate: bd,
        },
      });
      Questions.updateForm(bd, props, config);
    }
  };

  const getDateInput = (
    unit: DATE_UNIT,
    label: string,
  ): JSX.Element => {
    let length = 2;
    if (unit === DATE_UNIT.YEAR) {
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
      {getDateInput(DATE_UNIT.MONTH, label)}
      {getDateInput(DATE_UNIT.DAY, label)}
      {getDateInput(DATE_UNIT.YEAR, label)}
    </DateInputGroup>
  );

  return getDateInputGroup('date_of_birth');
};

export const DateOfBirthStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <DateOfBirth {...props} />
  </StepLayout>
);
