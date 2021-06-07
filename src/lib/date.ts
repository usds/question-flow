import { DateTime } from 'luxon';
import { TAge } from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

/**
 * Determines if a string can be parsed into a valid Date
 * @param dt
 * @returns
 */
export const isValidDate = (dt: string | undefined): boolean => {
  if (!dt || dt.length < 8) return false;
  if (!moment(dt, 'MM/DD/YYYY', true).isValid()) return false;
  return true;
};

/**
 * Gets a luxon DateTime object from a date string
 * @param dt DateTime as string- should always be in the format `MM/DD/YYYY`
 * @returns DateTime or undefined
 */
export const getDateTime = (dt: string): DateTime | undefined => {
  if (!isValidDate(dt)) return undefined;
  const date = new Date(
    +dt.substring(6, 10),
    +dt.substring(0, 2) - 1,
    +dt.substring(3, 5),
  );
  return DateTime.fromJSDate(date);
};

/**
 * Gets an age from a DateTime object
 * @param dob - luxon DateTime
 * @returns an age with years, months, days
 */
export const getDateTimeAge = (dob: DateTime): TAge => {
  const now = DateTime.now();

  const yearNow = now.year;
  const monthNow = now.month;
  const dateNow = now.day;

  const yearDob = dob.year;
  const monthDob = dob.month;
  const dateDob = dob.day;

  let years = yearNow - yearDob;
  let months = 0;

  if (monthNow >= monthDob) {
    months = monthNow - monthDob;
  } else {
    years -= 1;
    months = 12 + monthNow - monthDob;
  }

  let days = 0;
  if (dateNow >= dateDob) {
    days = dateNow - dateDob;
  } else {
    // eslint-disable-next-line no-multi-spaces
    days = 31 + dateNow - dateDob;
    months += -1;
    if (months < 0) {
      months = 11;
      years -= 1;
    }
  }

  return {
    days,
    months,
    years,
  };
};

/**
 * Parses a date/time string and returns an Age object
 * @param dateOfBirth - should always be in the format `MM/DD/YYYY`
 * @returns an age, if the date is valid
 */
export const getAge = (dateOfBirth: string | undefined): TAge | undefined => {
  if (!dateOfBirth || !isValidDate(dateOfBirth)) return undefined;

  const dob = getDateTime(dateOfBirth);
  if (!dob) return undefined;

  return getDateTimeAge(dob);
};
