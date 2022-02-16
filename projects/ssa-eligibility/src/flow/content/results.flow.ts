/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
                camelcase
 */
import { IResult }    from '@usds.gov/questionable';
import { TResultMap } from '../lib/contentMap';

const name = '';

enum Category {
  DISABILITY = 'Disability',
  FAMILY = 'Family',
  SUPPLEMENTAL_SECURITY_INCOME = 'Supplemental Security Income',
  SURVIVOR = 'Survivor'
}

/**
 * Retirement
 */
const r1: Partial<IResult> = {
  category: '',
  id:       'r1',
  label:    name,
  title:    'Retirement',
};

/**
 * SSDI
 */
const r2: Partial<IResult> = {
  category: Category.DISABILITY,
  id:       'r2',
  label:    name,
  title:    'Social Security Disability Insurance',
};

/**
 * SSI
 */
const r3: Partial<IResult> = {
  category: Category.SUPPLEMENTAL_SECURITY_INCOME,
  id:       'r3',
  label:    name,
  title:    'Disability supplement',
};

/**
 * SSI
 */
const r3_1: Partial<IResult> = {
  category: Category.SUPPLEMENTAL_SECURITY_INCOME,
  id:       'r3',
  label:    name,
  title:    'Age 65+ supplement',
};

/**
 * Medicare
 */
const r4: Partial<IResult> = {
  category: '',
  id:       'r4',
  label:    name,
  title:    'Medicare',
};

/**
 * Spouse
 */
const r5: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r5',
  label:    name,
  title:    'Spouse',
};

/**
 * Spouse with child
 */
const r6: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r6',
  label:    name,
  title:    'Spouse with Child in Care',
};

/**
 * Divorced spouse
 */
const r7: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r7',
  label:    name,
  title:    'Divorced Spouse',
};

/**
 * Widowers
 */
const r8: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r8',
  label:    name,
  title:    'Widowers',
};

/**
 * Disabled widowers
 */
const r9: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r9',
  label:    name,
  title:    'Disabled Widowers',
};

/**
 * Lump sum
 */
const r10: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r10',
  label:    name,
  title:    'Lump Sum Death Payment, a one-time payment',
};

/**
 * Child aux
 */
const r11: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r11',
  label:    name,
  title:    'Child Auxiliary',
};

/**
 * Child survivor
 */
const r12: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r12',
  label:    name,
  title:    'Child Survivor',
};

/**
 * Child disability
 */
const r13: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r13',
  label:    name,
  title:    'Childhood Disability',
};

/**
 * Student aux
 */
const r14: Partial<IResult> = {
  category: Category.FAMILY,
  id:       'r14',
  label:    name,
  title:    'Student Auxiliary',
};

/**
 * Student survivor
 */
const r15: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r15',
  label:    name,
  title:    'Student Survivor',
};

/**
 * Mother/father
 */
const r16: Partial<IResult> = {
  category: Category.SURVIVOR,
  id:       'r16',
  label:    name,
  title:    "Mother/Father's",
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
  r3_1,
  r4,
  r5,
  r6,
  r7,
  r8,
  r9,
};
