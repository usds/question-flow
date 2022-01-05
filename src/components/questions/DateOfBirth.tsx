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
import { QuestionableConfig }                from '../../composable';
import { getAge }                            from '../../lib/date';
import { ACTION_TYPE, CSS_CLASS, DATE_UNIT } from '../../lib/enums';
import { noel }                              from '../../lib/noop';
import { TDateOfBirth }                      from '../../lib/types';
import { useGlobal }                         from '../../state/GlobalState';
import { setAge }                            from '../../state/persists';
import { IQuestionData }                     from '../../survey/IQuestionData';
import { Questions }                         from '../lib/Questions';
import { Steps }                             from '../lib/Steps';
import { StepLayout }                        from '../wizard/StepLayout';

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
    default:
      return false;
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
  const isNumber = /[0-9]/;
  if (!isNumber.test(e.key)) {
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
  setError: Dispatch<SetStateAction<string>>,
// eslint-disable-next-line sonarjs/cognitive-complexity
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
    default:
      break;
  }
  setState({
    ...state,
  });
  const bd     = Questions.toBirthdate(state);
  const age    = getAge(bd);
  const errStr = `${state.month || '__'}/${state.day || '__'}/${state.year || '____'}`;
  // eslint-disable-next-line max-len
  const generalError = 'Follow the "MM DD YYYY" format to enter your birthday. For example, September 9, 1960 is 09 09 1960.';

  if (age && bd) {
    setError('');
    setAge(cookieName, age.years);
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age,
        birthdate: bd,
      },
    });
    Questions.updateForm(bd, props, config);
    if (props.step.exitRequirements && age.years > 0) {
      const invalid = props.step.exitRequirements.every((r) =>
        r.minAge && age.years < r.minAge.years);
      if (invalid) {
        const min = props.step.exitRequirements.map((r) => r.minAge?.years).join(', ');
        // eslint-disable-next-line max-len
        setError(`Looks like that's a birth date under age ${min}. Enter a birthday for someone who is over ${min} years old or tap "Go Back".`);
      }
    }
  } else if (props.form?.age?.years && props.form.age.years > 0) {
    // If we have previously set a valid age, unset it
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age:       { years: -1 },
        birthdate: '',
      },
    });
    setError(`"${errStr}" is not a valid date. ${generalError}`);
  } else {
    setError(`"${errStr}" is not a valid date. ${generalError}`);
  }
};

const getDateInput = (
  unit: DATE_UNIT,
  label: string,
  props: IQuestionData,
  state: TDateOfBirth,
  setState: Dispatch<SetStateAction<TDateOfBirth>>,
  config: QuestionableConfig,
  setError: Dispatch<SetStateAction<string>>,
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
      aria-label={capitalize(unit)}
      unit={unit}
      maxLength={reqs.length}
      minLength={reqs.length}
      defaultValue={state[unit]}
      onChange={(e) =>
        onDateOfBirthChange(e, unit, props, state, setState, config, setError)
      }
      onKeyPress={(e) => onDoBKeyPress(e, unit)}
    />
  );
};

const getAlertClass = (error: string) =>
  `${(error.length > 0 ? CSS_CLASS.VISIBLE : CSS_CLASS.HIDDEN)} ${CSS_CLASS.DOB_ERROR}`;

const getDateInputGroup = (
  label: string,
  props: IQuestionData,
  state: TDateOfBirth,
  setState: Dispatch<SetStateAction<TDateOfBirth>>,
  config: QuestionableConfig,
  error: string,
  setError: Dispatch<SetStateAction<string>>,
): JSX.Element => (
  <div>
    <DateInputGroup role="group" aria-label={props.step.title}>
      {getDateInput(DATE_UNIT.MONTH, label, props, state, setState, config, setError)}
      {getDateInput(DATE_UNIT.DAY, label, props, state, setState, config, setError)}
      {getDateInput(DATE_UNIT.YEAR, label, props, state, setState, config, setError)}
    </DateInputGroup>
    <div className={getAlertClass(error)}>
      <div className="usa-alert usa-alert--error usa-alert--slim">
        <div className="usa-alert__body">
          <p className="usa-alert__text">
            {error}
          </p>
        </div>
      </div>
    </div>
  </div>
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
  const [error, setError]         = useState('');
  cookieName                      = kebabCase(questionnaire.header);
  if (!step) {
    return noel();
  }

  return getDateInputGroup('date_of_birth', props, state, setState, config, error, setError);
};

export const DateOfBirthStep = (props: IQuestionData): JSX.Element => (
  <StepLayout {...props}>
    <DateOfBirth {...props} />
  </StepLayout>
);
