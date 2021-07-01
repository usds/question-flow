/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IBranch }         from '../../../../survey/IBranch';
import { IQuestion }       from '../../../../survey';
import { QUESTION_TYPE }   from '../../../../lib';
import { isFraCalculator } from './calculator.flow';
import {
  YES,
  NO,
  NINETEEN_ONE,
  EIGHTEEN,
  WORK,
  SIXTY_ONE_EIGHT,
  FAMILY,
  SIXTY,
  IDK,
  CHILD_FAMILY,
  DISABILITY,
} from './constants';

/**
 * 18 or under 18
 */
const A: IQuestion = {
  answers: [
    { id: '0', title: 'An adult (age 18 and over)' },
    { id: '1', title: 'A child (under age 18)' },
  ],
  id:      'A',
  section: { id: 'introduction' },
  title:   'Who do you want to check eligibility for?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

const UNDER_18 = {
  answers:  [NO],
  // Applying for someone who is < 18
  question: A,
};

const OVER_18 = {
  answers:  [YES],
  // Applying for someone who is >= 18
  question: A,
};

const ADULT_BRANCH: IBranch = {
  id:        '0',
  questions: [],
  title:     '18 years old or older',
};

const MINOR_BRANCH: IBranch = {
  id:        '1',
  questions: [],
  title:     'Under 18',
};

/**
 * Birthday
 */
const B: IQuestion = {
  answers:      [],
  branch:       ADULT_BRANCH,
  id:           'B',
  info:         "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
  requirements: [
    {
      explanation: 'Is 18 or older',
      responses:   [
        OVER_18,
      ],
    },
  ],
  section:  { id: 'introduction' },
  subTitle: 'M DD YYYY',
  title:    'Enter your birthday.',
  type:     QUESTION_TYPE.DOB,
};

/**
 * Is in high school
 */
const C: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'C',
  requirements: [
    {
      explanation: 'Is between 18 and 19.1',
      maxAge:      NINETEEN_ONE,
      minAge:      EIGHTEEN,
      responses:   [
        OVER_18,
      ],
    },
  ],
  section: WORK,
  title:   'Do you go to high school full time?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Has has a job in the US
 */
const D: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'D',
  info:         "When you work, part of your paycheck goes into Social Security. That's why your work history is a primary consideration.",
  requirements: [
    {
      explanation: 'Is 18 or older',
      responses:   [
        OVER_18,
      ],
    },
  ],
  section: WORK,
  title:   'Have you ever had a job in the United States?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Currently working
 */
const E: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'E',
  requirements: [
    {
      explanation: 'Has worked at all',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: D,
        },
      ],
    },
  ],
  section: WORK,
  title:   'Do you receive income from a job right now?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Worked 10 years or more
 */
const F = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'F',
  info:         "How long you've worked is also important. Ten years is often what's required.",
  requirements: [
    {
      explanation: 'Has worked at all',
      minAge:      SIXTY_ONE_EIGHT,
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: D,
        },
      ],
    },
  ],
  section: WORK,
  title:   "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Has disability
 */
const G: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'G',
  requirements: [
    {
      ageCalc:     (birthday) => !isFraCalculator(birthday, 12),
      explanation: 'Adults age 18 and over, but below FRA + 12 months',
      minAge:      EIGHTEEN,
      responses:   [
        OVER_18,
        {
          answers:  [YES, NO],
          question: D,
        },
      ],
    },
  ],
  section:  WORK,
  subTitle: 'If your answer is "Yes," you may have heard doctors, social workers, and others say you have a disability.',
  title:    "Do you have a condition that prevents you from working or limits the type of work you're able to do?",
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Disability will last > 1 year or be terminal
 */
const H: IQuestion =  {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'H',
  info:         'Our disability benefit is there for you when your ability to work is affected for a long time.',
  requirements: [
    {
      explanation: 'Is disabled and younger than FRA+ 12',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: G,
        },
      ],
    },
  ],
  section: WORK,
  title:   'Do you expect the condition to affect your ability to work for a year or more or be terminal?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Disability started before/after 22
 */
const I: IQuestion = {
  answers: [
    { id: '0', title: 'Before my 22nd birthday' },
    { id: '1', title: 'After my 22nd birthday' },
  ],
  branch:       ADULT_BRANCH,
  id:           'I',
  info:         'One of our benefits looks at whether the condition started to affect you when you were a kid, teenager, or young adult.',
  requirements: [
    {
      explanation: 'Has disability',
      minAge:      {
        months: 0,
        years:  22,
      },
      responses: [
        OVER_18,
        {
          answers:  [YES],
          question: H,
        },
      ],
    },
  ],
  section: WORK,
  title:   'When did the condition start to affect your daily activities and ability to work?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Receives state/fed assistance
 */
const J: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'J',
  requirements: [
    {
      explanation: 'Under 65 and disabled',
      maxAge:      { months: 12, years: 64 },
      responses:   [
        OVER_18,
        { answers: [YES], question: H },
      ],
    },
    {
      explanation: 'Over 65',
      minAge:      { months: 0, years: 65 },
      responses:   [OVER_18],
    },
  ],
  section:  WORK,
  subTitle: 'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
  title:    'Do you get state or federal government assistance to help cover your basic needs?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Hard to pay bills
 */
const K: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'K',
  info:         'One of our benefits provides assistance if your income and financial resources are limited.',
  requirements: [
    {
      explanation: 'Is an adult',
      responses:   [
        OVER_18,
        {
          answers:  [YES, NO],
          question: J,
        },
      ],
    },
  ],
  section: WORK,
  title:   'Is it hard to pay for basic needs like food, clothing, and a home?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Married
 */
const L: IQuestion = {
  answers: [
    YES,
    { id: '1', order: 2, title: "Yes, but I'm separated from my spouse." },
    { id: '2', order: 3, title: 'No, but I was in the past.' },
    { id: '3', order: 4, title: "No, I've never been married." },
  ],
  branch:       ADULT_BRANCH,
  id:           'L',
  info:         "You may be eligible for spousal benefits based on a current or former spouse's work history.",
  requirements: [
    {
      explanation: 'Adult age 18 and over',
      responses:   [
        OVER_18,
      ],
    },
  ],
  section:  FAMILY,
  subTitle: 'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
  title:    'Are you married?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Spouse gets SS benefits
 */
const M: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'M',
  info:         'If they get Social Security payments right now, you may be eligible for some of our spousal benefits.',
  requirements: [
    {
      explanation: 'Married (includes separation)',
      responses:   [
        OVER_18,
        {
          answers:  [YES, L.answers[1]],
          question: L,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Does your spouse get Social Security benefits?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Married before 60
 */
const N: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'N',
  requirements: [
    {
      explanation: 'Spouse does not receive benefits',
      minAge:      SIXTY,
      responses:   [
        OVER_18,
        {
          answers:  [NO],
          question: M,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Did you marry your spouse before you turned 60?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Divorced
 */
const O: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'O',
  info:         "You may be eligible for spousal benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
  requirements: [
    {
      explanation: 'Not currently married but was in the past',
      responses:   [
        OVER_18,
        {
          answers:  [L.answers[2]],
          question: L,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Are you divorced?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Married >= 10 years before divorce
 */
const P: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'P',
  requirements: [
    {
      explanation: 'Divorced',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: O,
        },
      ],
    },
  ],
  section:  FAMILY,
  subTitle: "If you've gotten divorced more than once, choose \"Yes\" if one of your marriages lasted for 10 years or more.",
  title:    'Were you married for 10 years or more before you got divorced?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Former spouse worked
 */
const Q: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       ADULT_BRANCH,
  id:           'Q',
  info:         "How long you've worked is also important. Ten years is often what's required.",
  requirements: [
    {
      explanation: 'Married 10 years or more before divorce',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: P,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Has your former spouse worked for 10 years or more in the United States?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Widowed
 */
const R: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'R',
  requirements: [
    {
      explanation: 'Not married before 60',
      responses:   [
        OVER_18,
        {
          answers:  [NO],
          question: N,
        },
      ],
    },
    {
      explanation: 'Former spouse worked',
      responses:   [
        OVER_18,
        {
          answers:  [NO, IDK],
          question: Q,
        },
      ],
    },
    {
      explanation: 'Not divorced',
      responses:   [
        OVER_18,
        {
          answers:  [NO],
          question: O,
        },
      ],
    },
    {
      explanation: 'Former spouse worked or may have worked',
      maxAge:      { months: 12, years: 61 },
      responses:   [
        OVER_18,
        { answers: [YES], question: Q },
      ],
    },
  ],
  section:  FAMILY,
  subTitle: '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. It may have happened recently or a long time ago.',
  title:    'Are you widowed?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Deceased spouse worked
 */
const S: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'S',
  info:         "You may be eligible for spousal benefits based on your former spouse's work history.",
  requirements: [
    {
      explanation: 'Widowed',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: R,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Did your spouse ever have a job in the United States before they passed away?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Have disabled children
 */
const T: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'T',
  info:         'One of our spousal benefits looks at whether you take care of disabled or young children.',
  requirements: [
    {
      explanation: 'Under 62 and spouse gets benefits',
      maxAge:      { months: 12, years: 61 },
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: M,
        },
      ],
    },
    {
      explanation: 'Under 59 and deceases spouse worked',
      maxAge:      { months: 12, years: 59 },
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: S,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   'Do you have kids who are disabled or under 16?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Lost a parent
 */
const U: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'U',
  requirements: [
    {
      explanation: 'Attends high school',
      maxAge:      NINETEEN_ONE,
      minAge:      EIGHTEEN,
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: C,
        },
      ],
    },
    {
      explanation: 'Disabled, 18-19 and does not attend high school',
      maxAge:      NINETEEN_ONE,
      minAge:      EIGHTEEN,
      responses:   [
        OVER_18,
        {
          answers:  [NO],
          // Does not attend high school
          question: C,
        },
        {
          answers:  [YES],
          // Is disabled
          question: H,
        },
      ],
    },
    {
      explanation: 'Disabled and between 19-22',
      maxAge:      { months: 0, years: 22 },
      minAge:      NINETEEN_ONE,
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: H,
        },
      ],
    },
    {
      explanation: 'Disabled, 22 or older, but disabled before 22',
      minAge:      { months: 0, years: 22 },
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          question: H,
        },
        {
          answers:  [{ id: '0' }],
          question: I,
        },
      ],
    },
  ],
  section:  FAMILY,
  subTitle: 'They may have been your birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
  title:    'Did you lose a parent?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Has surviving parents
 */
const V: IQuestion = {
  answers:      [YES, NO],
  branch:       ADULT_BRANCH,
  id:           'V',
  requirements: [
    {
      explanation: 'Has lost a parent',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          // Has lost a parent
          question: U,
        },
      ],
    },
  ],
  section: FAMILY,
  title:   "We're sorry for your loss. Do you have one or multiple surviving parents?",
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

const W: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       ADULT_BRANCH,
  id:           'W',
  info:         'If they get Social Security payments right now, you may be eligible for one of our benefits for children.',
  requirements: [
    {
      explanation: 'Has lost a parent but has surviving parents',
      responses:   [
        OVER_18,
        {
          answers:  [YES],
          // Has surviving parent
          question: V,
        },
      ],
    },
    {
      explanation: 'Has not lost a parent',
      responses:   [
        OVER_18,
        {
          answers:  [NO],
          // Has not lost a parent
          question: U,
        },
      ],
    },
  ],
  section: CHILD_FAMILY,
  title:   'Do your parent(s) get Social Security benefits?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Child has disability
 */
const X: IQuestion = {
  answers:       [YES, NO],
  branch:        MINOR_BRANCH,
  id:            'X',
  internalNotes: 'Children under 18',
  requirements:  [
    {
      explanation: 'Under 18',
      responses:   [
        UNDER_18,
      ],
    },
  ],
  section:  DISABILITY,
  subTitle: 'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
  title:    'Does the child have a condition that significantly affects their daily activities?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Child's disability will last > 1 or be terminal
 */
const Y: IQuestion = {
  answers:      [YES, NO],
  branch:       MINOR_BRANCH,
  id:           'Y',
  info:         "One of our benefits is there for you when the child's daily activities are affected for a long time.",
  requirements: [
    {
      explanation: 'Under 18 and is disabled',
      responses:   [
        UNDER_18,
        {
          answers:  [YES],
          // Child has disability
          question: X,
        },
      ],
    },
  ],
  section: DISABILITY,
  title:   'Do you expect the condition to significantly affect their daily activities for a year or longer or be terminal?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Child lost a parent
 */
const Z: IQuestion = {
  answers:       [YES, NO],
  branch:        MINOR_BRANCH,
  id:            'Z',
  internalNotes: 'Children under 18',
  requirements:  [
    {
      explanation: 'Child is not disabled',
      responses:   [
        UNDER_18,
        {
          answers:  [NO],
          question: X,
        },
      ],
    },
    {
      explanation: 'Child may be disabled',
      responses:   [
        UNDER_18,
        {
          answers:  [YES, NO],
          question: Y,
        },
      ],
    },
  ],
  section:  CHILD_FAMILY,
  subTitle: 'The parent may have been their birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
  title:    'Did the child lose a parent?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Child has surviving parent
 */
const AA: IQuestion = {
  answers:      [YES, NO],
  branch:       MINOR_BRANCH,
  id:           'AA',
  requirements: [
    {
      explanation: 'Child has lost a parent',
      responses:   [
        UNDER_18,
        {
          answers:  [YES],
          question: Z,
        },
      ],
    },
  ],
  section: CHILD_FAMILY,
  title:   "We're sorry for their loss. Do they have one or multiple surviving parents?",
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Surviving parents get SS
 */
const BB: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       MINOR_BRANCH,
  id:           'BB',
  info:         'If their parent(s) get Social Security payments right now, they may be eligible for one of our benefits for children.',
  requirements: [
    {
      explanation: 'Has not lost a parent',
      responses:   [
        UNDER_18,
        {
          answers:  [NO],
          question: Z,
        },
      ],
    },
  ],
  section: CHILD_FAMILY,
  title:   'Do their parent(s) get Social Security benefits?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Are parents employed
 */
const CC: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       MINOR_BRANCH,
  id:           'CC',
  requirements: [
    {
      explanation: 'Disabled',
      responses:   [
        UNDER_18,
        {
          answers:  [YES],
          question: X,
        },
      ],
    },
    {
      explanation: 'Disabled for more than a year',
      responses:   [
        UNDER_18,
        {
          answers:  [YES],
          question: Y,
        },
      ],
    },
  ],
  section: CHILD_FAMILY,
  title:   'Do their parent(s) receive income from a job right now?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Are parents employed
 */
const DD: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       MINOR_BRANCH,
  id:           'DD',
  requirements: [
    {
      explanation: 'Under 18',
      responses:   [
        UNDER_18,
        {
          answers:  [YES, NO, IDK],
          question: CC,
        },
      ],
    },
  ],
  section:  CHILD_FAMILY,
  subTitle: 'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
  title:    'Do their parent(s) get state or federal government assistance to help cover basic needs?',
  type:     QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Are parents employed
 */
const EE: IQuestion = {
  answers:      [YES, NO, IDK],
  branch:       MINOR_BRANCH,
  id:           'EE',
  info:         'One of our benefits provides assistance if their income and financial resources are limited.',
  requirements: [
    {
      explanation: 'Under 18',
      responses:   [
        UNDER_18,
        {
          answers:  [YES, NO, IDK],
          question: DD,
        },
      ],
    },
  ],
  section: CHILD_FAMILY,
  title:   'Is it hard for their parent(s) to pay for basic needs like food, clothing, and a home?',
  type:    QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * All of the questions in order
 */
const questionList: IQuestion[] = [
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
  AA,
  BB,
  CC,
  DD,
  EE,
];

/**
 * Map of questions for use elsewhere
 */
const questionMap = {
  A,
  AA,
  B,
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
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
};

// Note: the order should match the logical order
// We're creating a new reference in order to prevent circular references
const adultBranch = {
  ...ADULT_BRANCH,
  questions: [
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
  ].map((q) => ({ id: q.id, title: q.title })),
};

// Note: the order should match the logical order
// We're creating a new reference in order to prevent circular references
const minorBranch = {
  ...MINOR_BRANCH,
  questions: [
    A,
    X,
    Y,
    Z,
    AA,
    BB,
    CC,
    DD,
    EE,
  ].map((q) => ({ id: q.id, title: q.title })),
};

export const questions = {
  branches: [
    adultBranch,
    minorBranch,
  ],
  list: questionList,
  map:  questionMap,
};
