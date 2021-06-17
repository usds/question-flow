/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResult }         from '../../../../survey';
import { isFraCalculator } from './calculator.flow';
import { questions }       from './questions.flow';
import {
  YES,
  NO,
  NINETEEN_ONE,
  EIGHTEEN,
  SIXTY_ONE_EIGHT,
  SIXTY,
  IDK,
  SIXTY_FIVE,
} from './constants';

const {
  map: {
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
  },
} = questions;
const name = 'Benefit name';

const RETIREMENT: IResult = {
  id:           'RS.00201.001',
  label:        name,
  name:         'Retirement',
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
};

const SSDI = {
  id:    'DI.10105.060',
  label: name,
  name:
      'Disability, also referred to as benefits Disability Insurance (SSDI)',
  requirements: [
    {
      ageCalc:     (birthday: string): boolean => !isFraCalculator(birthday, 12),
      explanation:
          'You expect a condition to affect your ability to work for a year or more or be terminal.',
      minAge:    EIGHTEEN,
      responses: [
        { answers: [YES], question: D },
        { answers: [YES], question: H },
      ],
    },
  ],
};

const SSI: IResult = {
  id:           'SI.00501.001',
  label:        name,
  name:         'Supplemental Security Income (SSI)',
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
};

const MEDICARE: IResult = {
  id:           'HI.00801.006 / .191 / .146, HI.00805.005',
  label:        name,
  name:         'Medicare',
  requirements: [
    {
      explanation: 'You are between 64 years and 65 years and 3 months old.',
      maxAge:      {
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
};

const SPOUSE: IResult = {
  id:           'RS.00202.001',
  label:        name,
  name:         'Spouse',
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
            L.answers[1]],
          question: L,
        },
        // Spouse has benefits
        { answers: [YES], question: M },
      ],
    },
  ],
};

const SPOUSE_WITH_CHILD: IResult = {
  id:           'RS.01310.001, RS. 00208.005',
  label:        name,
  name:         'Spouse with Child in Care',
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
            L.answers[1]],
          question: L,
        },
        // Spouse has benefits
        { answers: [YES], question: M },
        // Has disabled children < 16
        { answers: [YES], question: T },
      ],
    },
  ],
};

const DIVORCED_SPOUSE: IResult = {
  id:           'RS.00202.005',
  label:        name,
  name:         'Divorced Spouse',
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
        { answers: [L.answers[2]], question: L },
        { answers: [YES], question: O },
        { answers: [YES], question: P },
        { answers: [YES, IDK], question: Q },
      ],
    },
  ],
};

const WIDOWERS: IResult = {
  id:           'RS.00207.001',
  label:        name,
  name:         'Widowers',
  requirements: [
    {
      explanation:
          "You lost your spouse and they worked before they passed away. And, you meet our age qualification for this benefit because you're 60 or older.",
      minAge:    SIXTY,
      responses: [
        // Not married, but was in the past
        { answers: [L.answers[2]], question: L },
        // Spouse is deceased
        { answers: [YES], question: R },
        // Spouse worked
        { answers: [YES], question: S },
      ],
    },
  ],
};

const DISABLED_WIDOWERS: IResult = {
  id:           'RS.00207.001',
  label:        name,
  name:         'Disabled Widowers',
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
};

const LUMP_SUM: IResult = {
  id:           'RS.00210.001',
  label:        name,
  name:         'Lump Sum Death Payment, a one-time payment',
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
};

const CHILD_AUX: IResult = {
  id:           'RS.00203.001',
  label:        name,
  name:         "Child's Auxiliary",
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
            BB.answers[0],
            // Parents might receive SS
            BB.answers[2],
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
        { answers: [I.answers[0]], question: I },
        { answers: [YES, IDK], question: W },
      ],
    },
  ],
};

const CHILD_SURVIVOR: IResult = {
  id:           'RS.00203.001',
  label:        name,
  name:         "Child's Survivor",
  requirements: [
    {
      explanation: 'You expect a condition to affect your ability to work for a year or more and it started to affect you before you turned 22. You also lost a parent.',
      minAge:      { months: 0, years: 22 },
      responses:   [
        // Not in high school
        { answers: [NO], question: C },
        { answers: [YES], question: H },
        { answers: [I.answers[0]], question: I },
        { answers: [YES], question: U },
      ],
    },
  ],
};

const CHILD_DISABILITY: IResult = {
  id:           'DI.10115.001',
  label:        name,
  name:         'Childhood Disability',
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
};

const STUDENT_AUX: IResult = {
  id:           'RS.00205.001',
  label:        name,
  name:         'Student Auxiliary',
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
};

const STUDENT_SURVIVOR: IResult = {
  id:           'RS.00205.001',
  label:        name,
  name:         'Student Survivor',
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
};

const MOTHER_FATHER: IResult = {
  id:           'RS.00208.001',
  label:        name,
  name:         "Mother/Father's",
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
};

/**
 * All possible results with their requirements
 */
const resultList: IResult[] = [
  RETIREMENT,
  SSDI,
  SSI,
  MEDICARE,
  SPOUSE,
  SPOUSE_WITH_CHILD,
  DIVORCED_SPOUSE,
  WIDOWERS,
  DISABLED_WIDOWERS,
  LUMP_SUM,
  CHILD_AUX,
  CHILD_SURVIVOR,
  CHILD_DISABILITY,
  STUDENT_AUX,
  STUDENT_SURVIVOR,
  MOTHER_FATHER,
];

const resultMap = {
  CHILD_AUX,
  CHILD_DISABILITY,
  CHILD_SURVIVOR,
  DISABLED_WIDOWERS,
  DIVORCED_SPOUSE,
  LUMP_SUM,
  MEDICARE,
  MOTHER_FATHER,
  RETIREMENT,
  SPOUSE,
  SPOUSE_WITH_CHILD,
  SSDI,
  SSI,
  STUDENT_AUX,
  STUDENT_SURVIVOR,
  WIDOWERS,
};

export const results = {
  list: resultList,
  map:  resultMap,
};
