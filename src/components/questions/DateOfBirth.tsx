/* eslint-disable no-param-reassign */
import { DateInput, DateInputGroup } from '@trussworks/react-uswds';
import { capitalize, kebabCase }     from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import { QuestionableConfig }     from '../../composable';
import { getAge }                 from '../../lib/date';
import { ACTION_TYPE, DATE_UNIT } from '../../lib/enums';
import { noel }                   from '../../lib/noop';
import { TDateOfBirth }           from '../../lib/types';
import { useGlobal }              from '../../state/GlobalState';
import { setAge }                 from '../../state/storage';
import { IQuestionData }          from '../../survey/IQuestionData';
import { Questions }              from '../lib/Questions';
import { Steps }                  from '../lib/Steps';
import { StepLayout }             from '../wizard/StepLayout';

let cookieName = '';

const isValid = (
  unit: DATE_UNIT,
  val: number,
  // eslint-disable-next-line sonarjs/cognitive-complexity
): boolean => {
  const currentYear = new Date().getFullYear();
  const valStr      = `${val}`;
  switch (unit) {
    case DATE_UNIT.DAY:
      if (valStr.length <= 1 && val === 0) {
        return true;
      }
      if (val < 1 || val > 31) {
        return false;
      }
      break;
    case DATE_UNIT.MONTH:
      if (valStr.length <= 1 && val === 0) {
        return true;
      }
      if (val < 1 || val > 12) {
        return false;
      }
      break;
    case DATE_UNIT.YEAR:
      if (valStr.length === 1 && val !== 1 && val !== 2) {
        return false;
      }
      if (
        valStr.length === 2
        && !valStr.startsWith('19')
        && !valStr.startsWith('20')
      ) {
        return false;
      }
      if (valStr.length === 4 && (val < 1900 || val > currentYear)) {
        return false;
      }
      break;
  }
  return true;
};

const onDoBKeyPress = (
  e: KeyboardEvent<HTMLInputElement>,
  unit: DATE_UNIT,
): void => {
  if (e.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }
  if (!new RegExp('[0-9]').test(e.key)) {
    e.preventDefault();
    return;
  }
  const val = +`${e.currentTarget.value}${e.key}`;
  if (!isValid(unit, val)) {
    e.preventDefault();
  }
};

const onDateOfBirthChange = (
  e: ChangeEvent<HTMLInputElement>,
  unit: DATE_UNIT,
  props: IQuestionData,
  state: TDateOfBirth,
  setState: Dispatch<SetStateAction<TDateOfBirth>>,
  config: QuestionableConfig,
): void => {
  const val    = +e.target.value;
  const valStr = `${val}`;
  switch (unit) {
    case DATE_UNIT.DAY:
    case DATE_UNIT.MONTH:
      state[unit] = valStr.padStart(2, '0');
      break;
    case DATE_UNIT.YEAR:
      state[unit] = valStr;
      break;
  }
  setState({
    ...state,
  });
  const bd  = Questions.toBirthdate(state);
  const age = getAge(bd);
  if (age && bd) {
    setAge(cookieName, age.years);
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age,
        birthdate: bd,
      },
    });
    Questions.updateForm(bd, props, config);
  } else if (props.form?.age?.years && props.form.age.years > 0) {
    // If we have previously set a valid age, unset it
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age:       { years: -1 },
        birthdate: '',
      },
    });
    // error = `${state.month}/${state.day}/${state.year} is not a valid birthday.`;
  }
};

const getDateInput = (
  unit: DATE_UNIT,
  label: string,
  props: IQuestionData,
  state: TDateOfBirth,
  setState: Dispatch<SetStateAction<TDateOfBirth>>,
  config: QuestionableConfig,
): JSX.Element => {
  let reqs = {
    length: 2,
    max:    12,
    min:    1,
  };
  if (unit === DATE_UNIT.YEAR) {
    reqs = {
      length: 4,
      max:    new Date().getFullYear(),
      min:    1900,
    };
  }

  return (
    <DateInput
      id={Steps.getDomId(unit, props)}
      name={label}
      label={capitalize(unit)}
      unit={unit}
      maxLength={reqs.length}
      minLength={reqs.length}
      defaultValue={state[unit]}
      onChange={(e) =>
        onDateOfBirthChange(e, unit, props, state, setState, config)
      }
      onKeyPress={(e) => onDoBKeyPress(e, unit)}
    />
  );
};

const getDateInputGroup = (
  label: string,
  props: IQuestionData,
  state: TDateOfBirth,
  setState: Dispatch<SetStateAction<TDateOfBirth>>,
  config: QuestionableConfig,
): JSX.Element => (
  <>
    <DateInputGroup>
      {getDateInput(DATE_UNIT.MONTH, label, props, state, setState, config)}
      {getDateInput(DATE_UNIT.DAY, label, props, state, setState, config)}
      {getDateInput(DATE_UNIT.YEAR, label, props, state, setState, config)}
    </DateInputGroup>
  </>
);

export const DateOfBirth = (props: IQuestionData): JSX.Element => {
  const { config, questionnaire } = useGlobal();
  const { step }                  = props;
  const dob: TDateOfBirth         = {
    day:   Questions.getBirthdate(props)?.day?.toString(),
    month: Questions.getBirthdate(props)?.month?.toString(),
    year:  Questions.getBirthdate(props)?.year?.toString(),
  };
  const [state, setState]         = useState(dob);
  cookieName                      = kebabCase(questionnaire.header);
  if (!step) {
    return noel();
  }

  return getDateInputGroup('date_of_birth', props, state, setState, config);
};

export const DateOfBirthStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <DateOfBirth {...props} />
  </StepLayout>
);
