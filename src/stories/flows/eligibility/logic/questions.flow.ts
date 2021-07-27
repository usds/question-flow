/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { merge }           from 'lodash';
import { QUESTION_TYPE }   from '../../../../lib';
import { IQuestion }       from '../../../../survey';
import { IBranch }         from '../../../../survey/IBranch';
import { isFraCalculator } from '../lib/calculator.flow';
import {
  CHILD_FAMILY,
  DISABILITY,
  EIGHTEEN,
  FAMILY,
  IDK,
  NINETEEN_ONE,
  NO,
  SIXTY,
  SIXTY_ONE_EIGHT,
  WORK,
  YES,
} from '../lib/constants';
import { TQuestionMap } from '../lib/contentMap';

type Tq = {
    branches: {
        id: string;
        order?: number | undefined;
        questions: {
            id: string;
        }[];
        title?: string | undefined;
        type?: string | undefined;
    }[];
    list: IQuestion[];
    map: {
        [key: string]: IQuestion;
    };
};

export const buildQuestions = (json: TQuestionMap): Tq => {
  /**
   * 18 or under 18
   */
  const A: IQuestion = merge(
    {
      id:      'A',
      section: { id: 'introduction' },
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.A,
  ) as IQuestion;

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
  const B: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'B',
      requirements: [
        {
          explanation: 'Is 18 or older',
          responses:   [OVER_18],
        },
      ],
      section: { id: 'introduction' },
      type:    QUESTION_TYPE.DOB,
    },
    json.B,
  ) as IQuestion;

  /**
   * Is in high school
   */
  const C: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'C',
      requirements: [
        {
          explanation: 'Is between 18 and 19.1',
          maxAge:      NINETEEN_ONE,
          minAge:      EIGHTEEN,
          responses:   [OVER_18],
        },
      ],
      section: WORK,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.C,
  ) as IQuestion;

  /**
   * Has has a job in the US
   */
  const D: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'D',
      requirements: [
        {
          explanation: 'Is 18 or older',
          responses:   [OVER_18],
        },
      ],
      section: WORK,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.D,
  ) as IQuestion;

  /**
   * Currently working
   */
  const E: IQuestion = merge(
    {
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.E,
  ) as IQuestion;

  /**
   * Worked 10 years or more
   */
  const F: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'F',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.F,
  ) as IQuestion;

  /**
   * Has disability
   */
  const G: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'G',
      requirements: [
        {
          ageCalc:     (birthday: string) => !isFraCalculator(birthday, 12),
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
      section: WORK,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.G,
  ) as IQuestion;

  /**
   * Disability will last > 1 year or be terminal
   */
  const H: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'H',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.H,
  ) as IQuestion;

  /**
   * Disability started before/after 22
   */
  const I: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'I',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.I,
  ) as IQuestion;

  /**
   * Receives state/fed assistance
   */
  const J: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'J',
      requirements: [
        {
          explanation: 'Under 65 and disabled',
          maxAge:      { months: 12, years: 64 },
          responses:   [OVER_18, { answers: [YES], question: H }],
        },
        {
          explanation: 'Over 65',
          minAge:      { months: 0, years: 65 },
          responses:   [OVER_18],
        },
      ],
      section: WORK,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.J,
  ) as IQuestion;

  /**
   * Hard to pay bills
   */
  const K: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'K',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.K,
  ) as IQuestion;

  /**
   * Married
   */
  const L: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'L',
      requirements: [
        {
          explanation: 'Adult age 18 and over',
          responses:   [OVER_18],
        },
      ],
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.L,
  ) as IQuestion;

  /**
   * Spouse gets SS benefits
   */
  const M: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'M',
      requirements: [
        {
          explanation: 'Married (includes separation)',
          responses:   [
            OVER_18,
            {
              answers:  [YES, { id: '1' }],
              question: L,
            },
          ],
        },
      ],
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.M,
  ) as IQuestion;

  /**
   * Married before 60
   */
  const N: IQuestion = merge(
    {
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.N,
  ) as IQuestion;

  /**
   * Divorced
   */
  const O: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'O',
      requirements: [
        {
          explanation: 'Not currently married but was in the past',
          responses:   [
            OVER_18,
            {
              answers:  [{ id: '2' }],
              question: L,
            },
          ],
        },
      ],
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.O,
  ) as IQuestion;

  /**
   * Married >= 10 years before divorce
   */
  const P: IQuestion = merge(
    {
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
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.P,
  ) as IQuestion;

  /**
   * Former spouse worked
   */
  const Q: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'Q',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.Q,
  ) as IQuestion;

  /**
   * Widowed
   */
  const R: IQuestion = merge(
    {
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
          responses:   [OVER_18, { answers: [YES], question: Q }],
        },
      ],
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.R,
  ) as IQuestion;

  /**
   * Deceased spouse worked
   */
  const S: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'S',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.S,
  ) as IQuestion;

  /**
   * Have disabled children
   */
  const T: IQuestion = merge(
    {
      branch:       ADULT_BRANCH,
      id:           'T',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.T,
  ) as IQuestion;

  /**
   * Lost a parent
   */
  const U: IQuestion = merge(
    {
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
      section: FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.U,
  ) as IQuestion;

  /**
   * Has surviving parents
   */
  const V: IQuestion = merge(
    {
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.V,
  ) as IQuestion;

  const W: IQuestion = merge(
    {
      answers:      [YES, NO, IDK],
      branch:       ADULT_BRANCH,
      id:           'W',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.W,
  ) as IQuestion;

  /**
   * Child has disability
   */
  const X: IQuestion = merge(
    {
      branch:       MINOR_BRANCH,
      id:           'X',
      requirements: [
        {
          explanation: 'Under 18',
          responses:   [UNDER_18],
        },
      ],
      section: DISABILITY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.X,
  ) as IQuestion;

  /**
   * Child's disability will last > 1 or be terminal
   */
  const Y: IQuestion = merge(
    {
      branch:       MINOR_BRANCH,
      id:           'Y',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.Y,
  ) as IQuestion;

  /**
   * Child lost a parent
   */
  const Z: IQuestion = merge(
    {
      branch:       MINOR_BRANCH,
      id:           'Z',
      requirements: [
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
      section: CHILD_FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.Z,
  ) as IQuestion;

  /**
   * Child has surviving parent
   */
  const AA: IQuestion = merge(
    {
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.AA,
  ) as IQuestion;

  /**
   * Surviving parents get SS
   */
  const BB: IQuestion = merge(
    {
      branch:       MINOR_BRANCH,
      id:           'BB',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.BB,
  ) as IQuestion;

  /**
   * Are parents employed
   */
  const CC: IQuestion = merge(
    {
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.CC,
  ) as IQuestion;

  /**
   * Are parents employed
   */
  const DD: IQuestion = merge(
    {
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
      section: CHILD_FAMILY,
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.DD,
  ) as IQuestion;

  /**
   * Are parents employed
   */
  const EE: IQuestion = merge(
    {
      branch:       MINOR_BRANCH,
      id:           'EE',
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
      type:    QUESTION_TYPE.MULTIPLE_CHOICE,
    },
    json.EE,
  ) as IQuestion;

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
    ].map((q) => ({ id: q.id })),
  };

  // Note: the order should match the logical order
  // We're creating a new reference in order to prevent circular references
  const minorBranch = {
    ...MINOR_BRANCH,
    questions: [A, X, Y, Z, AA, BB, CC, DD, EE].map((q) => ({ id: q.id })),
  };

  return {
    branches: [adultBranch, minorBranch],
    list:     questionList,
    map:      questionMap,
  };
};
