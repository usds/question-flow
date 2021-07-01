/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { merge }           from 'lodash';
import { IResult }         from '../../../../survey';
import { isFraCalculator } from '../lib/calculator.flow';
import {
  APPLY_BY_PHONE_ACTION,
  APPLY_ONLINE_ACTION,
  EIGHTEEN,
  IDK,
  NINETEEN_ONE,
  NO,
  SIXTY,
  SIXTY_FIVE,
  SIXTY_ONE_EIGHT,
  YES,
} from '../lib/constants';
import { TQuestionMap, TResultMap } from '../lib/contentMap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildResults = (json: TResultMap, questionMap: TQuestionMap) => {
  const {
    A,
    BB,
    C,
    CC,
    D,
    DD,
    E,
    EE,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    W,
    Y,
    Z,
  } = questionMap;

  /**
   * Retirement
   */
  const r1: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r1',
      requirements: [
        {
          explanation:
            "You've worked for 10 years or more and you meet our age qualification for this benefit because you're 61 and 8 months or older.",
          minAge:    SIXTY_ONE_EIGHT,
          responses: [
            { answers: [YES], question: D },
            { answers: [YES], question: F },
          ],
        },
      ],
    },
    json.r1,
  ) as IResult;

  /**
   * SSI
   */
  const r2: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r2',
      requirements: [
        {
          ageCalc: (birthday: string): boolean =>
            !isFraCalculator(birthday, 12),
          explanation:
            'You expect a condition to affect your ability to work for a year or more or be terminal.',
          minAge:    EIGHTEEN,
          responses: [
            { answers: [YES], question: D },
            { answers: [YES], question: H },
          ],
        },
      ],
    },
    json.r2,
  ) as IResult;

  /**
   * SSDI
   */
  const r3: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r3',
      requirements: [
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [YES], question: E },
            { answers: [YES], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [NO], question: E },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [YES], question: E },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [NO], question: E },
            { answers: [YES], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [NO], question: E },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation:
            "You meet our age qualification for this benefit because you're 65 or older. And, you may need help paying for basic needs like food, clothing, and a home.",
          minAge:    SIXTY_FIVE,
          responses: [
            { answers: [YES], question: E },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [YES], question: E },
            { answers: [YES], question: H },
            { answers: [YES], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [NO], question: E },
            { answers: [YES], question: H },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [YES], question: E },
            { answers: [YES], question: H },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation:
            'You may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [NO], question: E },
            { answers: [YES], question: H },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation:
            'You may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [YES], question: E },
            { answers: [YES], question: H },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You expect a condition to affect your ability to work for a year or more or be terminal. And, you may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [NO], question: D },
            { answers: [YES], question: H },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You expect a condition to affect your ability to work for a year or more or be terminal. And, you may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [NO], question: D },
            { answers: [YES], question: H },
            { answers: [YES], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation:
            'You expect a condition to affect your ability to work for a year or more or be terminal. And, you may need help paying for basic needs like food, clothing, and a home.',
          maxAge:    { months: 12, years: 64 },
          responses: [
            { answers: [NO], question: D },
            { answers: [YES], question: H },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation:
            'You said you have difficulty paying for food and a home. And, a disability affects your ability to work.',
          minAge:    EIGHTEEN,
          responses: [
            { answers: [YES], question: G },
            { answers: [NO, { id: '2' }], question: { id: 'V' } },
          ],
        },
        {
          explanation:
            "You expect the child's condition to affect their daily activities for a year or longer or be terminal. And, the child's parent(s) may need help paying for basic needs like food, clothing, and a home.",
          responses: [
            { answers: [NO], question: A },
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [YES], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation:
            "You expect the child's condition to affect their daily activities for a year or longer or be terminal. And, the child's parent(s) may need help paying for basic needs like food, clothing, and a home.",
          responses: [
            { answers: [NO], question: A },
            { answers: [YES], question: Y },
            { answers: [NO], question: CC },
            { answers: [NO], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation:
            "You expect the child's condition to affect their daily activities for a year or longer or be terminal. And, the child's parent(s) may need help paying for basic needs like food, clothing, and a home.",
          responses: [
            { answers: [NO], question: A },
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [YES], question: DD },
            { answers: [NO], question: EE },
          ],
        },
        {
          explanation:
            "You expect the child's condition to affect their daily activities for a year or longer or be terminal. And, the child's parent(s) may need help paying for basic needs like food, clothing, and a home.",
          responses: [
            { answers: [NO], question: A },
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [NO], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation:
            "You expect the child's condition to affect their daily activities for a year or longer or be terminal. And, the child's parent(s) may need help paying for basic needs like food, clothing, and a home.",
          responses: [
            { answers: [NO], question: A },
            { answers: [YES], question: Y },
            { answers: [NO], question: CC },
            { answers: [YES], question: DD },
            { answers: [YES], question: EE },
          ],
        },
      ],
    },
    json.r3,
  ) as IResult;

  /**
   * Medicare
   */
  const r4: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r4',
      requirements: [
        {
          explanation:
            'You are between 64 years and 65 years and 3 months old.',
          maxAge: {
            months: 3,
            years:  65,
          },
          minAge: {
            months: 0,
            years:  64,
          },
          responses: [],
        },
      ],
    },
    json.r4,
  ) as IResult;

  /**
   * Spouse
   */
  const r5: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r5',
      requirements: [
        {
          explanation:
            "Your spouse gets Social Security benefits and you meet our age qualification for this benefit because you're 62 or older.",
          minAge: {
            months: 0,
            years:  62,
          },
          responses: [
            {
              answers: [
                // Married
                YES,
                // Married but separated
                { id: '1' },
              ],
              question: L,
            },
            // Spouse has benefits
            { answers: [YES], question: M },
          ],
        },
      ],
    },
    json.r5,
  ) as IResult;

  /**
   * Spouse with child
   */
  const r6: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r6',
      requirements: [
        {
          explanation:
            'Your spouse gets benefits checks every month and you take care of kids under the age of 16.',
          maxAge:    { months: 12, years: 61 },
          minAge:    EIGHTEEN,
          responses: [
            {
              answers: [
                // Married
                YES,
                // Married but separated
                { id: '1' },
              ],
              question: L,
            },
            // Spouse has benefits
            { answers: [YES], question: M },
            // Has disabled children < 16
            { answers: [YES], question: T },
          ],
        },
      ],
    },
    json.r6,
  ) as IResult;

  /**
   * Divorced spouse
   */
  const r7: IResult = merge(
    {
      action:       APPLY_ONLINE_ACTION,
      id:           'r7',
      requirements: [
        {
          explanation:
            "Your former spouse worked and you were married to them for 10 years or more. And, you meet our age qualification for this benefit because you're 62 or older.",
          minAge: {
            months: 0,
            years:  62,
          },
          responses: [
            // Not married, but was in the past
            { answers: [{ id: '2' }], question: L },
            { answers: [YES], question: O },
            { answers: [YES], question: P },
            { answers: [YES, IDK], question: Q },
          ],
        },
      ],
    },
    json.r7,
  ) as IResult;

  /**
   * Widowers
   */
  const r8: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r8',
      requirements: [
        {
          explanation:
            "You lost your spouse and they worked before they passed away. And, you meet our age qualification for this benefit because you're 60 or older.",
          minAge:    SIXTY,
          responses: [
            // Not married, but was in the past
            { answers: [{ id: '2' }], question: L },
            // Spouse is deceased
            { answers: [YES], question: R },
            // Spouse worked
            { answers: [YES], question: S },
          ],
        },
      ],
    },
    json.r8,
  ) as IResult;

  /**
   * Disabled widowers
   */
  const r9: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r9',
      requirements: [
        {
          explanation:
            "You lost your spouse and expect a condition to affect your ability to work for a year or more or be terminal. And, you meet our age qualification for this benefit because you're between 50 and 60.",
          maxAge: {
            months: 12,
            years:  59,
          },
          minAge: {
            months: 0,
            years:  50,
          },
          responses: [
            // Disabled
            { answers: [YES], question: G },
            // Not married, but was in past
            { answers: [YES], question: R },
            // Spouse is deceased
            { answers: [YES], question: S },
          ],
        },
      ],
    },
    json.r9,
  ) as IResult;

  /**
   * Lump sum
   */
  const r10: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r10',
      requirements: [
        {
          explanation: 'The child lost a parent.',
          responses:   [
            // Is under 18
            { answers: [YES], question: A },
            // Child has experienced loss of parent
            { answers: [YES], question: Z },
          ],
        },
        {
          explanation: 'You lost your spouse.',
          minAge:      EIGHTEEN,
          responses:   [
            // Spouse is deceased
            { answers: [YES], question: R },
            // Spouse worked
            { answers: [YES], question: S },
          ],
        },
        {
          explanation: 'You lost a parent.',
          minAge:      EIGHTEEN,
          responses:   [
            // Has lost a parent
            { answers: [YES], question: U },
          ],
        },
      ],
    },
    json.r10,
  ) as IResult;

  /**
   * Child aux
   */
  const r11: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r11',
      requirements: [
        {
          explanation:
            "The child's parent(s) get Social Security benefits, so the child may be eligible to receive them too.",
          responses: [
            // Is under 18
            { answers: [NO], question: A },
            {
              answers: [
                // Parents receive SS
                { id: '0' },
                // Parents might receive SS
                { id: '2' },
              ],
              question: BB,
            },
          ],
        },
        {
          explanation:
            'You expect a condition to affect your ability to work for a year or more and it started to affect you before you turned 22. Your parent(s) also get Social Security benefits.',
          minAge: {
            months: 0,
            years:  22,
          },
          responses: [
            // Is not in high school
            { answers: [NO], question: C },
            { answers: [YES], question: H },
            { answers: [{ id: '0' }], question: I },
            { answers: [YES, IDK], question: W },
          ],
        },
      ],
    },
    json.r11,
  ) as IResult;

  /**
   * Child survivor
   */
  const r12: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r12',
      requirements: [
        {
          explanation:
            'You expect a condition to affect your ability to work for a year or more and it started to affect you before you turned 22. You also lost a parent.',
          minAge:    { months: 0, years: 22 },
          responses: [
            // Not in high school
            { answers: [NO], question: C },
            { answers: [YES], question: H },
            { answers: [{ id: '0' }], question: I },
            { answers: [YES], question: U },
          ],
        },
      ],
    },
    json.r12,
  ) as IResult;

  /**
   * Child disability
   */
  const r13: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r13',
      requirements: [
        {
          explanation:
            'A condition started to affect your daily activities and ability to work before you turned 22.',
          responses: [
            { answers: [YES], question: G },
            { answers: [YES], question: I },
            { answers: [YES], question: U },
          ],
        },
        {
          explanation:
            'A condition started to affect your daily activities and ability to work before you turned 22.',
          responses: [
            { answers: [YES], question: G },
            { answers: [YES], question: I },
            { answers: [YES], question: W },
          ],
        },
      ],
    },
    json.r13,
  ) as IResult;

  /**
   * Student Aux
   */
  const r14: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r14',
      requirements: [
        {
          explanation:
            'You go to high school full time and your parent(s) get Social Security benefits.',
          maxAge:    NINETEEN_ONE,
          minAge:    EIGHTEEN,
          responses: [
            // In high school
            { answers: [YES], question: C },
            { answers: [YES, IDK], question: W },
          ],
        },
      ],
    },
    json.r14,
  ) as IResult;

  /**
   * Student survivor
   */
  const r15: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r15',
      requirements: [
        {
          explanation: 'You go to high school full time and lost a parent.',
          maxAge:      NINETEEN_ONE,
          minAge:      EIGHTEEN,
          responses:   [
            // In high school
            { answers: [YES], question: C },
            // Has lost a parent
            { answers: [YES], question: U },
          ],
        },
      ],
    },
    json.r15,
  ) as IResult;

  /**
   * Mother/father
   */
  const r16: IResult = merge(
    {
      action:       APPLY_BY_PHONE_ACTION,
      id:           'r16',
      requirements: [
        {
          explanation:
            'You lost your spouse and they worked before they passed away. And, you have kids who are disabled or under 16.',
          maxAge:    { months: 12, years: 59 },
          minAge:    EIGHTEEN,
          responses: [
            // Deceased spouse worked
            { answers: [YES], question: S },
            // Has children < 16
            { answers: [YES], question: T },
          ],
        },
      ],
    },
    json.r16,
  ) as IResult;

  /**
   * All possible results with their requirements
   */
  const resultList: IResult[] = [
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
    r10,
    r11,
    r12,
    r13,
    r14,
    r15,
    r16,
  ];

  const resultMap = {
    r1,
    r10,
    r11,
    r12,
    r13,
    r14,
    r15,
    r16,
    r2,
    r3,
    r4,
    r5,
    r6,
    r7,
    r8,
    r9,
  };

  return {
    list: resultList,
    map:  resultMap,
  };
};
