/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { IResult }    from '../../../../survey';
import { TResultMap } from '../lib/contentMap';

const name = 'Benefit name';

/**
 * Retirement
 */
const r1: Partial<IResult> = {
  id:              'r1',
  label:           name,
  secondaryAction: {
    buttons: [
      {
        id:    'rb1',
        link:  '#',
        title: 'Estimate payment amount at various ages',
        type:  'link',
      },
    ],
    id:       'sa3',
    subTitle:
      "You may meet the requirements to receive Retirement, but it's up to you to decide when you want to apply. The monthly amount you can receive increases as you get older. You'll get the highest possible amount if you apply at age 70.",
    title: 'When to apply for Retirement',
  },
  title: 'Retirement',
};

/**
 * SSDI
 */
const r2: Partial<IResult> = {
  id:    'r2',
  label: name,
  title: 'Disability, also referred to as benefits Disability Insurance (SSDI)',
};

/**
 * SSI
 */
const r3: Partial<IResult> = {
  id:    'r3',
  label: name,
  title: 'Supplemental Security Income (SSI)',
};

/**
 * Medicare
 */
const r4: Partial<IResult> = {
  id:              'r4',
  label:           name,
  secondaryAction: {
    buttons: [
      {
        id:    'rb2',
        link:  '#',
        title: 'Determine when to sign up for Medicare',
        type:  'link',
      },
    ],
    id:       'sa3',
    subTitle:
      "The deadline to sign up for Medicare Parts A & B depends on what age you want to apply for your Retirement benefit. Plan ahead to make sure you don't miss the enrollment period.",
    title: 'Plan ahead for Medicare Parts A & B',
  },
  title: 'Medicare',
};

/**
 * Spouse
 */
const r5: Partial<IResult> = {
  id:    'r5',
  label: name,
  title: 'Spouse',
};

/**
 * Spouse with child
 */
const r6: Partial<IResult> = {
  id:    'r6',
  label: name,
  title: 'Spouse with Child in Care',
};

/**
 * Divorced spouse
 */
const r7: Partial<IResult> = {
  id:    'r7',
  label: name,
  title: 'Divorced Spouse',
};

/**
 * Widowers
 */
const r8: Partial<IResult> = {
  id:    'r8',
  label: name,
  title: 'Widowers',
};

/**
 * Disabled widowers
 */
const r9: Partial<IResult> = {
  id:    'r9',
  label: name,
  title: 'Disabled Widowers',
};

/**
 * Lump sum
 */
const r10: Partial<IResult> = {
  id:    'r10',
  label: name,
  title: 'Lump Sum Death Payment, a one-time payment',
};

/**
 * Child aux
 */
const r11: Partial<IResult> = {
  id:    'r11',
  label: name,
  title: "Child's Auxiliary",
};

/**
 * Child survivor
 */
const r12: Partial<IResult> = {
  id:    'r12',
  label: name,
  title: "Child's Survivor",
};

/**
 * Child disability
 */
const r13: Partial<IResult> = {
  id:    'r13',
  label: name,
  title: 'Childhood Disability',
};

/**
 * Student aux
 */
const r14: Partial<IResult> = {
  id:    'r14',
  label: name,
  title: 'Student Auxiliary',
};

/**
 * Student survivor
 */
const r15: Partial<IResult> = {
  id:    'r15',
  label: name,
  title: 'Student Survivor',
};

/**
 * Mother/father
 */
const r16: Partial<IResult> = {
  id:    'r16',
  label: name,
  title: "Mother/Father's",
};

/**
 * All possible results with their requirements
 */
export const resultContentMap: TResultMap = {
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
