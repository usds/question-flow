import { DateInput, DateInputGroup } from '@trussworks/react-uswds';
import { capitalize }                from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import {
  ACTION_TYPE,
  DATE_UNIT,
  getAge,
  TDateOfBirthCore,
} from '@usds.gov/questionable-core';
import { noel }               from '../../../lib/noel';
import { setAge }             from '../../../state/persists';
import { IQuestionData }      from '../../../survey/IStepData';
import { Steps }              from '../../lib/Steps';
import { CSS_CLASS }          from '../../../lib/enums';
import { QuestionableConfig } from '../../../composable/config';

type TInfoBox = 'error' | 'warning' | 'info';

export interface IInfoBox {
  message: string;
  type: TInfoBox;
}

export type TDoBUtilParams = {
  cookieName: string;
  error: IInfoBox;
  setCookieName: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<IInfoBox>>;
  setState: Dispatch<SetStateAction<TDateOfBirthCore>>;
  state: TDateOfBirthCore;
};

export const isValid = (
  unit: DATE_UNIT,
  val: number | string,
  // eslint-disable-next-line sonarjs/cognitive-complexity
): boolean => {
  const valStr = `${val}`;

  if (valStr.length === 0) {
    return false;
  }

  const comparator  = +valStr;
  const currentYear = new Date().getFullYear();

  switch (unit) {
    case DATE_UNIT.DAY:
      if (valStr.length <= 1 && comparator === 0) {
        return true;
      }
      if (comparator < 1 || comparator > 31) {
        return false;
      }
      break;
    case DATE_UNIT.MONTH:
      if (valStr.length <= 1 && comparator === 0) {
        return true;
      }
      if (comparator < 1 || comparator > 12) {
        return false;
      }
      break;
    case DATE_UNIT.YEAR:
      if (valStr.length === 1 && comparator !== 1 && comparator !== 2) {
        return false;
      }
      if (
        valStr.length === 2
        && !valStr.startsWith('19')
        && !valStr.startsWith('20')
      ) {
        return false;
      }
      if (
        valStr.length === 4
        && (comparator < 1900 || comparator > currentYear)
      ) {
        return false;
      }
      break;
    default:
      return false;
  }
  return true;
};

export const onDoBKeyPress = (
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

export const onDateOfBirthChange = (
  e: ChangeEvent<HTMLInputElement>,
  unit: DATE_UNIT,
  props: IQuestionData,
  config: QuestionableConfig,
  utilParams: TDoBUtilParams,
  comp,
  // eslint-disable-next-line sonarjs/cognitive-complexity
): void => {
  const {
    state, setState, setError, cookieName,
  } = utilParams;

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
  const bd                = comp.toBirthdate(state);
  const age               = getAge(bd);
  const monthIsValid      = isValid(DATE_UNIT.MONTH, state[DATE_UNIT.MONTH] || '');
  const dayIsValid        = isValid(DATE_UNIT.DAY, state[DATE_UNIT.DAY] || '');
  const yearIsValid       = isValid(DATE_UNIT.YEAR, state[DATE_UNIT.YEAR] || '');
  const message: string[] = [];
  if (age && bd) {
    setError({ message: '', type: 'info' });
    setAge(cookieName, age.years);
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age,
        birthdate: bd,
      },
    });
    comp.updateForm(bd, props, config);
    if (props.step.exitRequirements && age.years > 0) {
      const invalid = props.step.exitRequirements.every(
        (r) => r.minAge && age.years < r.minAge.years,
      );
      if (invalid) {
        const min = props.step.exitRequirements
          .map((r) => r.minAge?.years)
          .join(', ');
        // eslint-disable-next-line max-len
        let underAge = `Looks like that's a birthday for someone under age ${min}. `;
        underAge    += `Enter a birthday for someone who is age ${min} or over, `;
        underAge    += 'or tap "Go Back" to check eligibility for a child.';
        message.push(underAge);
      }
    }
  } else if ((monthIsValid || dayIsValid || yearIsValid)
    || (props.form?.age?.years && props.form.age.years > 0)) {
    let text = '';
    if ((yearIsValid && !monthIsValid) || (dayIsValid && !monthIsValid)) {
      text += ' month';
    }
    if ((yearIsValid && !dayIsValid)) {
      if (text.length > 0) {
        text += ' and';
      }
      text += ' day';
    }
    if (text.length > 0) {
      message.push(`Enter the ${text} you were born.`);
    }
  }
  if (message.length > 0) {
    setError({
      message: `"${message.join(' ')}`,
      type:    'error',
    });
    props.dispatchForm({
      type:  ACTION_TYPE.UPDATE,
      value: {
        age:       { years: 0 },
        birthdate: '',
      },
    });
  }
};

export const getDateInput = (
  unit: DATE_UNIT,
  label: string,
  props: IQuestionData,
  config: QuestionableConfig,
  utilParams: TDoBUtilParams,
): JSX.Element => {
  const { state }  = utilParams;
  let disabled     = true;
  const isDisabled = (u: DATE_UNIT, i?: string): boolean => {
    if (!i) {
      return true;
    }
    return !isValid(u, i);
  };
  let reqs         = {
    length: 2,
    max:    12,
    min:    1,
  };
  switch (unit) {
    case DATE_UNIT.DAY:
      disabled = isDisabled(DATE_UNIT.MONTH, state[DATE_UNIT.MONTH]);
      break;
    case DATE_UNIT.MONTH:
      disabled = false;
      break;
    case DATE_UNIT.YEAR:
      disabled =        isDisabled(DATE_UNIT.DAY, state[DATE_UNIT.DAY])
        || isDisabled(DATE_UNIT.MONTH, state[DATE_UNIT.MONTH]);
      reqs     = {
        length: 4,
        max:    new Date().getFullYear(),
        min:    1900,
      };
      break;
    default:
      break;
  }

  return (
    <DateInput
      id={Steps.getDomId(unit, props)}
      className={disabled ? CSS_CLASS.DISABLED_INPUT : ''}
      name={label}
      label={capitalize(unit)}
      aria-label={capitalize(unit)}
      unit={unit}
      disabled={disabled}
      maxLength={reqs.length}
      minLength={reqs.length}
      defaultValue={state[unit]}
      onChange={(e) => onDateOfBirthChange(e, unit, props, config, utilParams)}
      onKeyPress={(e) => onDoBKeyPress(e, unit)}
    />
  );
};

export const getAlertClass = (info: IInfoBox): string => {
  const type    = info.type === 'error' ? CSS_CLASS.DOB_ERROR : CSS_CLASS.DOB_INFO;
  const visible =    info.message.length > 0 ? CSS_CLASS.VISIBLE : CSS_CLASS.HIDDEN;
  return `${visible} ${type}`;
};

export const getInfoBox = (utilParams: TDoBUtilParams): JSX.Element => {
  const info = utilParams.error;
  if (info.message.trim().length === 0) {
    return noel();
  }
  return (
    <div className={getAlertClass(info)}>
      <div className={`usa-alert usa-alert--${info.type} usa-alert--slim`}>
        <div className="usa-alert__body">
          <p className="usa-alert__text">{info.message}</p>
        </div>
      </div>
    </div>
  );
};

export const getDateInputGroup = (
  label: string,
  props: IQuestionData,
  config: QuestionableConfig,
  utilParams: TDoBUtilParams,
): JSX.Element => (
  <div>
    <DateInputGroup role="group" aria-label={props.step.title}>
      {getDateInput(DATE_UNIT.MONTH, label, props, config, utilParams)}
      {getDateInput(DATE_UNIT.DAY, label, props, config, utilParams)}
      {getDateInput(DATE_UNIT.YEAR, label, props, config, utilParams)}
    </DateInputGroup>
    {getInfoBox(utilParams)}
  </div>
);
