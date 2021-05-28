import { DateInput, DateInputGroup } from '@trussworks/react-uswds';
import { kebabCase } from 'lodash';
import { DateTime } from 'luxon';
import { ChangeEvent } from 'react';
import { getAge, getDateTime } from '../../lib/date';
import { IStep } from '../../survey/IStep';
import { StepLayout } from '../wizard/StepLayout';

export const DateOfBirthStep = (props: IStep): JSX.Element => {
  const { question } = props;
  if (!question) {
    return <></>;
  }

  type TDobProp = 'month' | 'day' | 'year';

  const getBirthdate = (): DateTime | undefined => {
    if (props.form.birthdate) {
      return getDateTime(props.form.birthdate);
    }
    return undefined;
  };

  const defaultValue = (unit: TDobProp): string | undefined => {
    const dt = getBirthdate();
    if (!dt) {
      return undefined;
    }
    switch (unit) {
      case 'month':
        return `${dt.month}`.padStart(2, '0');
      case 'day':
        return `${dt.day}`.padStart(2, '0');
      case 'year':
        return `${dt.year}`;
      default:
        throw new Error(`Unit ${unit} is not valid`);
    }
  };

  // Internal state for assembling DoB from individual inputs
  const dob: {
    month?: string;
    day?: string;
    year?: string;
    toBirthdate: () => string | undefined;
  } = {
    month: getBirthdate()?.month?.toString(),
    day: getBirthdate()?.day?.toString(),
    year: getBirthdate()?.year?.toString(),
    toBirthdate: () => {
      if (dob.month && dob.day && dob.year) {
        return `${dob.month.padStart(2, '0')}/${dob.day.padStart(2, '0')}/${
          dob.year
        }`;
      }
      return undefined;
    },
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, prop: TDobProp) => {
    const val = e.target.value;
    if (!val) {
      return;
    }
    dob[prop] = val;
    const bd = dob.toBirthdate();
    const age = getAge(bd);
    if (age) {
      props.dispatchForm({
        type: 'UPDATE',
        value: {
          birthdate: bd,
          age,
        },
      });
    }
  };

  const getFieldSetName = () => kebabCase(props.question.questionText);

  const getDomId = (prop: TDobProp) => {
    const name = getFieldSetName();
    return `${name}-${kebabCase(prop)}`;
  };

  return (
    <StepLayout {...props}>
      <DateInputGroup>
        <DateInput
          id={getDomId('month')}
          name="date_of_birth"
          label="Month"
          unit="month"
          maxLength={2}
          minLength={2}
          defaultValue={defaultValue('month')}
          onChange={(e) => onChange(e, 'month')}
        />
        <DateInput
          id={getDomId('day')}
          name="date_of_birth"
          label="Day"
          unit="day"
          maxLength={2}
          minLength={2}
          defaultValue={defaultValue('day')}
          onChange={(e) => onChange(e, 'day')}
        />
        <DateInput
          id={getDomId('year')}
          name="date_of_birth"
          label="Year"
          unit="year"
          maxLength={4}
          minLength={4}
          defaultValue={defaultValue('year')}
          onChange={(e) => onChange(e, 'year')}
        />
      </DateInputGroup>
    </StepLayout>
  );
};
