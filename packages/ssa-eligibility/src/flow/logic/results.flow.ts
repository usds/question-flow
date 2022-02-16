/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
                camelcase,
 */
import { merge }           from 'lodash';
import { IResult }         from '@usds.gov/questionable';
import { isFraCalculator } from '../lib/calculator.flow';
import {
  LEARN_HOW_TO_APPLY_ACTION,
  EIGHTEEN,
  IDK,
  NINETEEN_ONE,
  NO,
  SIXTY,
  SIXTY_FIVE,
  SIXTY_TWO,
  YES,
} from '../lib/constants';
import { TQuestionMap, TResultMap } from '../lib/contentMap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildResults = (json: TResultMap, questionMap: TQuestionMap) => {
  const {
    A,
    AA,
    BB,
    C,
    CC,
    D,
    DD,
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r1',
      requirements: [
        {
          explanation:
            "You've worked for ten years or more and meet the age qualification because you're 62 or older.",
          minAge:    SIXTY_TWO,
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
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

  const exp65SSI = 'You meet the age qualification because you\'re 65 or older. And, you may need help paying for essentials like food, clothing, and a home.';
  /**
   * SSDI (Age 65+)
   */
  const r3_1: IResult = merge(
    {
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r3',
      requirements: [
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [YES, NO], question: D },
            { answers: [YES], question: J },
            { answers: [YES, NO], question: K },
          ],
        },
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [NO], question: D },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [YES], question: D },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [NO], question: D },
            { answers: [YES], question: J },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [NO], question: D },
            { answers: [YES], question: J },
            { answers: [NO], question: K },
          ],
        },
        {
          explanation: exp65SSI,
          minAge:      SIXTY_FIVE,
          responses:   [
            { answers: [YES], question: D },
            { answers: [NO], question: J },
            { answers: [YES], question: K },
          ],
        },
      ],
    },
    json.r3_1,
  ) as IResult;

  const expAdultSSI = 'You may need help paying for essentials like food, clothing, and a home. You also have a condition and expect it to affect your ability to work for a year or more.';
  const expChildSSI = 'The child has a condition and you expect it to affect their daily activities for a year or more. And, the child\'s parent(s) may need help paying for essentials like food, clothing, and a home.';

  /**
   * SSDI (Disability Supplement)
   */
  const r3: IResult = merge(
    {
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r3',
      requirements: [
        {
          explanation: expAdultSSI,
          maxAge:      { months: 12, years: 64 },
          responses:   [
            { answers: [YES], question: H },
            { answers: [YES], question: K },
          ],
        },
        {
          explanation: expAdultSSI,
          maxAge:      { months: 12, years: 64 },
          responses:   [
            { answers: [YES], question: H },
            { answers: [YES], question: J },
          ],
        },
        {
          explanation: expAdultSSI,
          minAge:      EIGHTEEN,
          responses:   [
            { answers: [YES], question: G },
            { answers: [NO, { id: '2' }], question: { id: 'V' } },
          ],
        },
        {
          explanation: expChildSSI, // 12
          responses:   [
            { answers: [YES], question: Y },
            { answers: [YES], question: Z },
            { answers: [NO], question: AA },
          ],
        },
        {
          explanation: expChildSSI, // 5
          responses:   [
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [YES], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation: expChildSSI, // 6
          responses:   [
            { answers: [YES], question: Y },
            { answers: [NO], question: CC },
            { answers: [NO], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation: expChildSSI, // 7
          responses:   [
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [YES], question: DD },
            { answers: [NO], question: EE },
          ],
        },
        {
          explanation: expChildSSI, // 9
          responses:   [
            { answers: [YES], question: Y },
            { answers: [YES], question: CC },
            { answers: [NO], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation: expChildSSI, // 8
          responses:   [
            { answers: [YES], question: Y },
            { answers: [NO], question: CC },
            { answers: [YES], question: DD },
            { answers: [YES], question: EE },
          ],
        },
        {
          explanation: expChildSSI, // 10
          responses:   [
            { answers: [YES], question: Y },
            { answers: [NO], question: CC },
            { answers: [YES], question: DD },
            { answers: [NO], question: EE },
          ],
        },
      ],
    },
    json.r3,
  ) as IResult;

  /**
   * Medicare
   */
  // const r4: IResult = merge(
  //   {
  //     action:       LEARN_HOW_TO_APPLY_ACTION,
  //     id:           'r4',
  //     requirements: [
  //       {
  //         explanation:
  //           'You are between 64 years and 65 years and 3 months old.',
  //         maxAge: {
  //           months: 3,
  //           years:  65,
  //         },
  //         minAge: {
  //           months: 0,
  //           years:  64,
  //         },
  //         responses: [],
  //       },
  //     ],
  //   },
  //   json.r4,
  // ) as IResult;

  /**
   * Spouse
   */
  const r5: IResult = merge(
    {
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r5',
      requirements: [
        {
          explanation:
            "Your spouse gets Social Security benefits or plans to apply for them soon. And, you meet the age qualification because you're 62 or older.",
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r6',
      requirements: [
        {
          explanation:
            'Your spouse gets Social Security benefits or plans to apply for them soon. And, you have kids who are disabled or under 16.',
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r7',
      requirements: [
        {
          explanation:
            "Your ex-spouse worked and you were married to them for ten years or more. And, you meet the age qualification because you're 62 or older.",
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r8',
      requirements: [
        {
          explanation:
            "Your spouse died and they worked before they passed away. And, you meet the age qualification because you're 60 or older.",
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r9',
      requirements: [
        {
          explanation:
            "Your spouse died and they worked before they passed away. You also have a condition and expect it to affect your ability to work for a year or more. And, you meet the age qualification because you're between 50 and 60.",
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r10',
      requirements: [
        {
          explanation: 'The child\'s parent(s) died.',
          responses:   [
            // Child has experienced loss of parent
            { answers: [YES], question: Z },
          ],
        },
        {
          explanation: 'Your spouse died and they worked before they passed away.',
          minAge:      EIGHTEEN,
          responses:   [
            // Spouse is deceased
            { answers: [YES], question: R },
            // Spouse worked
            { answers: [YES], question: S },
          ],
        },
        {
          explanation: 'Your parent(s) died.',
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r11',
      requirements: [
        {
          explanation:
            "The child's parent(s) get Social Security benefits, so the child may be eligible to receive them too.",
          responses: [
            // Is under 18
            { answers: [NO], question: A },
            {
              answers:  [YES, IDK],
              question: BB,
            },
          ],
        },
        {
          explanation:
            'You have a condition and expect it to affect your ability to work for a year or more. It started to affect you before you turned 22. And, your parent(s) get Social Security benefits or plan to apply for them soon.',
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r12',
      requirements: [
        {
          explanation:
            'The child\'s parent(s) died, so the child may be eligible to receive a monthly benefit.',
          responses: [
            // Lost a parent
            { answers: [YES], question: Z },
          ],
        },
      ],
    },
    json.r12,
  ) as IResult;

  // const r12: IResult = merge(
  //   {
  //     action:       LEARN_HOW_TO_APPLY_ACTION,
  //     id:           'r12',
  //     requirements: [
  //       {
  //         explanation:
  //           'You have a condition and expect it to affect your ability to work for a year or more. It started to affect you before you turned 22. And, your parent(s) died.',
  //         minAge:    { months: 0, years: 22 },
  //         responses: [
  //           // Not in high school
  //           { answers: [NO], question: C },
  //           // Disabled
  //           { answers: [YES], question: H },
  //           // Started before 22
  //           { answers: [NO], question: I },
  //           // Lost a parent
  //           { answers: [YES], question: U },
  //         ],
  //       },
  //     ],
  //   },
  //   json.r12,
  // ) as IResult;

  /**
   * Child disability
   */
  const r13: IResult = merge(
    {
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r13',
      requirements: [
        {
          explanation:
            'You have a condition and expect it to affect your ability to work for a year or more. It started to affect you before you turned 22. And, your parent(s) died.',
          responses: [
            // Has disability
            { answers: [YES], question: G },
            // Started before 22
            { answers: [YES], question: I },
            // Lost a parent
            { answers: [YES], question: U },
          ],
        },
        {
          explanation:
            'You have a condition and expect it to affect your ability to work for a year or more. It started to affect you before you turned 22. And, your parent(s) get Social Security benefits or plan to apply for them soon.',
          responses: [
            // Has disability
            { answers: [YES], question: G },
            // Started before 22
            { answers: [YES], question: I },
            // Parents get SS
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r14',
      requirements: [
        {
          explanation:
            'You go to elementary or high school full time. And, your parent(s) get Social Security benefits or plan to apply for them soon.',
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r15',
      requirements: [
        {
          explanation: 'You go to elementary or high school full time and your parent(s) died.',
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
      action:       LEARN_HOW_TO_APPLY_ACTION,
      id:           'r16',
      requirements: [
        {
          explanation:
            'Your spouse died and they worked before they passed away. And, you have kids who are disabled or under 16.',
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
    r3_1,
    // r4,
    r10,
    r5,
    r6,
    r7,
    r8,
    r9,
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
    r3_1,
    // r4,
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
