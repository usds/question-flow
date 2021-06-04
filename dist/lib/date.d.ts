import { DateTime } from 'luxon';
import { TAge } from './types';
/**
 * Determines if a string can be parsed into a valid Date
 * @param dt
 * @returns
 */
export declare const isValidDate: (dt: string | undefined) => boolean;
/**
 * Gets a luxon DateTime object from a date string
 * @param dt DateTime as string- should always be in the format `MM/DD/YYYY`
 * @returns DateTime or undefined
 */
export declare const getDateTime: (dt: string) => DateTime | undefined;
/**
 * Gets an age from a DateTime object
 * @param dob - luxon DateTime
 * @returns an age with years, months, days
 */
export declare const getDateTimeAge: (dob: DateTime) => TAge;
/**
 * Parses a date/time string and returns an Age object
 * @param dateOfBirth - should always be in the format `MM/DD/YYYY`
 * @returns an age, if the date is valid
 */
export declare const getAge: (dateOfBirth: string | undefined) => TAge | undefined;
//# sourceMappingURL=date.d.ts.map