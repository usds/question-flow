/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResult }         from '../../../../survey';
import { isFraCalculator } from './calculator.flow';
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
} from './constants';
import { questions } from './questions.flow';

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
  action:       APPLY_ONLINE_ACTION,
  id:           'RS.00201.001',
  label:        name,
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
  secondaryAction: {
    buttons: [
      {
        label: 'Estimate payment amount at various ages',
        link:  '#',
        mode:  'link',
      },
    ],
    id:       '3',
    subTitle:
      "You may meet the requirements to receive Retirement, but it's up to you to decide when you want to apply. The monthly amount you can receive increases as you get older. You'll get the highest possible amount if you apply at age 70.",
    title: 'When to apply for Retirement',
  },
  title: 'Retirement',
};

const SSDI: IResult = {
  action:       APPLY_ONLINE_ACTION,
  id:           'DI.10105.060',
  label:        name,
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
  title: 'Disability, also referred to as benefits Disability Insurance (SSDI)',
};

const SSI: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'SI.00501.001',
  label:        name,
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
  title: 'Supplemental Security Income (SSI)',
};

const MEDICARE: IResult = {
  action:       APPLY_ONLINE_ACTION,
  id:           'HI.00801.006 / .191 / .146, HI.00805.005',
  label:        name,
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
  secondaryAction: {
    buttons: [
      {
        label: 'Determine when to sign up for Medicare',
        link:  '#',
        mode:  'link',
      },
    ],
    id:       '3',
    subTitle:
      "The deadline to sign up for Medicare Parts A & B depends on what age you want to apply for your Retirement benefit. Plan ahead to make sure you don't miss the enrollment period.",
    title: 'Plan ahead for Medicare Parts A & B',
  },
  title: 'Medicare',
};

const SPOUSE: IResult = {
  action:       APPLY_ONLINE_ACTION,
  id:           'RS.00202.001',
  label:        name,
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
            L.answers[1],
          ],
          question: L,
        },
        // Spouse has benefits
        { answers: [YES], question: M },
      ],
    },
  ],
  title: 'Spouse',
};

const SPOUSE_WITH_CHILD: IResult = {
  action:       APPLY_ONLINE_ACTION,
  id:           'RS.01310.001, RS. 00208.005',
  label:        name,
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
            L.answers[1],
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
  title: 'Spouse with Child in Care',
};

const DIVORCED_SPOUSE: IResult = {
  action:       APPLY_ONLINE_ACTION,
  id:           'RS.00202.005',
  label:        name,
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
  title: 'Divorced Spouse',
};

const WIDOWERS: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00207.001',
  label:        name,
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
  title: 'Widowers',
};

const DISABLED_WIDOWERS: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00207.001',
  label:        name,
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
  title: 'Disabled Widowers',
};

const LUMP_SUM: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00210.001',
  label:        name,
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
  title: 'Lump Sum Death Payment, a one-time payment',
};

const CHILD_AUX: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00203.001',
  label:        name,
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
  title: "Child's Auxiliary",
};

const CHILD_SURVIVOR: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00203.001',
  label:        name,
  requirements: [
    {
      explanation:
        'You expect a condition to affect your ability to work for a year or more and it started to affect you before you turned 22. You also lost a parent.',
      minAge:    { months: 0, years: 22 },
      responses: [
        // Not in high school
        { answers: [NO], question: C },
        { answers: [YES], question: H },
        { answers: [I.answers[0]], question: I },
        { answers: [YES], question: U },
      ],
    },
  ],
  title: "Child's Survivor",
};

const CHILD_DISABILITY: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'DI.10115.001',
  label:        name,
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
  title: 'Childhood Disability',
};

const STUDENT_AUX: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00205.001',
  label:        name,
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
  title: 'Student Auxiliary',
};

const STUDENT_SURVIVOR: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00205.001',
  label:        name,
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
  title: 'Student Survivor',
};

const MOTHER_FATHER: IResult = {
  action:       APPLY_BY_PHONE_ACTION,
  id:           'RS.00208.001',
  label:        name,
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
  title: "Mother/Father's",
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
