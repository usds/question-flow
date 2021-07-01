/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { QUESTION_TYPE } from '../../../../lib';
import { IQuestion }     from '../../../../survey';
import { IDK, NO, YES }  from '../lib/constants';
import { TQuestionMap }  from '../lib/contentMap';
/**
 * 18 or under 18
 */
const A: Partial<IQuestion> = {
  answers: [
    { id: '0', title: 'An adult (age 18 and over)' },
    { id: '1', title: 'A child (under age 18)' },
  ],
  id:    'A',
  title: 'Who do you want to check eligibility for?',
};

/**
 * Birthday
 */
const B: Partial<IQuestion> = {
  answers:  [],
  id:       'B',
  info:     "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
  subTitle: 'M DD YYYY',
  title:    'Enter your birthday.',
};

/**
 * Is in high school
 */
const C: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'C',
  title:   'Do you go to high school full time?',
};

/**
 * Has has a job in the US
 */
const D: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'D',
  info:    "When you work, part of your paycheck goes into Social Security. That's why your work history is a primary consideration.",
  title:   'Have you ever had a job in the United States?',
};

/**
 * Currently working
 */
const E: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'E',
  title:   'Do you receive income from a job right now?',
};

/**
 * Worked 10 years or more
 */
const F: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'F',
  info:    "How long you've worked is also important. Ten years is often what's required.",
  title:
    "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
};

/**
 * Has disability
 */
const G: Partial<IQuestion> = {
  answers:  [YES, NO],
  id:       'G',
  subTitle:
    'If your answer is "Yes," you may have heard doctors, social workers, and others say you have a disability.',
  title:
    "Do you have a condition that prevents you from working or limits the type of work you're able to do?",
};

/**
 * Disability will last > 1 year or be terminal
 */
const H: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'H',
  info:    'Our disability benefit is there for you when your ability to work is affected for a long time.',
  title:
    'Do you expect the condition to affect your ability to work for a year or more or be terminal?',
};

/**
 * Disability started before/after 22
 */
const I: Partial<IQuestion> = {
  answers: [
    { id: '0', title: 'Before my 22nd birthday' },
    { id: '1', title: 'After my 22nd birthday' },
  ],
  id:    'I',
  info:  'One of our benefits looks at whether the condition started to affect you when you were a kid, teenager, or young adult.',
  title:
    'When did the condition start to affect your daily activities and ability to work?',
};

/**
 * Receives state/fed assistance
 */
const J: Partial<IQuestion> = {
  answers:  [YES, NO],
  id:       'J',
  subTitle:
    'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
  title:
    'Do you get state or federal government assistance to help cover your basic needs?',
};

/**
 * Hard to pay bills
 */
const K: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'K',
  info:    'One of our benefits provides assistance if your income and financial resources are limited.',
  title:   'Is it hard to pay for basic needs like food, clothing, and a home?',
};

/**
 * Married
 */
const L: Partial<IQuestion> = {
  answers: [
    YES,
    { id: '1', order: 2, title: "Yes, but I'm separated from my spouse." },
    { id: '2', order: 3, title: 'No, but I was in the past.' },
    { id: '3', order: 4, title: "No, I've never been married." },
  ],
  id:       'L',
  info:     "You may be eligible for spousal benefits based on a current or former spouse's work history.",
  subTitle:
    'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
  title: 'Are you married?',
};

/**
 * Spouse gets SS benefits
 */
const M: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'M',
  info:    'If they get Social Security payments right now, you may be eligible for some of our spousal benefits.',
  title:   'Does your spouse get Social Security benefits?',
};

/**
 * Married before 60
 */
const N: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'N',
  title:   'Did you marry your spouse before you turned 60?',
};

/**
 * Divorced
 */
const O: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'O',
  info:    "You may be eligible for spousal benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
  title:   'Are you divorced?',
};

/**
 * Married >= 10 years before divorce
 */
const P: Partial<IQuestion> = {
  answers:  [YES, NO],
  id:       'P',
  subTitle:
    'If you\'ve gotten divorced more than once, choose "Yes" if one of your marriages lasted for 10 years or more.',
  title: 'Were you married for 10 years or more before you got divorced?',
};

/**
 * Former spouse worked
 */
const Q: Partial<IQuestion> = {
  answers: [YES, NO, IDK],
  id:      'Q',
  info:    "How long you've worked is also important. Ten years is often what's required.",
  title:
    'Has your former spouse worked for 10 years or more in the United States?',
};

/**
 * Widowed
 */
const R: Partial<IQuestion> = {
  answers:  [YES, NO],
  id:       'R',
  subTitle:
    '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. It may have happened recently or a long time ago.',
  title: 'Are you widowed?',
};

/**
 * Deceased spouse worked
 */
const S: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'S',
  info:    "You may be eligible for spousal benefits based on your former spouse's work history.",
  title:
    'Did your spouse ever have a job in the United States before they passed away?',
};

/**
 * Have disabled children
 */
const T: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'T',
  info:    'One of our spousal benefits looks at whether you take care of disabled or young children.',
  title:   'Do you have kids who are disabled or under 16?',
};

/**
 * Lost a parent
 */
const U: Partial<IQuestion> = {
  answers:  [YES, NO],
  id:       'U',
  subTitle:
    'They may have been your birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
  title: 'Did you lose a parent?',
};

/**
 * Has surviving parents
 */
const V: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'V',
  title:
    "We're sorry for your loss. Do you have one or multiple surviving parents?",
};

const W: Partial<IQuestion> = {
  answers: [YES, NO, IDK],
  id:      'W',
  info:    'If they get Social Security payments right now, you may be eligible for one of our benefits for children.',
  title:   'Do your parent(s) get Social Security benefits?',
};

/**
 * Child has disability
 */
const X: Partial<IQuestion> = {
  answers:       [YES, NO],
  id:            'X',
  internalNotes: 'Children under 18',
  subTitle:
    'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
  title:
    'Does the child have a condition that significantly affects their daily activities?',
};

/**
 * Child's disability will last > 1 or be terminal
 */
const Y: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'Y',
  info:    "One of our benefits is there for you when the child's daily activities are affected for a long time.",
  title:
    'Do you expect the condition to significantly affect their daily activities for a year or longer or be terminal?',
  type: QUESTION_TYPE.MULTIPLE_CHOICE,
};

/**
 * Child lost a parent
 */
const Z: Partial<IQuestion> = {
  answers:       [YES, NO],
  id:            'Z',
  internalNotes: 'Children under 18',
  subTitle:
    'The parent may have been their birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
  title: 'Did the child lose a parent?',
};

/**
 * Child has surviving parent
 */
const AA: Partial<IQuestion> = {
  answers: [YES, NO],
  id:      'AA',
  title:
    "We're sorry for their loss. Do they have one or multiple surviving parents?",
};

/**
 * Surviving parents get SS
 */
const BB: Partial<IQuestion> = {
  answers: [YES, NO, IDK],
  id:      'BB',
  info:    'If their parent(s) get Social Security payments right now, they may be eligible for one of our benefits for children.',
  title:   'Do their parent(s) get Social Security benefits?',
};

/**
 * Are parents employed
 */
const CC: Partial<IQuestion> = {
  answers: [YES, NO, IDK],
  id:      'CC',
  title:   'Do their parent(s) receive income from a job right now?',
};

/**
 * Are parents employed
 */
const DD: Partial<IQuestion> = {
  answers:  [YES, NO, IDK],
  id:       'DD',
  subTitle:
    'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
  title:
    'Do their parent(s) get state or federal government assistance to help cover basic needs?',
};

/**
 * Are parents employed
 */
const EE: Partial<IQuestion> = {
  answers: [YES, NO, IDK],
  id:      'EE',
  info:    'One of our benefits provides assistance if their income and financial resources are limited.',
  title:
    'Is it hard for their parent(s) to pay for basic needs like food, clothing, and a home?',
};

export const questionContentMap: TQuestionMap = {
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
