import { getDateTime, getDateTimeAge } from '../../lib/date';

/**
 * Custom SSA calculator to compute Full Retirement Age (FRA)
 * @param dob Date of Birth as a string
 * @param monthOffset optional number of months to adjust calculation
 * @returns true if the given date is FRA as of now
 */
export const isFraCalculator = (dob: string, monthOffset = 0): boolean => {
  const dateOfBirth = getDateTime(dob);
  if (!dateOfBirth) return false;

  let fra = dateOfBirth;
  // If the birthday is on the 1st of the month, FRA is calculated from the previous month
  // NOTE: if on 01/01, this will roll birthday back to the previous year
  if (dateOfBirth.day === 1) {
    fra = dateOfBirth.minus({ day: 1 });
  }
  // Frequently, calculations are in the form of FRA + 12 months or FRA - n months
  fra = fra.plus({ months: monthOffset });

  const age = getDateTimeAge(fra);
  if (!age) return false;

  // Anyone 67 or more is always FRA
  if (age.years >= 67) {
    return true;
  }

  // No one has an FRA before 66
  if (age.years < 66) {
    return false;
  }

  // Everyone born on or before 1954 retires at 66
  if (fra.year <= 1954) {
    return age.years >= 66;
  }

  // Everyone born after 1960 retires at 67
  if (fra.year >= 1960) {
    return age.years >= 67;
  }

  // The edge cases for FRA for 2021
  // In 2022, the 1955 case will drop; in 2023, the 1956, etc.
  switch (fra.year) {
    case 1955:
      return age.years === 66 && age.months >= 2;
    case 1956:
      return age.years === 66 && age.months >= 4;
    case 1957:
      return age.years === 66 && age.months >= 6;
    case 1958:
      return age.years === 66 && age.months >= 8;
    case 1959:
      return age.years === 66 && age.months >= 10;
    default:
      throw new Error(`Year ${fra.year} is not valid`);
  }
};
